import api from './api';
import server from './app/server';
import express from 'express';
import IO from 'socket.io';
import HTTP from 'http';
import KvsService from './services/kvsService';

const App = express();
const http = HTTP.createServer(App);
const port = 3000;
const io = IO(http);
const kvs = new KvsService();
const room = 'laura - rob';
const history = kvs.get('laura - rob');

io.on('connection', function(socket) {

    socket.join(room);

    socket.on('chat message', (id, message, users) => {
        io.to(room).emit('chat message', id, message);
        history.push(message);
    });

    socket.on('chat writing', (id) => {
        io.to(room).emit('chat writing', id);
    });

    socket.on('chat stop-writing', (id) => {
        io.to(room).emit('chat stop-writing', id);
    });
});

App.use('/api/', api);
App.use('/', server);
App.use(express.static('dist'));

http.listen(port, () => console.log(`Server running on port: ${port}!`));
