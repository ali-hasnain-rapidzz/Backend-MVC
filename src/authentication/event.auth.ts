import { ERROR_MESSAGES } from "@Constants/constants";
import { FOLLOW_UPS_COLLECTIONS } from "@Constants/enum.constants";
import LodashUtils from "@Libraries/lodash.lib";
import { EventService } from "@Services/event.service";
import { LeagueService } from "@Services/league.service";
import { TeamService } from "@Services/team.service";
import { ApiError } from "@Utils/ApiError";
import { extractUserIds } from "@Utils/GenericFunctions";
import { catchAsync } from "@Utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

class EventAuthClass {
  checkCreatePermission = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { profileId } = extractUserIds(req.user);

      const eventPublisher: any = {
        profileId: profileId!,
        onModel: FOLLOW_UPS_COLLECTIONS.PROFILES,
      };

      if (req.body?.teamId) {
        eventPublisher["teamId"] = req.body?.teamId;
        eventPublisher["onModel"] = FOLLOW_UPS_COLLECTIONS.TEAMS;
      } else if (req.body?.leagueId) {
        eventPublisher["leagueId"] = req.body?.leagueId;
        eventPublisher["onModel"] = FOLLOW_UPS_COLLECTIONS.LEAGUES;
      }

      switch (eventPublisher.onModel) {
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
      const eventId = new Types.ObjectId(LodashUtils.getNestedValue(req, key));
      const event = await EventService.getPopulatedEvent(eventId);

      if (!event) throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);

      const publisher = event.publisher;
      switch (publisher.onModel) {
        case FOLLOW_UPS_COLLECTIONS.PROFILES:
          if (!publisher.publishedBy.equals(profileId!))
            throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
          break;

        case FOLLOW_UPS_COLLECTIONS.TEAMS: {
          if (!req.body?.teamId || !publisher.publishedBy.equals(req.body.teamId))
            throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

          const isTeamAdmin = await TeamService.isTeamAdmin({
            teamId: req.body.teamId,
            profileId: req.user.profileId!,
          });

          if (!isTeamAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
          break;
        }

        case FOLLOW_UPS_COLLECTIONS.LEAGUES: {
          if (!req.body?.leagueId || !publisher.publishedBy.equals(req.body.leagueId))
            throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

          const isLeagueAdmin = await LeagueService.isLeagueAdmin({
            leagueId: req.body.leagueId,
            profileId: req.user.profileId!,
          });

          if (!isLeagueAdmin) throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
          break;
        }
      }

      next();
    });
}

export const EventAuth = new EventAuthClass();
