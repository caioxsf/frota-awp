
document.addEventListener('DOMContentLoaded', function() {


    function primeiraLetraDosNomesEmMaiusculo(texto) {
        if (!texto) 
            return '';
        return texto.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }


    let btn = document.getElementById('btn-add');
    btn.addEventListener('click', listarDatasEspecificas);

    document.getElementById("exportExcel").addEventListener("click", exportarExcel)

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("exportarExcel"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "frotas.xlsx");
    }

    function listarDatasEspecificas () {
        
        
        let id = document.getElementById('idPerfil');
        let primeiraData = document.getElementById('primeiraData');
        let segundaData = document.getElementById('segundaData');
        
        function converterDataParaFormatoISO(data) {
            const [dia, mes, ano] = data.split('/');
            return `${ano}-${mes}-${dia}`;
        }

        const primeiraDataISO = converterDataParaFormatoISO(primeiraData.value);
        const segundaDataISO = converterDataParaFormatoISO(segundaData.value);
        
        if(primeiraData && segundaData && id) {
            let obj = {
                id: id.value,
                primeiraData: primeiraDataISO,
                segundaData: segundaDataISO
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
                let tabela = '';
                if(resposta.frotas.length == 0) {
                    tabela = `
                    <td colspan="12" id="naoTemData">Não há frotas registradas nessa data!</td>
                    `
                    document.getElementById('filtroBuscaDataEspecifica').innerHTML = tabela;
                } 
                else {
                    let comissaoSoma = 0;
                    let adiantamentoSoma = 0;

                    let salario = 2300;
                    let salarioFinal = 0;

                    for(let i=0;i<resposta.frotas.length;i++) {
                        let comissao = resposta.frotas[i].valor_viagem ? resposta.frotas[i].valor_viagem * 8 / 100 : 0;
                        let adiantamento = resposta.frotas[i].adiantamento ? parseFloat(resposta.frotas[i].adiantamento) : 0;

                        comissaoSoma += comissao;
                        adiantamentoSoma += adiantamento;
                    }

                    salarioFinal = salario + comissaoSoma - adiantamentoSoma;
                    const salarioFinalCorrigido = Number(salarioFinal).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, "."); 

                    document.getElementById('exportExcel').style.display = 'block';

                    for(let i=0;i<resposta.frotas.length;i++) {
                        
                        // transformando a data da frota no modelo = 00/00/0000
                        const dataNascimento = new Date(resposta.frotas[i].data); 
                        const dia = String(dataNascimento.getDate()).padStart(2, '0'); 
                        const mes = String(dataNascimento.getMonth() + 1).padStart(2, '0');
                        const ano = dataNascimento.getFullYear();
                        resposta.frotas[i].data = `${dia}/${mes}/${ano}`;

                        // transformando a data do adiantamento no modelo = 00/00/0000
                        if(resposta.frotas[i].data_adiantamento) {
                            const dataAdiantamento = new Date(resposta.frotas[i].data_adiantamento); 
                            const diaa = String(dataAdiantamento.getDate()).padStart(2, '0'); 
                            const mess = String(dataAdiantamento.getMonth() + 1).padStart(2, '0');
                            const anoo = dataAdiantamento.getFullYear();
                            resposta.frotas[i].data_adiantamento = `${diaa}/${mess}/${anoo}`;
                        }
                        
    
                        // // transformando o valor em 00.000,00
                        const valorViagem = Number(resposta.frotas[i].valor_viagem).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
                        // const valorTotalViagem = Number(resposta.frotas[i].valor_total_viagem).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        const valorFrete = Number(resposta.frotas[i].frete).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        const valorAdiantamento = Number(resposta.frotas[i].adiantamento).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        

                        // calculando valor da comissao do motorista
                        let comissao = resposta.frotas[i].valor_viagem * 8 / 100;
                        const valorComissao = Number(comissao).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                        if(resposta.frotas[i].adiantamento == 0) 
                            resposta.frotas[i].adiantamento = '';
                        if(resposta.frotas[i].data_adiantamento == null)
                        resposta.frotas[i].data_adiantamento = '';

                        

                        tabela += `
                            <tr>
                                <td>${resposta.frotas[i].data} </td>
                                <td>${primeiraLetraDosNomesEmMaiusculo(resposta.frotas[i].origem) }</td>
                                <td>${primeiraLetraDosNomesEmMaiusculo(resposta.frotas[i].destino)} </td>
                                <td>R$ ${valorFrete} </td>
                                <td>${primeiraLetraDosNomesEmMaiusculo(resposta.frotas[i].material) }</td>
                                <td>${resposta.frotas[i].peso} Kg</td>
                                <td>${primeiraLetraDosNomesEmMaiusculo(resposta.frotas[i].motorista)} </td>
                                <td>${primeiraLetraDosNomesEmMaiusculo(resposta.frotas[i].transportadora)} </td>
    
                                ${resposta.frotas[i].adiantamento && resposta.frotas[i].adiantamento !== 0 
                                    ? `<td style="color: lightcoral;">R$ -${Number(resposta.frotas[i].adiantamento).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>` 
                                    : '<td></td>'}
                                

                                <td>${resposta.frotas[i].data_adiantamento}</td>
                                <td style="color: rgb(98, 168, 98);">R$ +${valorComissao}</td>
                                <td>R$ ${valorViagem} </td>
                                <td>
                                    <button type="button" style="border: none; background-color: transparent;"><i class="fas fa-trash" style="color: lightcoral; "></i></button>
                                    <a href="/frotas/alterar/${resposta.frotas[i].id}"><i class="fas fa-edit" style="color: lightskyblue;"></i></a>
                                </td>
                                ${i === 0 ? `<td rowspan="${resposta.frotas.length}">R$ ${salarioFinalCorrigido}</td>` : ''}

                            </tr>
                        `;
                        
                    } 
                    document.getElementById('filtroBuscaDataEspecifica').innerHTML = tabela;
                }
                    
                    
                
            })
            .catch(function(e) {
                console.error('Erro no fetch', e);
            });
        }
     }
});

