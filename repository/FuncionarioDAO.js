const db = require('../infra/db/mysqldb');

const salvar = async (funcionario) => {
    const sqlInsert = 'insert into funcionarios(nome, sobrenome, salario, data_nascimento) VALUES (?,?,?,?)';
    const values = [funcionario.nome, funcionario.sobrenome, funcionario.salario, funcionario.dataNascimento];
    const con = await db.getConnection();
    const data = await con.execute(sqlInsert, values);
    return data[0];
}

const removerFuncionario = async (id) => {
    const sqlDelete = 'delete from funcionarios where id=?';
    const values = [id];
    const con = await db.getConnection();
    const data = await con.execute(sqlDelete, values);
    return data[0];
}

const atualizarFuncionario = async (funcionario) => {
    const sqlUpdate = 'update funcionarios set nome=?, sobrenome=?, salario=?, data_nascimento=? where id=?';
    const values = [funcionario.nome, funcionario.sobrenome, funcionario.salario, funcionario.dataNascimento, funcionario.id];
    const con = await db.getConnection();
    const data = await con.execute(sqlUpdate, values);
    return data[0];
}

const listarFuncionarios = async () => {
    const sqlSelect = "select *, CONCAT(nome, ' ', sobrenome) as nome_completo from funcionarios";
    const con = await db.getConnection();
    return await con.execute(sqlSelect);
}

const getFuncionarioById = async (id) => {
    const sqlSelectById = 'select * from funcionarios where id=?'
    const values = [id];
    const con = await db.getConnection();
    const data = await con.execute(sqlSelectById, values);
    return data[0];
}

module.exports = { salvar, listarFuncionarios, removerFuncionario, getFuncionarioById, atualizarFuncionario }
