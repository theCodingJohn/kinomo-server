import express from "express";
import passport from "passport";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users);
  })
);

router.get(
  "/:username",
  catchAsync(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username }).populate("movies");

    res.status(200).json(user);
  })
);

router.patch(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  catchAsync(async (req, res) => {
    console.log("hello");
    const username = req.params.username;
    const { favorite_movies, name, bio, avatar } = req.body;

    const user = {
      favorite_movies,
      name,
      bio,
      avatar,
    };

    const updatedUser = await User.findOneAndUpdate({ username }, user, {
      new: true,
    });

    return res.json(updatedUser);
  })
);

export default router;
