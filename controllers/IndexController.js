const UsuarioModel = require("../models/UsuarioModel");

class IndexController {

    indexView(req,res) {
        res.render("index/index.ejs");
    }


    // ALTERAR PERFIL
    perfilView(req,res) {
        res.render('index/perfil/perfil.ejs')
    }

    perfilViewAlterar(req,res) {
        res.render('index/perfil/perfil-alterar.ejs')
    }

    async perfilAlterar(req,res) {
        
        if(req.body.nome && req.body.email && req.body.telefone && req.body.usuario) {
            let usuario = new UsuarioModel()
            usuario.nome = req.body.nome;
            usuario.email = req.body.email;
            usuario.telefone = req.body.telefone;
            usuario.usuario = req.body.usuario;
            usuario.id = req.body.id;

            let resultado = await usuario.alterarConta();

            if(resultado) {
                res.send({ok: true, msg: 'Conta atualizada com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao atualizar conta'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }



    // ALTERAR SENHA

    senhaView(req,res) {
        res.render('index/perfil/senha-alterar.ejs')
    }

    async senha (req,res) {
        if(req.body.senhaatual && req.body.novasenha) {
            let usuario = new UsuarioModel();
            let verificarSenha = await usuario.verificarSenhaAtual(req.body.id, req.body.senhaatual);

            if(verificarSenha != null ) {
                usuario.nome = req.body.nome;
                usuario.email = req.body.email;
                usuario.telefone = req.body.telefone;
                usuario.usuario = req.body.usuario;
                usuario.senha = req.body.novasenha;
                usuario.id = req.body.id;

                let resultado = await usuario.alterarSenha()

                if(resultado) {
                    res.send({ok: true, msg: 'Senha atualizada com sucesso!'});
                }
                else {
                    res.send({ok: false, msg: 'Erro ao atualizar senha!'});
                }
            }
            else {
                res.send({ok: false, msg: 'A senha atual está errada!'})
            }
        }
    }


}

module.exports = IndexController;