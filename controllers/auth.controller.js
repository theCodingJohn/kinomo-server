import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

const signin = catchAsync(async (req, res) => {
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
});

const signup = catchAsync(async (req, res) => {
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
});

export default {
  signin,
  signup,
};
