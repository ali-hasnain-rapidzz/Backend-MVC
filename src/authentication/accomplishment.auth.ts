import { ERROR_MESSAGES } from "@Constants/constants";
import LodashUtils from "@Libraries/lodash.lib";
import { AccomplishmentClass } from "@Services/accomplishment.service";
import { LeagueService } from "@Services/league.service";
import { TeamService } from "@Services/team.service";
import { ApiError } from "@Utils/ApiError";
import { extractUserIds } from "@Utils/GenericFunctions";
import { catchAsync } from "@Utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

class AccomplishmentAuthClass {
  checkCreatePermission = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { profileId } = extractUserIds(req.user);
      const { teamId = null, leagueId = null } = req.body;

      if (teamId) {
        const isTeamAdmin = await TeamService.isTeamAdmin({
          teamId,
          profileId,
        });

        if (!isTeamAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
      } else if (leagueId) {
        const isLeagueAdmin = await LeagueService.isLeagueAdmin({
          leagueId,
          profileId,
        });

        if (!isLeagueAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
      }

      next();
    });

  checkUpdatePermission = (data?: { key?: string }) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { key = "params.id" } = data || {};
      const accomplishmentId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
      const accomplishment = await AccomplishmentClass.getOneAccomplishment(accomplishmentId);

      if (!accomplishment)
        throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);

      next();
    });

  checkDeletePermission = (data?: { key?: string }) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { key = "params.id" } = data || {};
      const accomplishmentId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
      const accomplishment = await AccomplishmentClass.getOneAccomplishment(accomplishmentId);

      if (!accomplishment)
        throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);

      next();
    });
}

export const AccomplishmentAuth = new AccomplishmentAuthClass();
