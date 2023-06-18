const db = require('../infra/db/mysqldb');

const salvar = async (projeto) => {
    const sqlInsert = 'INSERT INTO projetos(nome, data_inicio, data_termino, descricao, responsavel) VALUES (?,?,?,?,?)';
    const values = [projeto.nome, projeto.dataInicio, projeto.dataTermino, projeto.descricao, projeto.responsavel];
    const con = await db.getConnection();

    try {
        await con.beginTransaction();
        // Insira o novo projeto na tabela projetos
        const result = await con.execute(sqlInsert, values);
        const newId = result[0].insertId;
        // Insira os novos registros na tabela funcionario_projeto
        const sqlInsert2 = 'INSERT INTO funcionario_projeto(projeto_id, funcionario_id) VALUES (?,?)';
        projeto.funcionarios.forEach(async funcionario => {
            const values2 = [newId, funcionario];
            await con.execute(sqlInsert2, values2);
        });
        await con.commit();
        return result[0];
    } catch (err) {
        await con.rollback();
        throw err;
    } finally {
        con.end();
    }
}

const removerProjeto = async (id) => {
    const sqlDelete = 'delete from projetos where id=?';
    const values = [id];
    const con = await db.getConnection();
    const data = await con.execute(sqlDelete, values);
    return data[0];
}

const atualizarProjeto = async (projeto) => {
    const sqlUpdate = 'update projetos set nome=?, data_inicio=?, data_termino=?, descricao=?, responsavel=? where id=?';
    const values = [projeto.nome, projeto.dataInicio, projeto.dataTermino, projeto.descricao, projeto.responsavel, projeto.id];
    const con = await db.getConnection();

    try {
        await con.beginTransaction();
        // Atualiza o projeto na tabela projetos
        const result = await con.execute(sqlUpdate, values);

        // Deleta os registros anteriores da tabela funcionario_projeto
        const sqlDelete = 'DELETE FROM funcionario_projeto WHERE projeto_id = ?';
        await con.execute(sqlDelete, [ projeto.id ]);

        // Insira os novos registros na tabela funcionario_projeto
        const sqlInsert2 = 'INSERT INTO funcionario_projeto(projeto_id, funcionario_id) VALUES (?,?)';
        projeto.funcionarios.forEach(async funcionario => {
            const values2 = [projeto.id, funcionario];
            await con.execute(sqlInsert2, values2);
        });
        await con.commit();
        return result[0];
    } catch (err) {
        await con.rollback();
        throw err;
    } finally {
        con.end();
    }
}

const listarProjetos = async () => {
    const sqlSelect = "SELECT projetos.*, COUNT(funcionario_projeto.funcionario_id) AS funcionarios, CONCAT( funcionarios.nome, ' ', funcionarios.sobrenome ) as responsavel FROM projetos LEFT JOIN funcionarios ON funcionarios.id = responsavel LEFT JOIN funcionario_projeto ON projeto_id = projetos.id  GROUP BY projetos.id";
    const con = await db.getConnection();
    return await con.execute(sqlSelect);
}

const getProjetoById = async (id) => {
    const sqlSelectById = "SELECT projetos.*, JSON_ARRAYAGG(funcionario_projeto.funcionario_id) AS funcionarios FROM projetos LEFT JOIN funcionario_projeto ON projetos.id = funcionario_projeto.projeto_id where projetos.id = ? GROUP BY projetos.id";
    const values = [id];
    const con = await db.getConnection();
    const data = await con.execute(sqlSelectById, values);
    return data[0];
}

const getProjetoFuncionarios = async (id) => {
    const sqlSelectById = "SELECT funcionarios.id as valor, CONCAT(nome, ' ', sobrenome) as nome FROM funcionario_projeto, funcionarios WHERE projeto_id =? AND funcionario_projeto.funcionario_id = funcionarios.id";
    const values = [id];
    const con = await db.getConnection();
    const data = await con.execute(sqlSelectById, values);
    return data[0];
}

module.exports = { salvar, listarProjetos, removerProjeto, getProjetoById, atualizarProjeto, getProjetoFuncionarios }
