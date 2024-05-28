import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createConversation,
  getConversations,
} from "../controllers/userConversationController.js";

const router = express.Router();

router.post("/", authMiddleware, createConversation);
router.get("/", authMiddleware, getConversations);

export default router;
