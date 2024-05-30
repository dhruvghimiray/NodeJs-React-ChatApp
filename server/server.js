import express from "express";
import cors from "cors";

import http from "http";
import { Server } from "socket.io";
import { configDotenv } from "dotenv";
configDotenv();

import dbConnect from "./config/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import getUsers from "./routes/usersRoute.js";
import userLoginRouter from "./routes/loginUser.js"; // Adjust the path as necessary
import userRegesterRoute from "./routes/regesterUser.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/messages.js";
import mongoose from "mongoose";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://nodejs-react-chatapp-1.onrender.com"], // Allow both local and deployed client URLs
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("route qworking");
});

app.use("/user", userRoutes);
app.use("/users", getUsers);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/login", userLoginRouter);
app.use("/register", userRegesterRoute);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Add your authentication logic here
  next();
});

let onlineUsers = {}; // Key: userId, Value: socketId

io.on("connection", (socket) => {
  // console.log("A user connected");

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("sendMessage", (message) => {
    // Save the message to the database, etc.
    // Broadcast the message to the conversation room
    io.to(message.conversationId).emit("message", message);
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });


  socket.on("userConnected", (userId) => {
    onlineUsers[userId] = socket.id;

    // Send the current online users to the newly connected client
    socket.emit("currentOnlineUsers", onlineUsers);

    // Broadcast the new user's online status to all other clients
    socket.broadcast.emit("updateUserStatus", { userId, status: "online" });
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    if (userId) {
      delete onlineUsers[userId];
      io.emit("updateUserStatus", { userId, status: "offline" });
    }
    console.log("Client disconnected");
  });
});

