const express = require('express');
const app = express();
const port = 4000;
const socketPort = 3000;
const cors = require('cors');
const path = require('path')
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
const http = require('http').Server(app);
http.listen(socketPort)
const server = require('socket.io')(http, {
     cors: {
         origin: "*"
    }
});

app.get('', (req, res,  next) => {
    res.send({
        success: true
    })
})


server.on('connection', (socket) => {
    socket.on('buffer', (data) => {
        server.emit('buffer', data)
    })

});

app.listen(port, () =>{
    console.log('connected')
})