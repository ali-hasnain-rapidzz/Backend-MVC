import {
  INVITATION_STATUS,
  LEAGUE_TEAM_VISIBILITY,
  PLAYER_SPORTS,
  PROFILE_DISCRIMINATORS,
  TEAM_MEMBER_ROLE,
} from "@Constants/enum.constants";
import {
  allowEmptyStringValidation,
  linkValidation,
  objectIdValidation,
} from "@Validations/helpers";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

// Define List Team League Members Validation schema
export const listTeamMembersValidation = baseFilterValidation.extend({
  role: z.nativeEnum(TEAM_MEMBER_ROLE).optional(),
  profileType: z.nativeEnum(PROFILE_DISCRIMINATORS).array().optional(),
});
export type ListTeamMembersValidationType = z.infer<typeof listTeamMembersValidation>;

export const listTeamMembersPaginationValidation = {
  params: z.object({
    teamId: objectIdValidation,
  }),
  body: paginationValidation.body.extend({
    filter: listTeamMembersValidation,
  }),
};

export type ListTeamMembersPaginationValidationType = {
  body: z.infer<typeof listTeamMembersPaginationValidation.body>;
  params: z.infer<typeof listTeamMembersPaginationValidation.params>;
};
export const listTeamFollowersPaginationValidation = {
  params: z.object({
    teamId: objectIdValidation,
  }),
  body: paginationValidation.body,
};

export type ListTeamFollowersPaginationValidationType = {
  body: z.infer<typeof listTeamFollowersPaginationValidation.body>;
  params: z.infer<typeof listTeamFollowersPaginationValidation.params>;
};

export const listTeamLeagueValidation = {
  params: z.object({
    teamId: objectIdValidation,
    leagueId: objectIdValidation,
  }),
  body: paginationValidation.body,
};
export type ListTeamLeagueValidationType = {
  params: z.infer<typeof listTeamLeagueValidation.params>;
  body: z.infer<typeof listTeamLeagueValidation.body>;
};
export const getTeamValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type GetTeamValidationType = {
  params: z.infer<typeof getTeamValidation.params>;
};
export const teamMembersValidation = z.object({
  profileId: z.string().trim(),
  role: z.nativeEnum(TEAM_MEMBER_ROLE),
});

export const sponsorsValidation = z.object({
  avatar: z.string().optional(),
  post: z.string().optional(),
  name: z.string().trim(),
  about: z.string().trim().optional(),
});

export const linkDetailsValidation = z.object({
  link: linkValidation,
  name: z.string().trim(),
  about: allowEmptyStringValidation,
});

export const teamColorsValidation = z.object({
  background: z.string().trim(),
  button: z.string().trim(),
  titleFont: z.string().trim(),
  bodyFont: z.string().trim(),
});

export const createTeamValidation = {
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
    colors: teamColorsValidation.optional(),
    sponsors: z.array(sponsorsValidation).optional(),
    linkDetails: z.array(linkDetailsValidation).optional(),
    leagues: z
      .array(z.string().trim())
      .refine(
        (leagues) => {
          const uniqueLeagues = new Set(leagues);
          return uniqueLeagues.size === leagues.length;
        },
        {
          message: "Leagues array must contain unique values",
        },
      )
      .optional(),
    members: z
      .array(teamMembersValidation)
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
          return members.some((member) => member.role === TEAM_MEMBER_ROLE.ADMIN);
        },
        {
          message: "At least one member must have the ADMIN role",
        },
      ),
  }),
};

export type CreateTeamValidationType = {
  body: z.infer<typeof createTeamValidation.body>;
};
export const updateTeamValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
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
    colors: teamColorsValidation.optional(),
    sponsors: z.array(sponsorsValidation).optional(),
    linkDetails: z.array(linkDetailsValidation).optional(),
    leagues: z
      .array(z.string().trim())
      .refine(
        (leagues) => {
          const uniqueLeagues = new Set(leagues);
          return uniqueLeagues.size === leagues.length;
        },
        {
          message: "Leagues array must contain unique values",
        },
      )
      .optional(),
    members: z
      .array(teamMembersValidation)
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
      ),
  }),
};
export const teamInvitationValidation = {
  body: z.object({
    targetProfileId: z.string(),
    teamId: z.string(),
    role: z.nativeEnum(TEAM_MEMBER_ROLE),
  }),
};

export const teaminvitationAcceptRejectValidation = {
  body: z.object({
    targetProfileId: z.string(),
    teamId: z.string(),
    status: z.nativeEnum(INVITATION_STATUS),
  }),
};

export type TeamInvitationAcceptRejectValidationType = {
  body: z.infer<typeof teaminvitationAcceptRejectValidation.body>;
};

export type TeamInvitationValidationType = {
  body: z.infer<typeof teamInvitationValidation.body>;
};
export type UpdateTeamValidationType = {
  body: z.infer<typeof updateTeamValidation.body>;
  params: z.infer<typeof updateTeamValidation.params>;
};
