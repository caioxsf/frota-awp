const Database = require('../utils/database');
const db = new Database();

class listaFrotasDataEspecificas {

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
    #valor_viagem;
    #valor_total_viagem;
    #id_perfil;
    #primeiraData;
    #segundaData;

    constructor(id, data, origem, destino, frete, material, peso, motorista, transportadora, adiantamento, data_adiantamento, valor_viagem, valor_total_viagem, id_perfil,primeiraData,segundaData) {
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
        this.valor_viagem = valor_viagem;
        this.#valor_total_viagem = valor_total_viagem;
        this.#id_perfil = id_perfil;
        this.#primeiraData = primeiraData;
        this.#segundaData = segundaData;
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

    get valor_viagem() { return this.#valor_viagem; } 
    set valor_viagem(value) { this.#valor_viagem = value; }

    get valor_total_viagem() { return this.#valor_total_viagem; } 
    set valor_total_viagem(value) { this.#valor_total_viagem = value; }

    get id_perfil() { return this.#id_perfil; } 
    set id_perfil(value) { this.#id_perfil = value; }

    get primeiraData () {return this.#primeiraData}
    set primeiraData (value) {this.#primeiraData = value};

    get segundaData () {return this.#segundaData}
    set segundaData (value) {this.#segundaData = value};


    async listarSomenteEmDatasEspecificas (id,data1,data2) {
        let sql = `select * from cadastro_frota where id_perfil = ? and cad_data between ? and ?`;
        let valores = [id,data1,data2];
        let resultado = await db.ExecutaComando(sql,valores);
        let listaFrota = [];
        for(let registro of resultado) {
            listaFrota.push(new listaFrotasDataEspecificas (
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
                registro['valor_viagem'],
                registro['valor_total_viagem']
            ));
        }
        return listaFrota; 
    }

   

}

module.exports = listaFrotasDataEspecificas;