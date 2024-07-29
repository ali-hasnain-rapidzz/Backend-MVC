import { baseFilterValidation } from "@Validations/pagination.validation";
import { z } from "zod";

export const createConnectionValidation = {
  body: z.object({
    targetProfileId: z.string().trim().min(6),
  }),
};

export type CreateConnectionValidationType = {
  body: z.infer<typeof createConnectionValidation.body>;
};
export const acceptConnectionValidation = {
  body: z.object({
    requesterId: z.string().trim().min(6),
  }),
};

export type AcceptConnectionValidationType = {
  body: z.infer<typeof acceptConnectionValidation.body>;
};
export const removeConnectionValidation = {
  body: z.object({
    requesterId: z.string().trim().min(6),
  }),
};

export type RemoveConnectionValidationType = {
  body: z.infer<typeof removeConnectionValidation.body>;
};
export const filterProfileConnectionValidation = baseFilterValidation
  .extend({
    invites: z.string().optional(),
  })
  .optional();
export type FilterProfileConnectionValidationType = z.infer<
  typeof filterProfileConnectionValidation
>;
