const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError" && error.message.includes("email")) {
    res.status(401).json({ error: "Email must be unique" });
  } else if (
    error.name === "ValidationError" &&
    error.message.includes("username")
  ) {
    res.status(401).json({ error: "Username must be unique" });
  }

  next();
};

export default {
  unknownEndpoint,
  errorHandler,
};
