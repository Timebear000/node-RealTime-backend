const express = require("express");
require("colors");
const path = require("path"); //공용 디렉터리 라이브러리
require("dotenv").config(); //환경설정 파일 셋팅
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
// DB Config
require("./databases/config").dbConnection();
// App de Express
const app = express();

//JSON Read
app.use(express.json());

//CORS
app.use(cors());
app.use(morgan("dev"));
// Node Sever
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

//공용 디렉터리 설정
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Routes
app.use("/api/login", require("./routes/auth"));

/** Error Handler */
app.use(errorHandler);

server.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log("Running Server en puerto", process.env.PORT);
});
