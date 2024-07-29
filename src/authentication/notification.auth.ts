import { ERROR_MESSAGES } from "@Constants/constants";
import LodashUtils from "@Libraries/lodash.lib";
import { NotificationService } from "@Services/notification.service";
import { ApiError } from "@Utils/ApiError";
import { extractUserIds } from "@Utils/GenericFunctions";
import { catchAsync } from "@Utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

class NotificationAuthClass {
  checkDeletePermission = (data?: { key?: string }) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { key = "params.id" } = data || {};
      const { profileId } = extractUserIds(req.user);
      const notificationId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
      const notification = await NotificationService.getOneNotification(notificationId);
      if (
        !notification?.profileId ||
        !(notification?.profileId.toString() === profileId.toString())
      )
        throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

      next();
    });
}

export const NotificationAuth = new NotificationAuthClass();
