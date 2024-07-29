import { ERROR_MESSAGES } from "@Constants/constants";
import LodashUtils from "@Libraries/lodash.lib";
import { League } from "@Models/league.model";
import { RoleService } from "@Services/role.service";
import { LeagueMemberType, LeagueType } from "@Types/league.types";
import { RoleType } from "@Types/role.types";
import { ApiError } from "@Utils/ApiError";
import { extractUserIds } from "@Utils/GenericFunctions";
import { catchAsync } from "@Utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

class LeagueAuthClass {
  extractLeagueDetails = (data: { key?: string; role: string | string[] }) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { key = "body.leagueId" } = data;
      const validRoles = Array.isArray(data.role) ? data.role : [data.role];
      const { profileId } = extractUserIds(req.user);
      const leagueId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
      const league = await League.findById(leagueId).lean();

      if (!league) throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);

      const memberData = league.members.find((member) => member.profileId.equals(profileId));

      if (!memberData) throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MESSAGES.RECORD_NOT_FOUND);

      const profileRole = await RoleService.validateRolePermission({
        roleName: memberData.role,
        validRoles,
      });
      if (!profileRole) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

      req.league = {
        ...league,
        memberData: { ...memberData, role: profileRole },
      } as unknown as LeagueType & {
        memberData: LeagueMemberType & { role: RoleType };
      };
      next();
    });
}

export const LeagueAuth = new LeagueAuthClass();
