import express from "express";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.get(
  "/:username",
  catchAsync(async (req, res) => {
    const username = req.params.username;
    const user = await User.find({ username }).populate("movies");

    res.status(200).json(user);
  })
);

export default router;
