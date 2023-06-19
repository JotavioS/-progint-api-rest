<h1 class="mb-1 text-lg font-bold"><a class="text-blue-700"href="https://www.ifpe.edu.br/campus/garanhuns">Instituto Federal de Pernambuco - Campus Garanhuns</a></h3>
    <h3 class="mb-1 text-lg font-bold">Tecnólogo em Análise e Desenvolvimento de Sistemas</a></h3>
    <h3 class="mb-1 text-lg font-bold">Discente: <a class="text-blue-700" href="https://github.com/JotavioS">João Otávio
            Gurgel Souto</a></h3>
    <h3 class="mb-1 text-lg font-bold">Docente: <a class="text-blue-700"
            href="https://br.linkedin.com/in/genesislima">Genesis Jeferson Ferreira Pereira de Lima</a></h3>
    <h1 class="mb-1 text-lg font-bold">Disciplina: Programação para Internet I</h1>
    <br>
    <h3 class="mb-2 text-2xl font-bold text-center">Criação de API REST e integração front-end com manipulação de dom
</h1>
<br>
<p class="font-bold">Resumo:</p>
<p class="text-justify">
    Este trabalho tem como objetivo apresentar o desenvolvimento de uma aplicação web que permite o controle de duas
    entidades: <a class="text-blue-700 font-bold" href="/funcionarios">funcionário</a> e <a
        class="text-blue-700 font-bold" href="/projetos">projeto</a>. Para isso, foi criada uma API REST usando Express
    e um banco de dados SQL para
    manipular as entidades no back-end, e uma página HTML com JavaScript puro e Tailwind para exibir e interagir com as
    entidades no front-end. A aplicação segue os requisitos propostos na atividade avaliativa, que consistem em realizar
    as operações de cadastro, listagem, atualização e remoção das entidades tanto na tabela HTML quanto no serviço REST.
    Além disso, a aplicação utiliza os conceitos de chamada assíncrona por meio do fetch, async e await. O trabalho está
    organizado em duas partes: a primeira aborda o desenvolvimento do front-end e a segunda aborda o
    desenvolvimento do back-end e a integração com o front-end.
</p>
<br>
<p><b>Palavras-chave:</b> front-end; back-end; NODE JS; SQL; API REST; Tailwind CSS; manipulação de dom.</p>
<br>
<h3 class="my-6 text-lg font-bold text-center">Documentação da API REST</h1>
<h5 class="my-6 text-lg font-bold">Listar Funcionários</h5>
<code>GET api/funcionarios</code>
<p class="my-4">Esta rota retorna uma lista de funcionários.</p>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    [
        {
          "id": 1,
          "nome": "Funcionário 1",
          "sobrenome": "Sobrenome 1",
          "salario": 2000.0,
          "dataNascimento": "1990-01-01"
        },
        {
          "id": 2,
          "nome": "Funcionário 2",
          "sobrenome": "Sobrenome 2",
          "salario": 2500.0,
          "dataNascimento": "1995-05-10"
        }
    ]
</code>

<h5 class="my-6 text-lg font-bold">Criar Funcionário</h5>
<code>POST api/funcionario</code>
<p class="my-4">Esta rota cria um novo funcionário.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"nome" (string, obrigatório): o nome do funcionário.</li>
    <li>"sobrenome" (string, obrigatório): o sobrenome do funcionário.</li>
    <li>"salario" (string, obrigatório): o salário do funcionário.</li>
    <li>"data_nascimento" (string, obrigatório): a data de nascimento do funcionário no formato "YYYY-MM-DD".</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    [
        {
          "id": 1,
          "nome": "Funcionário 1",
          "sobrenome": "Sobrenome 1",
          "salario": 2000.0,
          "dataNascimento": "1990-01-01"
        },
        {
          "id": 2,
          "nome": "Funcionário 2",
          "sobrenome": "Sobrenome 2",
          "salario": 2500.0,
          "dataNascimento": "1995-05-10"
        }
    ]
</code>

<h5 class="my-6 text-lg font-bold">Obter Funcionário</h5>
<code>GET api/funcionario/id</code>
<p class="my-4">Esta rota retorna os detalhes de um funcionário específico com base no ID fornecido.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"id" (number, obrigatório): o ID do funcionário.</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    {
        "id": 1,
        "nome": "Funcionário 1",
        "sobrenome": "Sobrenome 1",
        "salario": 2000.0,
        "dataNascimento": "1990-01-01"
    }
</code>

<h5 class="my-6 text-lg font-bold">Atualizar Funcionário</h5>
<code>PUT api/funcionario/id</code>
<p class="my-4">Esta rota atualiza um funcionário existente com base no ID fornecido.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"id" (number, obrigatório): o ID do funcionário a ser atualizado.</li>
    <li>"nome" (string, obrigatório): o nome atualizado do funcionário.</li>
    <li>"sobrenome" (string, obrigatório): o sobrenome atualizado do funcionário.</li>
    <li>"salario" (float, obrigatório): o salário atualizado do funcionário.</li>
    <li>"data_nascimento" (string, obrigatório): a data de nascimento atualizada do funcionário no formato "YYYY-MM-DD".</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de solicitação:</p>
<code>
    {
        "nome": "Funcionário Atualizado",
        "sobrenome": "Sobrenome Atualizado",
        "salario": "3500.00",
        "data_nascimento": "1992-03-15"
    }
