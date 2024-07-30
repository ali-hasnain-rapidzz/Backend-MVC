// import { ERROR_MESSAGES } from "@Constants/constants";
// import LodashUtils from "@Libraries/lodash.lib";

// import { ApiError } from "@Utils/ApiError";
// import { extractUserIds } from "@Utils/GenericFunctions";
// import { catchAsync } from "@Utils/catchAsync";
// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";
// import { Types } from "mongoose";

// class AccomplishmentAuthClass {
 
//   checkUpdatePermission = (data?: { key?: string }) =>
//     catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//       // const { key = "params.id" } = data || {};
//       // const accomplishmentId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
//       // const accomplishment = await AccomplishmentClass.getOneAccomplishment(accomplishmentId);

//       // if (!accomplishment)
//       //   throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);

//       // next();
//     });

// }

// export const AccomplishmentAuth = new AccomplishmentAuthClass();
