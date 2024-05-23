import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Data from bacend")
});

export default router;
