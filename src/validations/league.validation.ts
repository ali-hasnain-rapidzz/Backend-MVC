import {
  INVITATION_STATUS,
  LEAGUE_MEMBER_ROLE,
  LEAGUE_TEAM_VISIBILITY,
  PLAYER_SPORTS,
  PROFILE_DISCRIMINATORS,
} from "@Constants/enum.constants";
import { objectIdValidation } from "@Validations/helpers";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { linkDetailsValidation, sponsorsValidation } from "@Validations/team.validation";
import { z } from "zod";

// Define List Team League Members Validation schema
export const listLeagueMembersValidation = baseFilterValidation.extend({
  role: z.nativeEnum(LEAGUE_MEMBER_ROLE).optional(),
  profileType: z.nativeEnum(PROFILE_DISCRIMINATORS).array().optional(),
});
export type ListLeagueMembersValidationType = z.infer<typeof listLeagueMembersValidation>;

export const listLeagueMembersPaginationValidation = {
  params: z.object({
    leagueId: objectIdValidation,
  }),
  body: paginationValidation.body.extend({
    filter: listLeagueMembersValidation,
  }),
};

export type ListLeagueMembersPaginationValidationType = {
  body: z.infer<typeof listLeagueMembersPaginationValidation.body>;
  params: z.infer<typeof listLeagueMembersPaginationValidation.params>;
};

export const leagueColorsValidation = z.object({
  background: z.string().trim(),
  button: z.string().trim(),
  titleFont: z.string().trim(),
  bodyFont: z.string().trim(),
});

export const leagueMembersValidation = z.object({
  profileId: z.string().trim(),
  role: z.nativeEnum(LEAGUE_MEMBER_ROLE),
});

export const createLeagueValidation = {
  body: z.object({
    name: z.string(),
    avatar: z.string(),
    coverImage: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
    about: z.string().optional(),
    sport: z.nativeEnum(PLAYER_SPORTS),
    visibility: z.nativeEnum(LEAGUE_TEAM_VISIBILITY).optional(),
    colors: leagueColorsValidation.optional(),
    sponsors: z.array(sponsorsValidation).optional(),
    linkDetails: z.array(linkDetailsValidation).optional(),
    teams: z
      .array(z.string().trim())
      .refine(
        (teams) => {
          const uniqueLeagues = new Set(teams);
          return uniqueLeagues.size === teams.length;
        },
        {
          message: "Teams array must contain unique values",
        },
      )
      .optional(),
    members: z
      .array(leagueMembersValidation)
      .min(1)
      .refine(
        (members) => {
          const ids = new Set(members.map((member) => member.profileId));
          // If the size of the set is equal to the length of the array, all profileIds are unique
          return ids.size === members.length;
        },
        {
          message: "Each member must have a unique profile ID",
        },
      )
      .refine(
        (members) => {
          // Check for at least one admin role
          return members.some((member) => member.role === LEAGUE_MEMBER_ROLE.ADMIN);
        },
        {
          message: "At least one member must have the ADMIN role",
        },
      ),
  }),
};
export const updateLeagueValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
  body: z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
    coverImage: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
    about: z.string().optional(),
    sport: z.nativeEnum(PLAYER_SPORTS).optional(),
    visibility: z.nativeEnum(LEAGUE_TEAM_VISIBILITY).optional(),
    colors: leagueColorsValidation.optional(),
    sponsors: z.array(sponsorsValidation).optional(),
    linkDetails: z.array(linkDetailsValidation).optional(),
    teams: z
      .array(z.string().trim())
      .refine(
        (teams) => {
          const uniqueLeagues = new Set(teams);
          return uniqueLeagues.size === teams.length;
        },
        {
          message: "Teams array must contain unique values",
        },
      )
      .optional(),
    members: z
      .array(leagueMembersValidation)
      .min(1)
      .refine(
        (members) => {
          const ids = new Set(members.map((member) => member.profileId));
          // If the size of the set is equal to the length of the array, all profileIds are unique
          return ids.size === members.length;
        },
        {
          message: "Each member must have a unique profile ID",
        },
      )
      .refine(
        (members) => {
          // Check for at least one admin role
          return members.some((member) => member.role === LEAGUE_MEMBER_ROLE.ADMIN);
        },
        {
          message: "At least one member must have the ADMIN role",
        },
      )
      .optional(),
  }),
};

export type CreateLeagueValidationType = {
  body: z.infer<typeof createLeagueValidation.body>;
};
export type UpdateLeagueValidationType = {
  body: z.infer<typeof updateLeagueValidation.body>;
  params: z.infer<typeof updateLeagueValidation.params>;
};

export const getLeagueValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type GetLeagueValidationType = {
  params: z.infer<typeof getLeagueValidation.params>;
};
export const leagueInvitationValidation = {
  body: z.object({
    targetProfileId: z.string(),
    leagueId: z.string(),
    role: z.nativeEnum(LEAGUE_MEMBER_ROLE),
  }),
};

export type LeagueInvitationValidationType = {
  body: z.infer<typeof leagueInvitationValidation.body>;
};
export const invitationAcceptRejectValidation = {
  body: z.object({
    targetProfileId: z.string(),
    leagueId: z.string(),
    status: z.nativeEnum(INVITATION_STATUS),
  }),
};

export type InvitationAcceptRejectValidationType = {
  body: z.infer<typeof invitationAcceptRejectValidation.body>;
};

export const listLeagueFollowersPaginationValidation = {
  params: z.object({
    leagueId: objectIdValidation,
  }),
  body: paginationValidation.body,
};

export type ListLeagueFollowersPaginationValidationType = {
  body: z.infer<typeof listLeagueFollowersPaginationValidation.body>;
  params: z.infer<typeof listLeagueFollowersPaginationValidation.params>;
};
