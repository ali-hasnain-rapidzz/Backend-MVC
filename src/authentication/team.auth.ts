import { ERROR_MESSAGES } from "@Constants/constants";
import LodashUtils from "@Libraries/lodash.lib";
import { Team } from "@Models/team.model";
import { RoleService } from "@Services/role.service";
import { RoleType } from "@Types/role.types";
import { TeamMemberType, TeamType } from "@Types/team.types";
import { ApiError } from "@Utils/ApiError";
import { extractUserIds } from "@Utils/GenericFunctions";
import { catchAsync } from "@Utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

class TeamAuthClass {
  extractTeamDetails = (data: { key?: string; role: string | string[] }) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { key = "body.teamId" } = data;
      const validRoles = Array.isArray(data.role) ? data.role : [data.role];
      const { profileId } = extractUserIds(req.user);
      const teamId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
      const team = await Team.findById(teamId).lean();

      if (!team) throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);

      const memberData = team.members.find((member) => member.profileId.equals(profileId));

      if (!memberData) throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MESSAGES.RECORD_NOT_FOUND);

      const profileRole = await RoleService.validateRolePermission({
        roleName: memberData.role,
        validRoles,
      });
      if (!profileRole) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

      req.team = {
        ...team,
        memberData: { ...memberData, role: profileRole },
      } as unknown as TeamType & {
        memberData: TeamMemberType & { role: RoleType };
      };
      next();
    });
}

export const TeamAuth = new TeamAuthClass();
