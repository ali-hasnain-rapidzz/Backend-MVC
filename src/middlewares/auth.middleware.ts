
import { ERROR_MESSAGES } from "@Constants/constants";

import { ApiError } from "@Utils/ApiError";
import { catchAsync } from "@Utils/catchAsync";
import httpStatus from "http-status";

interface optionsType {
  checkProfile?: boolean;
  allowSubUser?: boolean;
  allowMainUserId?: boolean;
}

// Middleware factory function
const authMiddleware = (options: optionsType = {}) =>
  catchAsync(async (req, res, next) => {
    const authHeader: string | undefined = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
    }

    const idToken = authHeader.substring(7);
    if (!idToken) {
      throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
    }

  

   

    next();
  });

export default authMiddleware;
