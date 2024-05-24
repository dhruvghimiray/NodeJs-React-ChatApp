import express from "express";
import userRegestrationController from "../controllers/userRegestrationController.js";

const router = express.Router();

router.post("/", userRegestrationController);

export default router;
