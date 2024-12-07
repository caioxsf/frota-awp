document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('#btn-perfil');
    btn.addEventListener('click', alterar)
 
    function alterar () {
        
    let nome = document.getElementById('nome');
    let email = document.getElementById('email');
    let telefone = document.getElementById('telefone');
    let usuario = document.getElementById('usuario');
    let id = document.getElementById('id');

    if(nome && email && telefone && usuario) {
        let obj = {
            nome: nome.value,
            email: email.value,
            telefone: telefone.value,
            usuario: usuario.value,
            id: id.value
        }

        let stringObj = JSON.stringify(obj);

        fetch('/perfil/alterar/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: stringObj
        })
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(resposta) {
            if(resposta.ok) {
                alert(resposta.msg);
            }
            else {
                alert(resposta.msg);
            }
        })
        .catch (function(e) {
            console.error('erro no fatch' + e);
        })
    }
    }

});