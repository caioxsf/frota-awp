document.addEventListener('DOMContentLoaded', function() {

    let btn = document.getElementById('btn-add');
    btn.addEventListener('click', listarDatasEspecificas);

    function listarDatasEspecificas () {
        
        let id = document.getElementById('idPerfil');
        let primeiraData = document.getElementById('primeiraData');
        let segundaData = document.getElementById('segundaData');
        
        if(primeiraData && segundaData && id) {
            let obj = {
                id: id.value,
                primeiraData: primeiraData.value,
                segundaData: segundaData.value
            }

            let stringObj = JSON.stringify(obj);

            fetch('/frotas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringObj
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta) {
                alert(resposta.msg);
            })
            .catch(function(e) {
                console.error('Erro no fetch', e);
            });
        }
     }
});

