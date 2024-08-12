import { ERROR_MESSAGES } from "@Constants/constants";
import { ApiError } from "@Utils/ApiError";
import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

// Define the rate limit configuration
const rateLimiter = rateLimit({
  windowMs: 0.75 * 60 * 1000, // 45 second
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  handler: (req, res, next) =>
    next(new ApiError(httpStatus.TOO_MANY_REQUESTS, ERROR_MESSAGES.TOO_MANY_REQUESTS)),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default rateLimiter;
