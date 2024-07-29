import { ERROR_MESSAGES } from "@Constants/constants";
import { FOLLOW_UPS_COLLECTIONS } from "@Constants/enum.constants";
import LodashUtils from "@Libraries/lodash.lib";
import { LeagueService } from "@Services/league.service";
import { PostService } from "@Services/post.service";
import { TeamService } from "@Services/team.service";
import { ApiError } from "@Utils/ApiError";
import { extractUserIds } from "@Utils/GenericFunctions";
import { catchAsync } from "@Utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

class PostAuthClass {
  checkCreatePermission = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { profileId } = extractUserIds(req.user);

      const postPublisher: any = {
        profileId,
        onModel: FOLLOW_UPS_COLLECTIONS.PROFILES,
      };

      if (req.body?.teamId) {
        postPublisher["teamId"] = req.body?.teamId;
        postPublisher["onModel"] = FOLLOW_UPS_COLLECTIONS.TEAMS;
      } else if (req.body?.leagueId) {
        postPublisher["leagueId"] = req.body?.leagueId;
        postPublisher["onModel"] = FOLLOW_UPS_COLLECTIONS.LEAGUES;
      }

      switch (postPublisher.onModel) {
        case FOLLOW_UPS_COLLECTIONS.TEAMS: {
          const isTeamAdmin = await TeamService.isTeamAdmin({
            teamId: req.body.teamId,
            profileId,
          });

          if (!isTeamAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
          break;
        }

        case FOLLOW_UPS_COLLECTIONS.LEAGUES: {
          const isLeagueAdmin = await LeagueService.isLeagueAdmin({
            leagueId: req.body.leagueId,
            profileId,
          });

          if (!isLeagueAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
          break;
        }
      }

      next();
    });

  checkUpdatePermission = (data?: { key?: string }) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { key = "params.id" } = data || {};
      const { profileId } = extractUserIds(req.user);
      const postId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
      const post = await PostService.getOnePost(postId);

      if (!post) throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);

      if (post.teamId) {
        const teamId = new Types.ObjectId(LodashUtils.getNestedValue(req, "body.teamId"));
        if (!post.teamId.equals(teamId))
          throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

        const isTeamAdmin = await TeamService.isTeamAdmin({
          teamId,
          profileId,
        });

        if (!isTeamAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
      } else if (post.leagueId) {
        const leagueId = new Types.ObjectId(LodashUtils.getNestedValue(req, "body.leagueId"));
        if (!post.leagueId.equals(leagueId))
          throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

        const isTeamAdmin = await LeagueService.isLeagueAdmin({
          leagueId,
          profileId,
        });

        if (!isTeamAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
      } else {
        if (!post.profileId.equals(profileId!))
          throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
      }

      next();
    });
}

export const PostAuth = new PostAuthClass();
