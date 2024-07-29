import { Error } from "mongoose";
import { ZodObject } from "zod";

export interface APIError extends Error {
  statusCode: number;
  isOperational?: boolean | undefined;
}

export interface ApplyValidatorsType {
  keyToCheck: string;
  options: {
    check: string;
    validators: { body?: ZodObject<any>; params?: ZodObject<any> }[];
  }[];
}
