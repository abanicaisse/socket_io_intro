// console.log(io);

// io() connects to the socket.io sever at the url
const socket = io("http://localhost:4000");

// just like on our server, our socket has an
// on method
// on emit method
socket.on("welcome", (data) => {
  console.log(data);
  // once welcome is emitted from the server, we run this callback
  socket.emit("thankYou", [4, 5, 6]);
});
