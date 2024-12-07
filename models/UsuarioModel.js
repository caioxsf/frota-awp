const Database = require('../utils/database')
const db = new Database();

class UsuarioModel {

    #id
    #nome
    #email
    #telefone
    #usuario
    #senha

    constructor(id,nome,email,telefone,usuario,senha) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#telefone = telefone;
        this.#usuario = usuario;
        this.#senha = senha;
    }

    get id () {return this.#id} set id (value) {this.#id = value}
    get nome () {return this.#nome} set nome (value) {this.#nome = value}
    get email () {return this.#email} set email (value) {this.#email = value}
    get telefone () {return this.#telefone} set telefone (value) {this.#telefone = value}
    get usuario () {return this.#usuario} set usuario (value) {this.#usuario = value}
    get senha () {return this.#senha} set senha (value) {this.#senha = value}

    async cadastrarUsuario () {
        let sql = `insert into usuario (usu_nome, usu_email, usu_telefone, usu_usuario, usu_senha) values (?,?,?,?,?)`
        let valores = [this.#nome, this.#email, this.#telefone, this.#usuario, this.#senha];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async obter (id) {
        let sql = `select * from usuario where usu_id = ?`;
        let valores = [id];
        let row = await db.ExecutaComando(sql,valores);
        if(row.length > 0) {
            return new UsuarioModel (row[0]['usu_id'],row[0]['usu_nome'],row[0]['usu_email'],row[0]['usu_telefone'],row[0]['usu_usuario'],row[0]['usu_senha']);
        }
        return null
    }

    async validarUsuario (usuario,senha) {
        let sql = `select * from usuario where usu_usuario = ? and usu_senha = ?`;
        let valores = [usuario,senha];
        let row = await db.ExecutaComando(sql,valores);
        if(row.length > 0) {
            return new UsuarioModel (row[0]['usu_id'],row[0]['usu_nome'],row[0]['usu_email'],row[0]['usu_telefone'],row[0]['usu_usuario'],row[0]['usu_senha']);
        }
        return null;
    }

    async alterarConta () {
        let sql = `update usuario set usu_nome = ?, usu_email = ?, usu_telefone = ?, usu_usuario = ? where usu_id = ?`
        let valores = [this.#nome, this.#email, this.#telefone, this.#usuario, this.#id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }
    

    async alterarSenha () {
        let sql = `update usuario set usu_nome = ?, usu_email = ?, usu_telefone = ?, usu_usuario = ?, usu_senha = ? where usu_id = ?`
        let valores = [this.#nome, this.#email, this.#telefone, this.#usuario, this.#senha ,this.#id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async verificarSenhaAtual (id, senha) {
        let sql = `select * from usuario where usu_id = ? and usu_senha = ?`;
        let valores = [id,senha];
        var colunas = await db.ExecutaComando(sql,valores)
        if(colunas.length > 0) {
            var coluna = colunas[0];

            return new UsuarioModel(
                coluna['usu_id'],
                coluna['usu_nomwe'],
                coluna['usu_email'],
                coluna['usu_telefone'],
                coluna['usu_usuario'],
                coluna['usu_senha']
            )
        }
        return null
    }

}

module.exports = UsuarioModel;