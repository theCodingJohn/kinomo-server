import express from "express";
import auth from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", auth.signin);
router.post("/signup", auth.signup);

export default router;
