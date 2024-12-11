import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.log(`[APP ERROR]`, { error });

  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Internal server error";
  let errors: unknown[] | undefined;

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
  } else if (error instanceof PrismaClientKnownRequestError) {
    message = error.name;
  } else if (error instanceof ZodError) {
    message = "Validation error";
    errors = error.errors;
  } else if (error instanceof Error) {
    message = error?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: env.app.nodeEnv === "development" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
