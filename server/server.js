import express from "express";
import cors from "cors";
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
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
