// routes/userRoutes.js

import express from "express";
import { getUser, getUserById, addFriend, getFriends } from '../controllers/userController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.get("/:id", authMiddleware, getUserById);
router.post("/addFriend/:id", authMiddleware, addFriend);
router.get("/:id/friends", authMiddleware, getFriends);



export default router;
