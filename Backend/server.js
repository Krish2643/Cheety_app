const express = require('express');
const app = express();
const { join } = require('node:path');

const { createServer } = require('node:http');
const server = createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*"
      }
});

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//            origin: "*",
//         }
// })


io.on("connection", (socket)=>{
    socket.on("chat", (payload)=>{
         console.log("Message received from client : ", payload);
     io.emit("chat", payload);
    })
})

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });