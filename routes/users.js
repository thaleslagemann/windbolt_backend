const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is user route');
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`Este é o usuário com o ID: ${userId}`);
});

router.post('/', (req, res) => {
    res.send('Usuário criado!');
});

module.exports = router;