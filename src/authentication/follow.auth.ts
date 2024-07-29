import { FOLLOW_UPS_COLLECTIONS } from "@Constants/enum.constants";
import { LeagueService } from "@Services/league.service";
import { TeamService } from "@Services/team.service";
import { ApiError } from "@Utils/ApiError";
import { catchAsync } from "@Utils/catchAsync";
import { extractUserIds } from "@Utils/GenericFunctions";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

class FollowAuthClass {
  checkFollowPermission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { profileId } = extractUserIds(req.user);
    const { targetProfileId, profileType } = req.body;

    if (profileType === FOLLOW_UPS_COLLECTIONS.TEAMS) {
      const isTeamAdmin = await TeamService.isTeamAdmin({
        teamId: new Types.ObjectId(targetProfileId),
        profileId: profileId!,
      });

      if (isTeamAdmin) {
        throw new ApiError(httpStatus.FORBIDDEN, "Admin cannot follow their own team");
      }
    }

    if (profileType === FOLLOW_UPS_COLLECTIONS.LEAGUES) {
      const isLeagueAdmin = await LeagueService.isLeagueAdmin({
        leagueId: new Types.ObjectId(targetProfileId),
        profileId: profileId!,
      });

      if (isLeagueAdmin) {
        throw new ApiError(httpStatus.FORBIDDEN, "Admin cannot follow their own league");
      }
    }

    next();
  });
}

export const FollowAuth = new FollowAuthClass();
