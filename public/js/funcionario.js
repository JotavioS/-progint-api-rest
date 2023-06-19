const popupAction = document.getElementById("popupAction");
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');
const salarioInput = document.getElementById('salario');
const dataNascimentoInput = document.getElementById('data_nascimento');
let funcionarioId = null;

// Função para carregar os Funcionarios na tabela
async function carregarFuncionarios() {
    const tabelaFuncionarios = document.getElementById('funcionariosTableBody');

    try {
        // Fazer requisição GET para /funcionarios
        const response = await fetch('http://localhost:8080/api/funcionarios');
        const funcionarios = await response.json();

        // Limpar o conteúdo da tabela
        tabelaFuncionarios.innerHTML = '';

        // Preencher a tabela com os dados dos funcionarios
        funcionarios.forEach(funcionario => {
            const row = document.createElement('tr');

            const nomeCell = criarCelula('border border-green-500 text-center text-sm px-4 py-3', funcionario.nome);
            const sobrenomeCell = criarCelula('border border-green-500 text-center text-sm px-4 py-3', funcionario.sobrenome);
            const salarioCell = criarCelula('border border-green-500 text-center text-sm px-4 py-3', formatarSalario(funcionario.salario));
            const dataNascimentoCell = criarCelula('border border-green-500 text-center text-sm px-4 py-3', formatarData(funcionario.data_nascimento));

            const editarCell = criarCelula('border border-green-500 text-center text-sm px-4 py-3');
            const editarLink = criarLink('text-blue-500 hover:text-blue-700', 'Editar');
            editarLink.addEventListener('click', () => {
                popupAction.textContent = 'Edição de Funcionário';
                carregarFuncionario(funcionario.id);
            });
            editarCell.appendChild(editarLink);

            const excluirCell = criarCelula('border border-green-500 text-center text-sm px-4 py-3');
            const excluirLink = criarLink('text-red-500 text-center hover:text-red-700', 'Excluir');
            excluirLink.addEventListener('click', () => {
                if (confirm('Tem certeza de que deseja excluir o funcionário?')) {
                    excluirFuncionario(funcionario.id, row);
                }
            });
            excluirCell.appendChild(excluirLink);

            row.appendChild(nomeCell);
            row.appendChild(sobrenomeCell);
            row.appendChild(salarioCell);
            row.appendChild(dataNascimentoCell);
            row.appendChild(editarCell);
            row.appendChild(excluirCell);

            tabelaFuncionarios.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar os funcionários:', error);
        alert('Erro ao carregar os funcionários');
    }
}

async function carregarFuncionario(id) {
    try {
        // Fazer requisição GET para /funcionarios
        const response = await fetch(`http://localhost:8080/api/funcionario/${id}`);
        const funcionario = await response.json();

        nomeInput.value = funcionario.nome;
        sobrenomeInput.value = funcionario.sobrenome;
        salarioInput.value = funcionario.salario;
        dataNascimentoInput.value = new Date(funcionario.data_nascimento).toISOString().slice(0, 10);
        funcionarioId = funcionario.id;
        openPopUp();
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

    // Limpar os campos de input
    nomeInput.value = '';
    sobrenomeInput.value = '';
    salarioInput.value = '';
    dataNascimentoInput.value = '';
    funcionarioId = null;
}

// Abrir pop-up ao clicar no link "Novo Funcionário"
const novoFuncionarioLink = document.getElementById('novoFuncionarioLink');
novoFuncionarioLink.addEventListener('click', () => {
    popupAction.textContent = 'Cadastro de Funcionário';
    openPopUp();
});

// Fechar pop-up ao clicar no botão "Cancelar"
const cancelarBtn = document.getElementById('cancelarBtn');
cancelarBtn.addEventListener('click', () => {
    closePopUp();
});

// Fechar pop-up ao clicar no overlay
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        closePopUp();
    }
});

// Salvar novo funcionário
const salvarBtn = document.getElementById('salvarBtn');
salvarBtn.addEventListener('click', () => {
    const nome = nomeInput.value;
    const sobrenome = sobrenomeInput.value;
    const salario = salarioInput.value;
    const dataNascimento = dataNascimentoInput.value;

    // Validar os campos
    if (nome.trim() === '') {
        alert('O campo Nome é obrigatório');
        return;
    }

    if (sobrenome.trim() === '') {
        alert('O campo Sobrenome é obrigatório');
        return;
    }

    if (salario.trim() === '') {
        alert('O campo Salário deve inserido');
        return;
    }

    if (dataNascimento.trim() === '') {
        alert('O campo Data de Nascimento é obrigatório');
        return;
    }

    const novoFuncionario = {
        nome: nome,
        sobrenome: sobrenome,
        salario: salario.replace(/\./g, "").replace(/\,/g, ".").replace('R$ ', ''),
        data_nascimento: dataNascimento,
    };

    const url = funcionarioId ? `http://localhost:8080/api/funcionario/${funcionarioId}` : 'http://localhost:8080/api/funcionario';
    const method = funcionarioId ? 'PUT' : 'POST';

    // Fazer requisição POST para /funcionario
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoFuncionario)
    })
        .then(response => {
            if (response.ok) {
                closePopUp();
                // Recarregar os funcionários na tabela
                carregarFuncionarios();
            } else {
                throw new Error('Erro ao salvar o funcionário');
            }
        })
        .catch(error => {
            console.error('Erro ao salvar o funcionário:', error);
            alert('Erro ao salvar o funcionário');
        });
});

function formatarSalario(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function criarCelula(className, textContent) {
    const cell = document.createElement('td');
    cell.className = className;
    cell.textContent = textContent;
    return cell;
}

function criarLink(className, textContent) {
    const link = document.createElement('a');
    link.href = '#';
    link.className = className;
    link.textContent = textContent;
    return link;
}

async function excluirFuncionario(id, row) {
    try {
        // Fazer requisição DELETE para /funcionario/:id
        const response = await fetch(`http://localhost:8080/api/funcionario/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remover a linha da tabela
            row.remove();
        } else {
            throw new Error('Erro ao excluir o funcionário');
        }
    } catch (error) {
        console.error('Erro ao excluir o funcionário:', error);
        alert('Erro ao excluir o funcionário');
    }
}

// Carregar os funcionários ao carregar a página
carregarFuncionarios();

$(document).ready(function () {
    $("#salario").maskMoney({ prefix: "R$ ", decimal: ",", thousands: "." });
});