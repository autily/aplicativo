// Função para adicionar uma nova linha com campos de data e hora
function adicionarLinha() {
    var tabela = document.querySelector('#editableTable tbody');
    var tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="date" class="editable"></td>
        <td><input type="time" class="editable"></td>
        <td contenteditable="true" class="editable"></td>
        <td>
            <button class="editar-btn" onclick="editarLinha(this)">Editar</button>
            <button class="apagar-btn" onclick="apagarLinha(this)">Apagar</button>
        </td>
    `;
    tabela.appendChild(tr);
    salvar(); // Salva automaticamente após adicionar a linha
}

// Função para apagar uma linha
function apagarLinha(botao) {
    botao.closest('tr').remove();
    salvar(); // Salva automaticamente após apagar a linha
}

// Função para salvar os dados da tabela no LocalStorage
function salvar() {
    var tabelaDados = [];
    document.querySelectorAll('#editableTable tbody tr').forEach(function(tr) {
        var linhaDados = {
            data: tr.querySelector('td:nth-child(1) input').value, // Coleta o valor do campo de data
            hora: tr.querySelector('td:nth-child(2) input').value, // Coleta o valor do campo de hora
            atividade: tr.querySelector('td:nth-child(3)').textContent // Coleta o valor da atividade (editável)
        };
        tabelaDados.push(linhaDados);
    });
    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

// Função para carregar os dados da tabela salvos no LocalStorage
function carregarTabela() {
    var dados = localStorage.getItem('tabelaDados');
    if (dados) {
        dados = JSON.parse(dados);
        var tabela = document.querySelector('#editableTable tbody');
        tabela.innerHTML = ''; // Limpa o corpo da tabela

        dados.forEach(function(linhaDados) {
            var tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="date" class="editable" value="${linhaDados.data}"></td>
                <td><input type="time" class="editable" value="${linhaDados.hora}"></td>
                <td contenteditable="true" class="editable">${linhaDados.atividade}</td>
                <td>
                    <button class="editar-btn" onclick="editarLinha(this)">Editar</button>
                    <button class="apagar-btn" onclick="apagarLinha(this)">Apagar</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    }
}

// Função para apagar todos os dados da tabela e do LocalStorage
function apagarTudo() {
    if (confirm("Deseja apagar todos os dados?")) {
        localStorage.removeItem('tabelaDados');
        carregarTabela(); // Recarrega a tabela limpa
    }
}

// Função para editar uma linha (faz as células ficarem editáveis)
function editarLinha(botao) {
    var tr = botao.closest('tr');
    tr.querySelectorAll('td.editable').forEach(td => {
        makeEditable(td);
    });
}

// Função para tornar a célula editável
function makeEditable(cell) {
    if (cell.contentEditable !== "true") {
        cell.contentEditable = "true";
        cell.focus();
    }

    cell.addEventListener('blur', function() {
        cell.contentEditable = "false";
        salvar(); // Salva automaticamente após a edição
    });
}

// Carrega os dados da tabela quando a página é carregada
window.onload = carregarTabela;

// Função de fechar perfil não implementada
document.querySelector('.close-btn')?.addEventListener('click', closeProfileDrawer);

// Função para esconder/mostrar menu inferior com base no scroll
let lastScrollTop = 0;
const bottomMenu = document.querySelector('.bottom-menu');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        bottomMenu.classList.add('hidden'); // Esconde o menu quando está rolando para baixo
    } else {
        bottomMenu.classList.remove('hidden'); // Mostra o menu quando rola para cima
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Previne valores negativos
});
