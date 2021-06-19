import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";
import "./utils/passport.js";

import registerRouter from "./controllers/register.controller.js";
import loginRouter from "./controllers/login.controller.js";
import movieRouter from "./controllers/movie.controller.js";
import userRouter from "./controllers/user.controller.js";

const app = express();

const mongoUri = config.MONGODB_URI;

logger.info("Connecting to DB...");
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((error) => {
    logger.info("Connection Error", error);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", userRouter);

// app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.use(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  movieRouter
);

// app.use(middleware.unknownEndpoint);

export default app;
