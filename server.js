const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const pool = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1><a href="/users">users</a><br/><a href="/chats">chats</a>');
});

app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(result.rows);
    } catch (err) {
        console.error('Erro ao consultar o banco de dados', err);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
});

const usersRoute = require('./routes/users');
const chatsRoute = require('./routes/chats');

app.use('/users', usersRoute);
app.use('/chats', chatsRoute);

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const port = 3000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
