// Função para carregar e exibir os dados na tabela somente leitura
function carregarTabela() {
    var dados = localStorage.getItem('tabelaDados');
    if (dados) {
        dados = JSON.parse(dados);
        var tabela = document.querySelector('#readonlyTable tbody');
        tabela.innerHTML = ''; // Limpa o corpo da tabela

        dados.forEach(function(linhaDados) {
            var tr = document.createElement('tr');
            var tdData = document.createElement('td');
            var tdHora = document.createElement('td');
            var tdAtividade = document.createElement('td');

            // Preencher as células com os dados
            tdData.textContent = linhaDados.data; // Campo de data
            tdHora.textContent = linhaDados.hora; // Campo de hora
            tdAtividade.textContent = linhaDados.atividade; // Campo de atividade

            // Adiciona as células à linha
            tr.appendChild(tdData);
            tr.appendChild(tdHora);
            tr.appendChild(tdAtividade);
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

