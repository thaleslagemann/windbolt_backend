const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is chats route');
});

router.get('/:chatId', (req, res) => {
    const chatId = req.params.chatId;
    res.send(`Este é o chat com o ID: ${chatId}`);
});

router.post('/', (req, res) => {
    res.send('Chat criado!');
});

module.exports = router;