const UsuarioModel = require("../models/UsuarioModel");

class RegisterrController {

    registerView(req,res) {
        res.render("login/register.ejs", {layout: false});
    }

    async register(req,res) {
        let ok;
        if(req.body.nome && req.body.email && req.body.telefone && req.body.usuario && req.body.senha) {
            let usuario = new UsuarioModel();
            usuario.nome = req.body.nome;
            usuario.email = req.body.email;
            usuario.telefone = req.body.telefone;
            usuario.usuario = req.body.usuario;
            usuario.senha = req.body.senha;
            let resultado = await usuario.cadastrarUsuario();

            if(resultado) {
                res.send({ok: true, msg: 'Conta criada com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao criar conta'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

}

module.exports = RegisterrController;