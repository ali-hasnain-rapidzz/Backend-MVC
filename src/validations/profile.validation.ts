import {
  EVENT_FORMAT,
  EVENT_REPITITION,
  EVENT_STATUS,
  INVITATIONS_LIST_TYPE,
  INVITATION_STATUS,
  NOTIFICATION_DEVICE_PLATFORMS,
  PLAYER_SPORTS,
  POST_DISCRIMINATORS,
  POST_STATUS,
  PROFILE_DISCRIMINATORS,
  PROFILE_INVITATIONS,
  SOCIAL_PLATFORMS,
} from "@Constants/enum.constants";
import { linkValidation, objectIdValidation } from "@Validations/helpers";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

export const userSocialsValidation = z.object({
  platform: z.nativeEnum(SOCIAL_PLATFORMS),
  profileUrl: linkValidation,
});

export const notificationDeviceValidation = z.object({
  uuid: z.string().trim(),
  platform: z.nativeEnum(NOTIFICATION_DEVICE_PLATFORMS),
  fcmToken: z.string().trim(),
});

export const createProfileValidation = {
  body: z.object({
    isPrimary: z.boolean().optional(),
    firstName: z.string(),
    lastName: z.string(),
    avatar: z.string(),
    coverImage: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
    school: z.string(),
    grade: z.string(),
    about: z.string().optional(),
    socialAccounts: z.array(userSocialsValidation).optional(),
    notificationDevices: z.array(notificationDeviceValidation),
  }),
};

export type CreateProfileValidationType = {
  body: z.infer<typeof createProfileValidation.body>;
};

export const listProfileInvitesValidation = {
  body: z.object({
    type: z.nativeEnum(INVITATIONS_LIST_TYPE),
  }),
};
export type listProfileInvitesType = {
  body: z.infer<typeof listProfileInvitesValidation.body>;
};

export const listProfilePostsValidation = {
  params: z.object({
    profileId: objectIdValidation,
  }),
  body: paginationValidation.body.extend({
    filter: baseFilterValidation.extend({
      status: z.nativeEnum(POST_STATUS).optional(),
      type: z.nativeEnum(POST_DISCRIMINATORS).optional(),
    }),
  }),
};

export type listProfilePostsValidationType = {
  params: z.infer<typeof listProfilePostsValidation.params>;
  body: z.infer<typeof listProfilePostsValidation.body>;
};
export type listProfilePostsValidationBodyType = z.infer<typeof listProfilePostsValidation.body>;
export const listProfileLeaguesValidation = {
  params: z.object({
    profileId: objectIdValidation,
  }),
  body: paginationValidation.body,
};

export type listProfileLeaguesValidationType = {
  params: z.infer<typeof listProfileLeaguesValidation.params>;
  body: z.infer<typeof listProfileLeaguesValidation.body>;
};
export type listProfileLeaguesValidationBodyType = z.infer<
  typeof listProfileLeaguesValidation.body
>;
export const listProfileTeamsValidation = {
  params: z.object({
    profileId: objectIdValidation,
  }),
  body: paginationValidation.body,
};

export type listProfileTeamsValidationType = {
  params: z.infer<typeof listProfileTeamsValidation.params>;
  body: z.infer<typeof listProfileTeamsValidation.body>;
};
export type listProfileTeamsValidationBodyType = z.infer<typeof listProfileTeamsValidation.body>;

export const profileInvitationAcceptRejectValidation = {
  body: z.object({
    targetId: objectIdValidation,
    targetModel: z.nativeEnum(PROFILE_INVITATIONS),
    status: z.nativeEnum(INVITATION_STATUS),
  }),
};

export type ProfileInvitationAcceptRejectValidationType = {
  body: z.infer<typeof profileInvitationAcceptRejectValidation.body>;
};

export const listProfileEventsValidation = {
  params: z.object({
    profileId: objectIdValidation,
  }),
  body: paginationValidation.body.extend({
    filter: baseFilterValidation.extend({
      teamId: objectIdValidation,
      leagueId: objectIdValidation,
      status: z.nativeEnum(EVENT_STATUS).optional(),
      format: z.nativeEnum(EVENT_FORMAT).optional(),
      repitition: z.nativeEnum(EVENT_REPITITION).optional(),
      sport: z.nativeEnum(PLAYER_SPORTS).optional(),
    }),
  }),
};

export type listProfileEventsValidationType = {
  params: z.infer<typeof listProfileEventsValidation.params>;
  body: z.infer<typeof listProfileEventsValidation.body>;
};
export type listProfileEventsValidationBodyType = z.infer<typeof listProfileEventsValidation.body>;

// export const listAllProfilesValidation = {
//   body: paginationValidation.body.extend({
//     filter: baseFilterValidation.extend({
//       role: z.nativeEnum(PROFILE_DISCRIMINATORS).optional(),
//     }),
//   }),
// };

// export type ListAllProfilesValidationType = {
//   body: z.infer<typeof listAllProfilesValidation.body>;
// };

export const listAllProfilesValidation = baseFilterValidation.extend({
  role: z.nativeEnum(PROFILE_DISCRIMINATORS).optional(),
});
export type ListAllProfilesValidationType = z.infer<typeof listAllProfilesValidation>;

export const listAllProfilesPaginationValidation = {
  body: paginationValidation.body.extend({
    filter: listAllProfilesValidation,
  }),
};

export type ListAllProfilesPaginationValidationType = {
  body: z.infer<typeof listAllProfilesPaginationValidation.body>;
};

export const listExploreProfilesValidation = baseFilterValidation.extend({
  profileType: z.nativeEnum(PROFILE_DISCRIMINATORS).array().optional(),
  id: objectIdValidation,
});
export type ListExploreProfilesValidationType = z.infer<typeof listExploreProfilesValidation>;

export const deleteProfileTeamValidation = {
  params: z.object({
    teamId: objectIdValidation,
  }),
};

export type DeleteProfileTeamValidationType = {
  params: z.infer<typeof deleteProfileTeamValidation.params>;
};
export const deleteProfileLeagueValidation = {
  params: z.object({
    leagueId: objectIdValidation,
  }),
};

export type DeleteProfileLeagueValidationType = {
  params: z.infer<typeof deleteProfileLeagueValidation.params>;
};
