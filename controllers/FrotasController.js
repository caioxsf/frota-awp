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

        console.log('Primeira Data:', data1);
        console.log('Segunda Data:', data2);

        if (data1 && data2) {
            
            // let dataInicio = new Date(data1);
            // let dataFim = new Date(data2);
            let listarDataEspecificaModel = new ListarDataEspecificaModel();
            listarDataEspecificaModel.primeiraData = data1;
            listarDataEspecificaModel.segundaData = data2;
            let lista = await listarDataEspecificaModel.listarSomenteEmDatasEspecificas(id,data1,data2);

            res.render('listaFrotas/listaFrotasDataEspecificas.ejs', {frotas: lista});
        }
        
    }

  

}

module.exports = FrotasController;