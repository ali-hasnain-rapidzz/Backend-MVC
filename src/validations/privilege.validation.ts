import { z } from "zod";

const generalSchema = z
  .object({
    only_connection_msg: z.boolean().optional(),
  })
  .strict();

const notificationsSchema = z
  .object({
    messages: z.boolean().optional(),
    posts: z
      .object({
        league: z.boolean().optional(),
        team: z.boolean().optional(),
      })
      .optional(),
    manages: z
      .object({
        account_update: z.boolean().optional(),
      })
      .optional(),
    accompolishment: z
      .object({
        create: z.boolean().optional(),
      })
      .optional(),
    emails: z.boolean().optional(),
  })
  .strict();

const visibilitySchema = z
  .object({
    achievements: z.boolean().optional(),
    connections: z.boolean().optional(),
    leagues: z.boolean().optional(),
    teams: z.boolean().optional(),
    followers: z.boolean().optional(),
    profile: z.boolean().optional(),
  })
  .strict();

const postPrivacySchema = z
  .object({
    only_connection_comment: z.boolean().optional(),
    only_connection_rcv: z.boolean().optional(),
    only_connection_save: z.boolean().optional(),
    only_connection_share: z.boolean().optional(),
  })
  .strict();

// Define the overall schema for new user privileges
export const updatePrivilegeValidation = {
  body: z.object({
    general: generalSchema.optional(),
    notifications: notificationsSchema.optional(),
    visibility: visibilitySchema.optional(),
    postPrivacy: postPrivacySchema.optional(),
  }),
};

export type UpdatePrivilegeValidationType = {
  body: z.infer<typeof updatePrivilegeValidation.body>;
};
