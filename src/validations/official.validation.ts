import { PLAYER_SPORTS } from "@Constants/enum.constants";
import { objectIdValidation } from "@Validations/helpers";
import { createProfileValidation } from "@Validations/profile.validation";
import { z } from "zod";

const officialExperienceValidation = z
  .object({
    sport: z.nativeEnum(PLAYER_SPORTS),
    officiatedFrom: z.coerce.date().max(new Date(), "officiatedFrom cannot be in the future"),
    officiatedTo: z.coerce.date().optional(),
    league: objectIdValidation.optional(),
    city: z.string(),
    region: z.string(),
    country: z.string(),
  })
  .refine((data) => (data.officiatedTo ? data.officiatedTo >= data.officiatedFrom : true), {
    message: "Illogical entry: officiatedTo date should be on or after the officiatedFrom date.",
    path: ["officiatedTo"],
  });

export const createOfficialValidation = {
  body: createProfileValidation.body.extend({
    isPrimary: z.boolean().optional(),
    experiences: z.array(officialExperienceValidation).optional(),
  }),
};

export type CreateOfficialValidationType = {
  body: z.infer<typeof createOfficialValidation.body>;
};
export const updateOfficialValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
  body: createProfileValidation.body.partial().extend({
    isPrimary: z.boolean().optional(),
    experiences: z.array(officialExperienceValidation).optional(),
  }),
};

export type UpdateOfficialValidationType = {
  params: z.infer<typeof updateOfficialValidation.params>;
  body: z.infer<typeof updateOfficialValidation.body>;
};

export const getOfficialValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type GetOfficialValidationType = {
  params: z.infer<typeof getOfficialValidation.params>;
};
export const deleteOfficialValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type DeleteOfficialValidationType = {
  params: z.infer<typeof deleteOfficialValidation.params>;
};
