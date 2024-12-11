import express from "express";
import httpStatus from "http-status";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    errors: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
