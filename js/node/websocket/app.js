const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('hey!');
});

server.listen(3000);

const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('Kullanıcı bağlandı.');

    /*setInterval(() => {
        socket.emit('merhaba de', { country: 'Türkiye' });
    }, 1000);*/

    socket.on('selam ver', (data) => {
        console.log(data.city);
        console.log(data.name);
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı ayrıldı.');
    });
});