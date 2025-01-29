const Database = require('../utils/database')
const db = new Database();

class CadastroFrotaControllerModel {

    #id;
    #data;
    #origem;
    #destino;
    #frete;
    #material;
    #peso;
    #motorista;
    #transportadora;
    #adiantamento;
    #data_adiantamento;
    #comissao
    #valor_viagem
    // #valor_total_viagem
    #id_perfil

    constructor(id, data, origem, destino, frete, material, peso, motorista, transportadora, adiantamento, data_adiantamento, comissao, valor_viagem, id_perfil) {
        this.#id = id;
        this.#data = data;
        this.#origem = origem;
        this.#destino = destino;
        this.#frete = frete;
        this.#material = material;
        this.#peso = peso;
        this.#motorista = motorista;
        this.#transportadora = transportadora;
        this.#adiantamento = adiantamento;
        this.#data_adiantamento = data_adiantamento;
        this.#comissao = comissao;
        this.#valor_viagem = valor_viagem;
        // this.#valor_total_viagem = valor_total_viagem
        this.#id_perfil = id_perfil
    }

    get id() { return this.#id; } 
    set id(value) { this.#id = value; }

    get data() { return this.#data; } 
    set data(value) { this.#data = value; }

    get origem() { return this.#origem; } 
    set origem(value) { this.#origem = value; }

    get destino() { return this.#destino; } 
    set destino(value) { this.#destino = value; }

    get frete() { return this.#frete; } 
    set frete(value) { this.#frete = value; }

    get material() { return this.#material; } 
    set material(value) { this.#material = value; }

    get peso() { return this.#peso; } 
    set peso(value) { this.#peso = value; }

    get motorista() { return this.#motorista; } 
    set motorista(value) { this.#motorista = value; }

    get transportadora() { return this.#transportadora; } 
    set transportadora(value) { this.#transportadora = value; }

    get adiantamento() { return this.#adiantamento; } 
    set adiantamento(value) { this.#adiantamento = value; }

    get data_adiantamento() { return this.#data_adiantamento; } 
    set data_adiantamento(value) { this.#data_adiantamento = value; }

    get comissao() { return this.#comissao; } 
    set comissao(value) { this.#comissao = value; }

    get valor_viagem() { return this.#valor_viagem; } 
    set valor_viagem(value) { this.#valor_viagem = value; }


    // get valor_total_viagem() { return this.#valor_total_viagem; } 
    // set valor_total_viagem(value) { this.#valor_total_viagem = value; }

    get id_perfil() { return this.#id_perfil; } 
    set id_perfil(value) { this.#id_perfil = value; }



    async cadastrarFrota () {
        let sql = `insert into cadastro_frota(cad_data,cad_origem,cad_destino,cad_frete,cad_material,cad_peso,cad_motorista,cad_transportadora,cad_adiantamento,cad_data_adiantamento, comissao, valor_viagem, id_perfil) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        let valores = [this.#data, this.#origem, this.#destino, this.#frete, this.#material, this.#peso, this.#motorista, this.#transportadora, this.#adiantamento, this.#data_adiantamento, this.#comissao, this.#valor_viagem, this.#id_perfil];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    } 


    

    async valorTotalFrota (id) {
        let sql = `select sum(cad_frete * cad_peso) as total from cadastro_frota where id_perfil = ?`
        let valores = [id];
        let resultado = await db.ExecutaComando(sql,valores);
        return resultado[0]?.total ? parseFloat(resultado[0].total) : 0;
    }

    async listarCadastroDeFrotaCompleto (id) {
        let sql = `select * from cadastro_frota where id_perfil = ?`;
        let valores = [id]
        let resultado = await db.ExecutaComando(sql,valores);
        let listaFrota = [];
        for(let registro of resultado) {
            listaFrota.push(new CadastroFrotaControllerModel (
                registro['cad_id'],
                registro['cad_data'],
                registro['cad_origem'], 
                registro['cad_destino'],
                registro['cad_frete'],
                registro['cad_material'],
                registro['cad_peso'],
                registro['cad_motorista'],
                registro['cad_transportadora'],
                registro['cad_adiantamento'],
                registro['cad_data_adiantamento'],
                registro['comissao'],
                registro['valor_viagem']
                // registro['valor_total_viagem']
            ));
        }
        return listaFrota; 
    }

    async listarSomenteEmDatasEspecificas (id,data1,data2) {
        let sql = `select * from cadastro_frota where id_perfil = ? and cad_data between ? and ?`;
        let valores = [id,data1,data2];
        let resultado = await db.ExecutaComando(sql,valores);
        let listaFrota = [];
        for(let registro of resultado) {
            listaFrota.push(new CadastroFrotaControllerModel (
                registro['cad_id'],
                registro['cad_data'],
                registro['cad_origem'], 
                registro['cad_destino'],
                registro['cad_frete'],
                registro['cad_material'],
                registro['cad_peso'],
                registro['cad_motorista'],
                registro['cad_transportadora'],
                registro['cad_adiantamento'],
                registro['cad_data_adiantamento'],
                registro['comissao'],
                registro['valor_viagem']
                // registro['valor_total_viagem']
            ));
        }
        return listaFrota; 
    }

    async obterFrota (id) {
        let sql = `select * from cadastro_frota where cad_id = ?`;
        let valores = [id];

        var colunas = await db.ExecutaComando(sql,valores);
        if(colunas.length > 0) {
            var coluna = colunas[0];

            return new CadastroFrotaControllerModel(
                coluna['cad_id'],
                coluna['cad_data'],
                coluna['cad_origem'],
                coluna['cad_destino'],
                coluna['cad_frete'],
                coluna['cad_material'],
                coluna['cad_peso'],
                coluna['cad_motorista'],
                coluna['cad_transportadora'],
                coluna['cad_adiantamento'],
                coluna['cad_data_adiantamento'],
                coluna['valor_viagem'],
                coluna['valor_total_viagem'],
                coluna['id_perfil'],
                coluna['comissao']
            )
        }

        return null
    }
 

    async alterarFrota () {
        let sql = `update cadastro_frota set cad_data = ?, cad_origem = ?, cad_destino = ?, cad_frete = ?, cad_material = ?, cad_peso = ?, cad_motorista = ?, cad_transportadora = ?,    
                   cad_adiantamento = ?, cad_data_adiantamento = ?, valor_viagem = ?, comissao = ?, id_perfil = ? where cad_id = ?`

        let valores = [this.#data, this.#origem, this.#destino, this.#frete, this.#material, this.#peso, this.#motorista, this.#transportadora, this.#adiantamento, this.#data_adiantamento, this.#comissao, this.#valor_viagem, this.#id_perfil, this.#id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async excluir (cod) {
        let sql = `delete from cadastro_frota where cad_id = ?`
        let valores = [cod];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    // quando eu quiser listar o valor total de todas as viagens

    // async listarCadastroDeFrotaValorTotalViagem (id) {
    //     let sql = `select valor_total_viagem from cadastro_frota where id_perfil = ? order by cad_id desc limit 1 `;
    //     let valores = [id];
    //     let resultado = await db.ExecutaComando(sql,valores);
    //     return resultado[0]?.valor_total_viagem ? parseFloat(resultado[0].valor_total_viagem) : 0;
        
    // }
}


module.exports = CadastroFrotaControllerModel;