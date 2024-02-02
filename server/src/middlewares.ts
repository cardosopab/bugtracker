import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";
import SerializedUser from "./models/SerializedUser";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

// Middleware to check if the user is an admin
export const isAdminMiddleware = (
  req: Request & { user?: SerializedUser },
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).send("User is not Admin");
  }
};
