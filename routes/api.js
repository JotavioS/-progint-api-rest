const express = require('express');
const moment = require('moment');
const router = express.Router();
const projetoDAO = require('../repository/ProjetoDAO');
const { Projeto } = require('../model/Projeto');

const funcionarioDAO = require('../repository/FuncionarioDAO');
const { Funcionario } = require('../model/Funcionario');

router.get('/projetos', async (req, res) => {
    const [projetos] = await projetoDAO.listarProjetos();
    res.json(projetos);
});

router.post('/projeto', async (req, res) => {
    try {
        const projeto = new Projeto();
        projeto.nome = req.body.nome;
        projeto.dataInicio = req.body.data_inicio;
        projeto.dataTermino = req.body.data_termino != '' ? req.body.data_termino : null;
        projeto.descricao = req.body.descricao;
        projeto.responsavel = req.body.responsavel;
        projeto.funcionarios = req.body.funcionarios;
        result = await projetoDAO.salvar(projeto);
        console.log(result);
        projeto.id = result.insertId;
        res.status(201).json(projeto);
    } catch (error) {
        console.error('Erro ao criar o projeto:', error);
        res.status(500).json({ error: 'Erro ao criar o projeto' });
    }
});

router.get('/projeto/:id', async (req, res) => {
    try {
        const [projeto] = await projetoDAO.getProjetoById(req.params.id);
        if (projeto) {
            res.json(projeto);
        } else {
            res.status(404).json({ error: 'Projeto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar o projeto:', error);
        res.status(500).json({ error: 'Erro ao buscar o projeto' });
    }
});

router.put('/projeto/:id', async (req, res) => {
    try {
        const projeto = new Projeto();
        projeto.id = req.params.id;
        projeto.nome = req.body.nome;
        projeto.dataInicio = req.body.data_inicio;
        projeto.dataTermino = req.body.data_termino != '' ? req.body.data_termino : null;
        projeto.descricao = req.body.descricao;
        projeto.responsavel = req.body.responsavel;
        projeto.funcionarios = req.body.funcionarios;

        console.log(projeto);

        const result = await projetoDAO.atualizarProjeto(projeto);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Projeto não encontrado' });
        } else {
            res.status(201).json(projeto);
        }
    } catch (error) {
        console.error('Erro ao atualizar o projeto:', error);
        res.status(500).json({ error: 'Erro ao atualizar o projeto' });
    }
});

router.delete('/projeto/:id', async (req, res) => {
    try {
        const result = await projetoDAO.removerProjeto(req.params.id);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Projeto não encontrado' });
        } else {
            res.json({ message: 'Projeto deletado com sucesso' });
        }
    } catch (error) {
        console.error('Erro ao deletar o Projeto:', error);
        res.status(500).json({ error: 'Erro ao deletar o Projeto' });
    }
});

router.get('/funcionarios', async (req, res) => {
    try {
        const [funcionarios] = await funcionarioDAO.listarFuncionarios();
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os funcionários' });
    }
});

router.post('/funcionario', async (req, res) => {
    try {
        const funcionario = new Funcionario();
        funcionario.nome = req.body.nome;
        funcionario.sobrenome = req.body.sobrenome;
        funcionario.salario = req.body.salario.replace(',', '.');
        funcionario.dataNascimento = req.body.data_nascimento;
        funcionarioDD = await funcionarioDAO.salvar(funcionario);
        funcionario.id = funcionarioDD.insertId;
        res.status(201).json(funcionario);
    } catch (error) {
        console.error('Erro ao criar o funcionário:', error);
        res.status(500).json({ error: 'Erro ao criar o funcionário' });
    }
});

router.get('/funcionario/:id', async (req, res) => {
    try {
        const [funcionario] = await funcionarioDAO.getFuncionarioById(req.params.id);
        if (funcionario) {
            res.json(funcionario);
        } else {
            res.status(404).json({ error: 'Funcionário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar o funcionário:', error);
        res.status(500).json({ error: 'Erro ao buscar o funcionário' });
    }
});

router.put('/funcionario/:id', async (req, res) => {
    try {
        const funcionario = new Funcionario();
        funcionario.id = req.params.id;
        funcionario.nome = req.body.nome;
        funcionario.sobrenome = req.body.sobrenome;
        funcionario.salario = req.body.salario.replace(',', '.');
        funcionario.dataNascimento = req.body.data_nascimento;

        const result = await funcionarioDAO.atualizarFuncionario(funcionario)
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Funcionário não encontrado' });
        } else {
            res.status(201).json(funcionario);
        }
    } catch (error) {
        console.error('Erro ao atualizar o funcionário:', error);
        res.status(500).json({ error: 'Erro ao atualizar o funcionário' });
    }
});

router.delete('/funcionario/:id', async (req, res) => {
    try {
        const result = await funcionarioDAO.removerFuncionario(req.params.id);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Funcionário não encontrado' });
        } else {
            res.json({ message: 'Funcionário deletado com sucesso' });
        }
    } catch (error) {
        console.error('Erro ao deletar o funcionário:', error);
        res.status(500).json({ error: 'Erro ao deletar o funcionário' });
    }
});

module.exports = router;