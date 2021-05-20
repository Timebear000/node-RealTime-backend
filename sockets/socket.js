const { checkJWT } = require("../helpers/jwt");
const { io } = require("../server");
const {
  userConnection,
  userDisconnection,
  keepMessage,
} = require("../controllers/socket");
console.log("init Server");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Client connection");
  const [validation, uid] = checkJWT(client.handshake.headers["x-token"]);

  if (!validation) {
    return client.disconnect();
  }

  userConnection(uid);

  //사람대 사람대 룸
  //글로벌 룸
  client.join(uid);

  client.on("message-send", async (payload) => {
    await keepMessage(payload);
    io.to(payload.to).emit("message-personal", payload);
  });

  client.on("disconnect", () => {
    userDisconnection(uid);
  });
});
