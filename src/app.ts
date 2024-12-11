import express from "express";
import httpStatus from "http-status";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import ApiError from "./utils/ApiError.js";
import v1Router from "./routes/v1.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/", (_req, res) => {
  res.send("Hello World");
});
app.use("/api/v1", v1Router);

app.use((req) => {
  throw new ApiError(
    httpStatus.NOT_FOUND,
    `${req.method} ${req.originalUrl} not found`,
  );
});
app.use(globalErrorHandler);

export default app;