</code>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    {
        "id": 1,
        "nome": "Funcionário Atualizado",
        "sobrenome": "Sobrenome Atualizado",
        "salario": 3500.0,
        "dataNascimento": "1992-03-15"
    }
</code>

<h5 class="my-6 text-lg font-bold">Excluir Funcionário</h5>
<code>DELETE api/funcionario/id</code>
<p class="my-4">Esta rota exclui um funcionário com base no ID fornecido.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"id" (number, obrigatório): o ID do funcionário a ser excluído.</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    {
        "message": "Funcionário deletado com sucesso"
    }
</code>

<h5 class="my-6 text-lg font-bold">Listar Projetos</h5>
<code>GET api/projetos</code>
<p class="my-4">Esta rota retorna uma lista de projetos.</p>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    [
        {
          "id": 1,
          "nome": "Projeto 1",
          "dataInicio": "2023-06-15",
          "dataTermino": "2023-06-30",
          "descricao": "Descrição do Projeto 1",
          "responsavel": 1,
          "funcionarios": [1, 2]
        },
        {
          "id": 2,
          "nome": "Projeto 2",
          "dataInicio": "2023-07-01",
          "dataTermino": null,
          "descricao": "Descrição do Projeto 2",
          "responsavel": 3,
          "funcionarios": [3, 4]
        }
    ]
</code>

<h5 class="my-6 text-lg font-bold">Criar Projeto</h5>
<code>POST api/projeto</code>
<p class="my-4">Esta rota cria um novo projeto.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"nome" (string, obrigatório): o nome do projeto.</li>
    <li>"data_inicio" (string, obrigatório): a data de início do projeto no formato "YYYY-MM-DD".</li>
    <li>"data_termino" (string, opcional): a data de término do projeto no formato "YYYY-MM-DD". Pode ser nulo.</li>
    <li>"descricao" (string, opcional): a descrição do projeto.</li>
    <li>"responsavel" (int, obrigatório): o id do funcionário responsável pelo projeto.</li>
    <li>"funcionarios" (array de ints, obrigatório): ids dos funcionários associados ao projeto.</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de solicitação:</p>
<code>
    {
        "nome": "Novo Projeto",
        "data_inicio": "2023-06-20",
        "data_termino": "2023-07-15",
        "descricao": "Descrição do Novo Projeto",
        "responsavel": 1,
        "funcionarios": [1, 2]
    }
</code>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    {
        "id": 1,
        "nome": "Novo Projeto",
        "data_inicio": "2023-06-20",
        "data_termino": "2023-07-15",
        "descricao": "Descrição do Novo Projeto",
        "responsavel": 1,
        "funcionarios": [1, 2]
    }
</code>

<h5 class="my-6 text-lg font-bold">Obter Projeto</h5>
<code>GET api/projeto/id</code>
<p class="my-4">Esta rota retorna os detalhes de um projeto específico com base no ID fornecido.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"id"  (number, obrigatório): o ID do projeto.</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    {
        "id": 1,
        "nome": "Projeto 1",
        "data_inicio": "2023-06-20",
        "data_termino": "2023-07-15",
        "descricao": "Descrição do Projeto 1",
        "responsavel": 1,
        "funcionarios": [1, 2]
    }
</code>

<h5 class="my-6 text-lg font-bold">Atualizar Projeto</h5>
<code>PUT api/projeto/id</code>
<p class="my-4">Esta rota atualiza um projeto existente com base no ID fornecido.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"id"  (number, obrigatório): o ID do projeto a ser atualizado.</li>
    <li>"nome" (string, obrigatório): o nome atualizado do projeto.</li>
    <li>"data_inicio" (string, obrigatório): a data de início atualizada do projeto no formato "YYYY-MM-DD".</li>
    <li>"data_termino" (string, opcional): a data de término atualizada do projeto no formato "YYYY-MM-DD". Pode ser nulo.</li>
    <li>"descricao" (string, opcional): a descrição atualizada do projeto.</li>
    <li>"responsavel" (int, obrigatório): o id do funcionário atualizado responsável pelo projeto.</li>
    <li>"funcionarios" (array de ints, obrigatório): ids dos funcionários atualizados associados ao projeto.</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de solicitação:</p>
<code>
    {
        "nome": "Projeto Atualizado",
        "data_inicio": "2023-06-20",
        "data_termino": "2023-07-15",
        "descricao": "Descrição do Projeto Atualizado",
        "responsavel": 3,
        "funcionarios": [1, 3]
    }
</code>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    {
        "id": 1,
        "nome": "Projeto Atualizado",
        "data_inicio": "2023-06-20",
        "data_termino": "2023-07-15",
        "descricao": "Descrição do Projeto Atualizado",
        "responsavel": 3,
        "funcionarios": [1, 3]
    }
</code>

<h5 class="my-6 text-lg font-bold">Excluir Projeto</h5>
<code>DELETE api/projeto/id</code>
<p class="my-4">Esta rota exclui um projeto com base no ID fornecido.</p>
<p class="my-6 text-lg font-bold">Parâmetros da solicitação</p>
<ul>
    <li>"id"  (number, obrigatório): o ID do projeto a ser excluído.</li>
</ul>
<p class="my-6 text-lg font-bold">Exemplo de resposta:</p>
<code>
    {
        "message": "Projeto deletado com sucesso"
    }
</code>