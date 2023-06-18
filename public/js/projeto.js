const popupAction = document.getElementById("popupAction");
const selectResponsavel = document.getElementById("responsavel");
const selectFuncionarios = document.getElementById('funcionariosSelect');
const nomeInput = document.getElementById('nome');
const dataInicioInput = document.getElementById('data_inicio');
const dataTerminoInput = document.getElementById('data_termino');
const descricaoInput = document.getElementById('descricao');
const responsavelInput = document.getElementById('responsavel');
let projectId = null;
let funcionariosCadastrados = {};
let funcionarios = [];

// Função para carregar os projetos na tabela
async function carregarProjetos() {
    const tabelaProjetos = document.getElementById('projetosTableBody');
    tabelaProjetos.innerHTML = '';

    try {
        const response = await fetch('http://localhost:8080/api/projetos');
        const projetos = await response.json();

        for (const projeto of projetos) {
            const row = criarRow(projeto);
            tabelaProjetos.appendChild(row);
        }
    } catch (error) {
        console.error('Erro ao carregar os projetos:', error);
        alert('Erro ao carregar os projetos');
    }
}

function criarRow(projeto) {
    const row = document.createElement('tr');

    const nomeCell = criarCell(projeto.nome);
    row.appendChild(nomeCell);

    const descricaoCell = criarCell(projeto.descricao);
    row.appendChild(descricaoCell);

    const responsavelCell = criarCell(projeto.responsavel);
    row.appendChild(responsavelCell);

    const funcionariosCell = criarCell(projeto.funcionarios);
    row.appendChild(funcionariosCell);

    const editarCell = criarLinkCell('Editar', 'text-blue-500 hover:text-blue-700', () => {
        popupAction.textContent = 'Edição de Projeto';
        carregarProjeto(projeto.id);
    });
    row.appendChild(editarCell);

    const excluirCell = criarLinkCell('Excluir', 'text-red-500 text-center hover:text-red-700', () => {
        if (confirm('Tem certeza de que deseja excluir o projeto?')) {
            excluirProjeto(projeto.id, row);
        }
    });
    row.appendChild(excluirCell);

    return row;
}

function criarCell(texto) {
    const cell = document.createElement('td');
    cell.className = 'border border-green-500 text-center text-sm px-4 py-3';
    cell.textContent = texto;
    return cell;
}

function criarLinkCell(texto, classe, callback) {
    const cell = document.createElement('td');
    cell.className = 'border border-green-500 text-center text-sm px-4 py-3';
    const link = document.createElement('a');
    link.href = '#';
    link.className = classe;
    link.textContent = texto;
    link.addEventListener('click', callback);
    cell.appendChild(link);
    return cell;
}

