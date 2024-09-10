// Função para tornar a célula editável
function makeEditable(cell) {
    const originalText = cell.innerHTML;
    cell.contentEditable = true;
    cell.focus();

    cell.addEventListener('blur', function() {
        cell.contentEditable = false;
        if (cell.innerHTML.trim() === '') {
            cell.innerHTML = originalText; // Restaura o texto original se estiver vazio
        }
        salvar(); // Salva automaticamente após a edição
    });
}

// Adiciona evento de clique às células editáveis
function addEditableListeners() {
    document.querySelectorAll('#editableTable .editable').forEach(cell => {
        cell.addEventListener('click', function() {
            makeEditable(this);
        });
    });
}

// Função para adicionar uma nova linha
function adicionarLinha() {
    var tabela = document.querySelector('#editableTable tbody');
    var tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="editable">Nova Data</td>
        <td class="editable">Nova Hora</td>
        <td class="editable">Nova Atividade</td>
        <td>
            <button class="editar-btn" onclick="editarLinha(this)">Editar</button>
            <button class="apagar-btn" onclick="apagarLinha(this)">Apagar</button>
        </td>
    `;
    tabela.appendChild(tr);
    addEditableListeners(); // Adiciona os eventos de edição
}

// Função para apagar uma linha
function apagarLinha(botao) {
    botao.closest('tr').remove();
    salvar(); // Salva automaticamente após apagar a linha
}

// Função para salvar os dados da tabela no Local Storage
function salvar() {
    var tabelaDados = [];
    document.querySelectorAll('#editableTable tbody tr').forEach(function(tr) {
        var linhaDados = [];
        tr.querySelectorAll('td.editable').forEach(function(td) {
            linhaDados.push(td.textContent);
        });
        tabelaDados.push(linhaDados);
    });
    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

// Função para carregar os dados da tabela salvos no Local Storage
function carregarTabela() {
    var dados = localStorage.getItem('tabelaDados');
    if (dados) {
        dados = JSON.parse(dados);
        var tabela = document.querySelector('#editableTable tbody');
        tabela.innerHTML = ''; // Limpar o corpo da tabela

        dados.forEach(function(linhaDados) {
            var tr = document.createElement('tr');
            linhaDados.forEach(function(celulaDados) {
                var td = document.createElement('td');
                td.classList.add('editable');
                td.textContent = celulaDados;
                tr.appendChild(td);
            });
            tr.innerHTML += `
                <td>
                    <button class="editar-btn" onclick="editarLinha(this)">Editar</button>
                    <button class="apagar-btn" onclick="apagarLinha(this)">Apagar</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
        addEditableListeners(); // Adiciona os eventos de edição
    }
}

// Função para apagar todas as linhas da tabela e do Local Storage
function apagarTudo() {
    if (confirm("Deseja apagar todos os dados?")) {
        localStorage.removeItem('tabelaDados');
        carregarTabela(); // Recarrega a tabela limpa
    }
}

// Função para editar uma linha
function editarLinha(botao) {
    var tr = botao.closest('tr');
    tr.querySelectorAll('td.editable').forEach(td => {
        makeEditable(td);
    });
}

// Carrega a tabela ao carregar a página
window.onload = carregarTabela;
