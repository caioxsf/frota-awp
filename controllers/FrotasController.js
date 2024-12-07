const CadastroFrotaControllerModel = require("../models/CadastroFrotaControllerModel");
const ListarDataEspecificaModel = require("../models/ListarFrotasDataEspecifica");

class FrotasController {

    async listasFrotas (req,res) {
        
        let id = req.cookies.usuarioLogado;
        let cadastroFrotaModel = new CadastroFrotaControllerModel();
        let lista = await cadastroFrotaModel.listarCadastroDeFrotaCompleto(id);

        res.render('listaFrotas/listaFrotas.ejs', {frotas: lista});
       

    }

    async listarFrotasComDatasEspecificas (req,res) {
        let data1 = req.body.primeiraData; 
        let data2 = req.body.segundaData; 
        let id = req.cookies.usuarioLogado;

        if (data1 && data2) {
            let listarDataEspecificaModel = new ListarDataEspecificaModel();
            listarDataEspecificaModel.primeiraData = data1;
            listarDataEspecificaModel.segundaData = data2;
            let lista = await listarDataEspecificaModel.listarSomenteEmDatasEspecificas(id,data1,data2);

            res.send({frotas: lista});
        }
        
    }

    async alterarFrotaView (req,res) {
        let id = req.params.id;

        let cadFrotaModel = new CadastroFrotaControllerModel();
        let frotaAlter = await cadFrotaModel.obterFrota(id);

        res.render('cadastro-frota/alterar-cadastro-frota.ejs', {frotaAlter: frotaAlter})
    }

    async alterarFrota (req,res) {
        if(req.body.data) {

            let cadastroModel = new CadastroFrotaControllerModel();
            cadastroModel.data = req.body.data;
            cadastroModel.origem = req.body.origem;
            cadastroModel.destino = req.body.destino;
            cadastroModel.frete = req.body.frete;
            cadastroModel.material = req.body.material;
            cadastroModel.peso = req.body.peso;
            cadastroModel.motorista = req.body.motorista;
            cadastroModel.transportadora = req.body.transportadora;
            cadastroModel.adiantamento = req.body.adiantamento;
            cadastroModel.id_perfil = req.body.idPerfil;
            cadastroModel.id = req.body.id;

            if(req.body.dataAdiantamento == '' || req.body.dataAdiantamento == '30/11/1899' || req.body.dataAdiantamento == '1899-11-30')
                req.body.dataAdiantamento = null

            cadastroModel.data_adiantamento = req.body.dataAdiantamento;

            // calculadora valor viagem
            let valor_viagem = req.body.frete * req.body.peso;
            cadastroModel.valor_viagem = valor_viagem;

            // calculando o valor da comissao do motorista
            let comissao = valor_viagem * 8 / 100;
            cadastroModel.comissao = comissao;

            let resultado = await cadastroModel.alterarFrota();

            if(resultado) {
                res.send({ok:true, msg:'Frota cadastrada com sucesso!'});
            }
            else {
                res.send({ok: false, msg:'Não foi possível cadastrar essa frota!'})
            }
        }

       
    }

    async excluirFrota (req,res) {

        var ok = true;
        if(req.body.codigo != "") {
            
            let frota = new CadastroFrotaControllerModel();
            ok = await frota.excluir(req.body.codigo);
        }
        else{
            ok = false;
        }

        res.send({ok: ok});

    }
  

}

module.exports = FrotasController;