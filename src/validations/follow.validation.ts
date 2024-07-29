import {
  FOLLOW_STATUS_REQ,
  FOLLOW_UPS_COLLECTIONS,
  INVITE_TYPE,
  PROFILE_ROLES,
} from "@Constants/enum.constants";
import { objectIdValidation } from "@Validations/helpers";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

export const followValidation = {
  body: z.object({
    targetProfileId: objectIdValidation,
    profileType: z.nativeEnum(PROFILE_ROLES),
  }),
};

export type FollowValidationType = {
  body: z.infer<typeof followValidation.body>;
};

export const acceptRejectFollowReqValidation = {
  body: z.object({
    accpeterId: objectIdValidation,
    accpeterType: z.nativeEnum(PROFILE_ROLES),
    targetProfileId: objectIdValidation,
    type: z.nativeEnum(FOLLOW_STATUS_REQ),
  }),
};

export type AcceptRejectFollowReqValidationType = {
  body: z.infer<typeof acceptRejectFollowReqValidation.body>;
};

export const listfollowRoleValidation = {
  body: paginationValidation.body.extend({
    role: z.nativeEnum(FOLLOW_UPS_COLLECTIONS).optional(),
    filter: baseFilterValidation.extend({
      invites: z.nativeEnum(INVITE_TYPE).optional(),
    }),
  }),
};

export type ListFollowRoleValidationType = {
  body: z.infer<typeof listfollowRoleValidation.body>;
};
export type ListfollowRoleValidationBodyType = z.infer<typeof listfollowRoleValidation.body>;
