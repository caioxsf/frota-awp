const UsuarioModel = require("../models/UsuarioModel");


class AuthMiddleware {

    async validar(req, res, next) {
        if(req.cookies.usuarioLogado) {
            let idUsuario = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario  = await usuario.obter(idUsuario);
            if(usuario) {
                //informação é disponibilizada para a controladora
                req.usuario = usuario;
                //informação disponível na renderização das páginas
                res.locals.usuario = usuario;
                //é valido, pode prosseguir
                next();
            }
            else{
                //não é valido
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }


    // async validarAdmin(req, res, next) {
    //     if(req.cookies.usuarioLogado) {
    //         let idUsuario = req.cookies.usuarioLogado;
    //         let usuario = new UserModel();
    //         usuario  = await usuario.obter(idUsuario);
    //         if(usuario && usuario.perfil_id == 1) {
    //             //informação é disponibilizada para a controladora
    //             req.usuario = usuario;
    //             //informação disponível na renderização das páginas
    //             res.locals.usuario = usuario;
    //             //é valido, pode prosseguir
    //             next();
    //         }
    //         else{
    //             //não é valido
    //             res.redirect("/nao-autorizado");
    //         }
    //     }
    //     else{
    //         res.redirect("/login");
    //     }
    // }

    
    
}

module.exports = AuthMiddleware