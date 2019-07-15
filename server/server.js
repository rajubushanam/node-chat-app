const path = require('path');
const express = require('express');
let app = new express();
let http = require('http').createServer(app)
let io = require('socket.io')(http)

const publicPath = path.join(__dirname, '/../public/index.html');
const port = process.env.PORT || 3001;

// app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.sendFile(publicPath)
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

http.listen(port, () => {
  console.log("Server Running on Port 3001");
});
