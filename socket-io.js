import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const hostname = '127.0.0.1';

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendfile(__dirname + '/views/chatui.html');
});

io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymous"
    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })
    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })
    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username })
    })
})

server.listen(
    9898,
    hostname,
    () => {
        console.log(`Server running at http://${hostname}:9898/`);
    }
)