import { Request, Response } from "express";
import morgan from "morgan";

// Custom token to print the request body
morgan.token("req-body", (req: Request) => JSON.stringify(req.body));

// Custom token to manually color the status code
morgan.token("colored-status", (req: Request, res: Response) => {
  const status = res.statusCode;
  if (status >= 500) {
    return `\x1b[31m${status}\x1b[0m`; // Red
  } else if (status >= 400) {
    return `\x1b[33m${status}\x1b[0m`; // Yellow
  } else if (status >= 300) {
    return `\x1b[36m${status}\x1b[0m`; // Cyan
  } else if (status >= 200) {
    return `\x1b[32m${status}\x1b[0m`; // Green
  }
  return `${status}`; // Convert status to string if no color is applied
});

// Create a morgan logger with the custom format
export const morganMiddleware = morgan(":date[web] => :method :colored-status :url :req-body");
