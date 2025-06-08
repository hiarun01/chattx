import {Server as SocketIOServer} from "socket.io";
import Message from "./models/messages.model.js";

const setupSocket = (server) => {
  // Initialize Socket.IO server
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  // Map to store user IDs and their corresponding socket IDs
  const userSocketMap = new Map();

  // This function is called when a user disconnects
  const disconnect = (socket) => {
    console.log(`client disconnected : ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };
  //  This function is called when a message is sent
  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);

    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message).catch((error) => {
      console.error("Error creating message:", error);
      return null;
    });

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image")
      .populate("recipient", "id email firstName lastName image");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }

    console.log("Message sent:", messageData);
  };

  // connection
  io.on("connection", (socket) => {
    console.log(`client connected : ${socket.id}`);
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ID ${userId} connected with socket ID ${socket.id}`);
    } else {
      console.log("user id not provided during connection");
    }

    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => {
      disconnect(socket);
    });
  });
};

export default setupSocket;
