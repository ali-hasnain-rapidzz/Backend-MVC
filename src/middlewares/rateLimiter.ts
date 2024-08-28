import { ERROR_MESSAGES } from "@Constants/constants";
import { ApiError } from "@Utils/ApiError";
import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

// Define the rate limit configuration
const rateLimiter = rateLimit({
  windowMs: 0.75 * 60 * 1000, // 45 second
  max: 100,
  handler: (req, res, next) =>
    next(
      new ApiError(
        httpStatus.TOO_MANY_REQUESTS,
        ERROR_MESSAGES.TOO_MANY_REQUESTS,
      ),
    ),
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
