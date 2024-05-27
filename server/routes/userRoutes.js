// routes/userRoutes.js

import express from "express";
import { getUser, getUserById } from '../controllers/userController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.get("/:id", authMiddleware, getUserById);

export default router;
