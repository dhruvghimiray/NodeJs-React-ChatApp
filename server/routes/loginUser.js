import express from "express";
import userLoginController from "../controllers/userLoginController.js";

const router = express.Router();

router.post("/", userLoginController);

export default router;
