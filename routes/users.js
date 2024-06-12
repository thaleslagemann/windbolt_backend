const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/', (req, res) => {
    res.send('this is user route');
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`Este é o usuário com o ID: ${userId}`);
});

router.post('/users/insert', async (req, res) => {
    const { tag, name, uuid } = req.body;

    if (!tag || !name || !uuid) {
        return res.status(400).send('Dados incompletos');
    }

    try {
        const result = pool.query('INSERT INTO users (tag, name, uuid) VALUES ($1, $2, $3) RETURNING *');
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao inserir usuário', err);
        res.status(500).send('Erro ao inserir usuário no banco de dados');
    }
});

module.exports = router;