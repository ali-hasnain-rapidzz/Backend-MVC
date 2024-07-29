import { APIError } from "@Types/types";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const mongoValidationError = (err: APIError, res: Response) => {
  res.status(httpStatus.FORBIDDEN).json({
    statusCode: httpStatus.FORBIDDEN,
    message: err.message,
  });
};

const sendErrorDev = (err: APIError, req: Request, res: Response) => {
  const { statusCode = 500, message, stack, name } = err;

  if (name === "ValidationError") {
    mongoValidationError(err, res);
  }

  console.error("ERROR! 💥", err);

  res.status(statusCode).json({
    error: err,
    statusCode,
    message,
    stack,
  });
};

const sendErrorProd = (err: APIError, req: Request, res: Response) => {
  // eslint-disable-next-line prefer-const
  let { statusCode, message, name } = err;

  if (name === "ValidationError") {
    mongoValidationError(err, res);
  }

  statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  message = message || (httpStatus["500_MESSAGE"] as string);

  const response = {
    statusCode,
    message,
  };

  res.status(statusCode).send(response);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, req, res);
  } else {
    sendErrorDev(err, req, res);
  }
};
