import api from './api';
import server from './app/server';
import express from 'express';
import IO from 'socket.io';
import HTTP from 'http';



const App = express();
const http = HTTP.createServer(App);
const port = 3000;
const io = IO(http);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

App.use('/api/', api);
App.use('/', server);
App.use(express.static('dist'));

http.listen(port, () => console.log(`Server running on port: ${port}!`));
