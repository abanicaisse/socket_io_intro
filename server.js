const express = require("express");
const app = express(); // make an express app

//serve the files in public statically
app.use(express.static("public"));
const expressServer = app.listen(4000);

const { Server } = require("socket.io"); // the object the docs use to make a server
// io is our socket.io server
// Capital S is the server constructor (in the docs, it's the top thing)
// Small s is the variable in the docs for the server, we call it io
const io = new Server(expressServer, {
  cors: ["http://localhost:4000"],
});

// on is a regular javascript/node event listener
//emit is the other big method
io.on("connect", (socket) => {
  console.log(socket.handshake);
  // Capital S in the doc, for Socket is the constructor
  // lower case , socket, is an individual socket
  console.log(socket.id, "has joined our server!");

  // firt arg of emit is the event name
  // socket.emit will emit to THIS one socket
  // socket.emit("welcome", [1, 2, 3]); //push an event to the client/browser

  // // io.emit will emit to ALL sockets connected to the server
  // io.emit("newClient", socket.id);

  // socket.on("thankYou", (data) => {
  //   console.log("message from client", data);
  // });

  socket.on("msgFromClientToServer", (newMessage) => {
    // pass through the message to everyone connected
    io.emit("msgFromServerToAllClients", newMessage);
  });
});
