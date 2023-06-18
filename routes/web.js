const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/funcionarios', async (req, res) => {
    res.render('funcionarios', { title: 'Funcionarios Cadastradas' });
});

router.get('/projetos', async (req, res) => {
    res.render('projetos', { title: 'Projetos Cadastrados'});
});

module.exports = router;