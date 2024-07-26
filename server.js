const express = require("express");
const app = express(); // make an express app

//serve the files in public statically
app.use(express.static("public"));
const expressServer = app.listen(4000);

const socketio = require("socket.io");
// io is our socket.io server
const io = socketio(expressServer, {});

// on is a regular javascript/node event listener
//emit is the other big method
io.on("connect", (socket) => {
  console.log(socket.id, "has joined our server!");

  // firt arg of emit is the event name
  socket.emit("welcome", [1, 2, 3]); //push an event to the client/browser

  socket.on("thankYou", (data) => {
    console.log("message from client", data);
  });
});
