import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

// Route to send a message
router.post("/", authMiddleware, sendMessage);
router.get("/:conversationId", authMiddleware, getMessages);

export default router;
