document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.btn-add');
    btn.addEventListener('click', register)
 
    function register () {
        
    let nome = document.getElementById('nome');
    let email = document.getElementById('email');
    let telefone = document.getElementById('telefone');
    let usuario = document.getElementById('usuario');
    let senha = document.getElementById('senha');

    if(nome && email && telefone && usuario && senha) {
        let obj = {
            nome: nome.value,
            email: email.value,
            telefone: telefone.value,
            usuario: usuario.value,
            senha: senha.value
        }

        let stringObj = JSON.stringify(obj);

        fetch('/register', {
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