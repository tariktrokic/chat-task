import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const users = {};

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("register", (userID) => {
      users[userID] = socket.id;
    });

    socket.on("send_message", ({ senderID, receiverID, message }) => {
      const receiverSocketID = users[receiverID];
      if (receiverSocketID) {
        io.to(receiverSocketID).emit("receive_message", {
          senderID,
          message,
        });
      }
    });

    socket.on("disconnect", () => {
      for (let userID in users) {
        if (users[userID] === socket.id) {
          delete users[userID];
          break;
        }
      }
    });
  });

  console.log("Setting up socket");
  res.end();
}