async function carregarProjeto(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/projeto/${id}`);
        const projeto = await response.json();

        nomeInput.value = projeto.nome;
        dataInicioInput.value = new Date(projeto.data_inicio).toISOString().slice(0, 10);
        dataTerminoInput.value = projeto.data_termino ? new Date(projeto.data_termino).toISOString().slice(0, 10) : '';
        descricaoInput.value = projeto.descricao;
        funcionarios = projeto.funcionarios;
        projectId = projeto.id;
        atualizarTabela();
        updateFuncionarios();
        selectResponsavel.value = projeto.responsavel;
        openPopUp();
    } catch (error) {
        console.error('Erro ao carregar os funcionários:', error);
        alert('Erro ao carregar os funcionários');
    }
}

async function carregarFuncionarios() {
    try {
        const response = await fetch('http://localhost:8080/api/funcionarios');
        const funcionarios = await response.json();

        funcionariosCadastrados = {};
        selectFuncionarios.innerHTML = '';

        for (const funcionario of funcionarios) {
            funcionariosCadastrados[funcionario.id] = funcionario.nome;

            const option = document.createElement('option');
            option.textContent = funcionario.nome_completo;
            option.value = funcionario.id;
            selectFuncionarios.appendChild(option);
        }
    } catch (error) {
        console.error('Erro ao carregar os funcionários:', error);
        alert('Erro ao carregar os funcionários');
    }
}

const openPopUp = () => {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');
}

const closePopUp = () => {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.classList.add('hidden');
    popup.classList.add('hidden');

    nomeInput.value = '';
    dataInicioInput.value = '';
    dataTerminoInput.value = '';
    descricaoInput.value = '';
    responsavelInput.value = '';
    funcionarios = [];
    selectResponsavel.innerHTML = "";
    projectId = null;
}

const novoProjetoLink = document.getElementById('novoProjetoLink');
novoProjetoLink.addEventListener('click', () => {
    popupAction.textContent = 'Cadastro de Projeto';
    openPopUp();
});

const cancelarBtn = document.getElementById('cancelarBtn');
cancelarBtn.addEventListener('click', () => {
    closePopUp();
});

const overlay = document.getElementById('overlay');
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        closePopUp();
    }
});

const salvarBtn = document.getElementById('salvarBtn');
salvarBtn.addEventListener('click', async () => {
    const nome = nomeInput.value;
    const data_inicio = dataInicioInput.value;
    const data_termino = dataTerminoInput.value;
    const descricao = descricaoInput.value;
    const responsavel = responsavelInput.value;

    // Validar os campos
    if (nome.trim() === '') {
        alert('O campo Nome é obrigatório');
        return;
    }

    if (data_inicio.trim() === '') {
        alert('O campo Data de Início é obrigatório');
        return;
    }

    if (responsavel.trim() === '') {
        alert('O campo Responsavel é obrigatório');
        return;
    }

    const novoProjeto = {
        nome: nome,
        data_inicio: data_inicio,
        data_termino: data_termino,
        descricao: descricao,
        responsavel: responsavel,
        funcionarios: funcionarios
    };

    const url = projectId ? `http://localhost:8080/api/projeto/${projectId}` : 'http://localhost:8080/api/projeto';
    const method = projectId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProjeto)
        });

        if (response.ok) {
            closePopUp();
            carregarProjetos();
        } else {
            throw new Error('Erro ao salvar o projeto');
        }
    } catch (error) {
        console.error('Erro ao salvar o projeto:', error);
        alert('Erro ao salvar o projeto');
    }
});

function updateFuncionarios() {
    selectResponsavel.innerHTML = "";

    for (const funcionarioId of funcionarios) {
        const option = document.createElement("option");
        option.text = funcionariosCadastrados[funcionarioId];
        option.value = funcionarioId;
        selectResponsavel.add(option);
    }
}

async function adicionarFuncionario() {
    const valor = parseInt(selectFuncionarios.value);

    if (funcionarios.includes(valor)) {
        alert("Este funcionário já está no Projeto!");
        return;
    }

    funcionarios.push(valor);
    atualizarTabela();
    updateFuncionarios();
}

function removerFuncionario(index) {
    funcionarios.splice(index, 1);
    atualizarTabela();
    updateFuncionarios();
}

function atualizarTabela() {
    const tbody = document.querySelector("#funcionariosTabela tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < funcionarios.length; i++) {
        const tr = document.createElement("tr");
        const tdNome = document.createElement("td");
        const tdBotao = document.createElement("td");
        const botao = document.createElement("button");

        tdNome.textContent = funcionariosCadastrados[funcionarios[i]];
        tdNome.className = 'border border-green-500 text-center text-sm px-4 py-3';
        tr.appendChild(tdNome);

        botao.textContent = "Excluir";
        botao.onclick = () => {
            removerFuncionario(i);
        };
        tdBotao.appendChild(botao);
        tdBotao.className = 'border border-green-500 text-red-500 text-center hover:text-red-700';
        tr.appendChild(tdBotao);

        tbody.appendChild(tr);
    }
}

async function excluirProjeto(id, row) {
    try {
        const response = await fetch(`http://localhost:8080/api/projeto/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            row.remove();
        } else {
            throw new Error('Erro ao excluir o funcionário');
        }
    } catch (error) {
        console.error('Erro ao excluir o funcionário:', error);
        alert('Erro ao excluir o funcionário');
    }
}

carregarProjetos();
carregarFuncionarios();