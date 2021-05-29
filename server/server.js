import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    // client runs on port 3000
    // server on 3030
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("newMessage", (message) => {
    const date = Date.now();

    if (!message.content.trim()) return;
    if (!message.username.trim()) return;

    io.sockets.emit("newMessage", { ...message, date });
  });

  socket.on("joined", (username) => {
    if (!username) return;
    const date = Date.now();

    socket.broadcast.emit("newMessage", { content: `User ${username} has joined the chat`, username: "System", date });
  });
});

httpServer.listen(3030, () => console.log("Server running on port 3030"));
