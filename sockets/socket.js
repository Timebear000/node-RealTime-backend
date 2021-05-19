const { io } = require("../server");

console.log("init Server");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Client connection");

  client.on("disconnect", () => {
    console.log("Client disconnect");
  });
});
