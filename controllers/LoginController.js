const UsuarioModel = require("../models/UsuarioModel");

class LoginController {

    loginView(req,res) {
        res.render("login/login.ejs", {layout: false});
    }

    async login (req,res) {
        let msg = "";
        if(req.body.usuario && req.body.senha) {
            let usuario = new UsuarioModel();
            usuario = await usuario.validarUsuario(req.body.usuario, req.body.senha);
            if(usuario) {
                res.cookie("usuarioLogado", usuario.id);
                res.redirect("/");
            }
            else {
                msg = "Erro ao realizar autenticação! Confira as credenciais!";
                res.render("login/login.ejs", {retorno: msg, layout: false});
            }

        }
        else {
            msg = "Erro ao realizar autenticação! Confira as credenciais!";
            res.render("login/login.ejs", {retorno: msg, layout: false});
        }
    }

    logout(req, res) {
        res.clearCookie("usuarioLogado");
        res.redirect("/login");
    }

}

module.exports = LoginController;