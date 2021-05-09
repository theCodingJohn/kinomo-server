import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./utils/logger.js";
import config from "./utils/config.js";

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

app.use(cors());

export default app;
