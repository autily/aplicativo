// Função para carregar e exibir os dados na tabela somente leitura
function carregarTabela() {
    var dados = localStorage.getItem('tabelaDados');
    if (dados) {
        dados = JSON.parse(dados);
        var tabela = document.querySelector('#readonlyTable tbody');
        tabela.innerHTML = ''; // Limpar o corpo da tabela

        dados.forEach(function(linhaDados) {
            var tr = document.createElement('tr');
            linhaDados.forEach(function(celulaDados) {
                var td = document.createElement('td');
                td.textContent = celulaDados;
                tr.appendChild(td);
            });
            tabela.appendChild(tr);
        });
    }
}

// Função para voltar para a página principal
function voltar() {
    window.location.href = 'index.html';
}

// Carregar a tabela ao carregar a página
window.onload = carregarTabela;
