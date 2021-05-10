import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { username, password, email } = req.body;

    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    } else if (password.length < 6) {
      return res
        .status(400)
        .send({ error: "Password must be at least 6 characters long" });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      password_hash,
      email,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  })
);

export default router;
