const express = require('express');
const app = express();
const port = 4000;
const socketPort = 3000;
const cors = require('cors');
const path = require('path')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
const http = require('http').Server(app);
http.listen(socketPort)
const server = require('socket.io')(http, {
     cors: {
         origin: "wss://socket-proxy.web.app"
    }
});
app.use(cors())

app.get('', (req, res,  next) => {
    res.send({
        version: '1.0.0'
    })
})

let connections = 0;

server.on('connection', (socket) => {
    connections++;
    socket.on('buffer', (data) => {
        server.emit('buffer', data)
    });

    socket.on('disconnect', () => {
        connections--;
        server.emit('buffer', {event: 'connection', data: connections })
    });

    server.emit('buffer', {event: 'connection', data: connections })

});

app.listen(port, () =>{
    console.log('connected')
})