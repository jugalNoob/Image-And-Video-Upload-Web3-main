const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 9000;

const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000", // Replace with the URL of your React app
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);
// Add your routes here if needed
// app.use(require("./routes/router"));

http.listen(port, () => {
  console.log(`Server start at port no : ${port}`);
});


// "proxy": "http://localhost:9000",