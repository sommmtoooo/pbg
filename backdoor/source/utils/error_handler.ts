import { Request, Response, NextFunction } from "express";
import config from "config";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  const { message } = error;
  res.json({
    message: message ? message : "Error Occurred",
    stack: config.get<string>("env") === "production" ? null : error.stack,
  });
}
