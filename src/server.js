const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.Server(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static('src'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(PORT, (req, res) => {
  console.log(`Server Running: ${PORT}`);
});

io.on("connection", (socket) => {
  // console.log("connected");
  socket.on("chat message", (msg) => {
    // console.log("Message: " + msg);
    io.emit("chat message", msg)
  })
});