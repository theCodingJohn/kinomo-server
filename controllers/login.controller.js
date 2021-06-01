import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
      user !== null ? await bcrypt.compare(password, user.password_hash) : null;

    if (!user || !passwordCorrect) {
      return res.status(401).json({
        error: "Invalid password or username",
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);
    res.status(200).send({
      token,
      username: user.username,
      avatar: user?.avatar || null,
    });
  })
);

export default router;
