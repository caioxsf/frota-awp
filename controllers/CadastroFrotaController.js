const CadastroFrotaControllerModel = require("../models/CadastroFrotaControllerModel");

class CadastroFrotaController {

    async cadastroFrotaView (req,res) {
        let cadastroModel = new CadastroFrotaControllerModel();
        let id = req.body.id;
        let valor = await cadastroModel.listarCadastroDeFrotaValorTotalViagem(id);
        res.render('cadastro-frota/cadastro-frota.ejs',{valorviagem: valor});
    }

    async cadastroFrota (req,res) {
        let ok;
        if(req.body.origem) {
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
            cadastroModel.data_adiantamento = req.body.dataAdiantamento;
            cadastroModel.id_perfil = req.body.id;

            // calculadora valor viagem
            let valor_viagem = req.body.frete * req.body.peso;
            cadastroModel.valor_viagem = valor_viagem;

            // calculando o valor total da viagem
            let id = req.body.id;
            let valor_total = await cadastroModel.valorTotalFrota(id);
            cadastroModel.valor_total_viagem = valor_total + valor_viagem ; /* esse valor_viagem é para somar com 
            o ultimo valor da viagem para o valor ficar atualizado */ 
        
            let resultado = await cadastroModel.cadastrarFrota();

            if(resultado) {
                res.send({ok:true, msg:'Frota cadastrada com sucesso!'});
            }
            else {
                res.send({ok: false, msg:'Não foi possível cadastrar essa frota!'})
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos!'})
        }
    }

}

module.exports = CadastroFrotaController;