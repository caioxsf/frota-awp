document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.btn-add');
    btn.addEventListener('click', cadastro);

    function cadastro () {
        
        let id = document.getElementById('idPerfil');
        let data = document.getElementById('data');
        let origem = document.getElementById('origem');
        let destino = document.getElementById('destino');
        let frete = document.getElementById('frete');
        let material = document.getElementById('material');
        let peso = document.getElementById('peso');
        let motorista = document.getElementById('motorista');
        let transportadora = document.getElementById('transportadora');
        let adiantamento = document.getElementById('adiantamento');
        let data_adiantamento = document.getElementById('dataAdiantamento');
        
        //&& origem && frete && material && peso && motorista && transportadora && adiantamento && data_adiantamento
        if(data) {
            let obj = {
                id: id.value,
                data: data.value,
                origem: origem.value,
                destino: destino.value,
                frete: frete.value,
                material: material.value,
                peso: peso.value,
                motorista: motorista.value,
                transportadora: transportadora.value,
                adiantamento: adiantamento.value,
                data_adiantamento: data_adiantamento.value
            }

            let stringObj = JSON.stringify(obj);

            fetch('/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: stringObj
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta){
                if(resposta.ok)
                    alert(resposta.msg)
                else
                    alert(resposta.msg);
            })
            .catch(function(e) {
                console.error('erro no fatch ', e);
            })
        }
    }
})