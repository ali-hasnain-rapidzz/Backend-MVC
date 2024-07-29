import { COACH_POSITIONS, PLAYER_SPORTS } from "@Constants/enum.constants";
import { objectIdValidation } from "@Validations/helpers";
import { createProfileValidation } from "@Validations/profile.validation";
import { z } from "zod";

const coachExperienceValidation = z
  .object({
    sport: z.nativeEnum(PLAYER_SPORTS),
    position: z.nativeEnum(COACH_POSITIONS),
    officiatedFrom: z.coerce.date().max(new Date(), "officiatedFrom cannot be in the future"),
    officiatedTo: z.coerce.date().optional(),
    school: z.string().optional(),
    team: objectIdValidation.optional(),
    region: z.string(),
    country: z.string(),
    city: z.string(),
  })
  .refine((data) => (data.officiatedTo ? data.officiatedTo >= data.officiatedFrom : true), {
    message: "Illogical entry: officiatedTo date should be on or after the officiatedFrom date.",
    path: ["officiatedTo"],
  });

export const createCoachValidation = {
  body: createProfileValidation.body.extend({
    isPrimary: z.boolean().optional(),
    experiences: z.array(coachExperienceValidation).optional(),
  }),
};

export type CreateCoachValidationType = {
  body: z.infer<typeof createCoachValidation.body>;
};

export const updateCoachValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
  body: createProfileValidation.body.partial().extend({
    isPrimary: z.boolean().optional(),
    experiences: z.array(coachExperienceValidation).optional(),
  }),
};

export type UpdateCoachValidationType = {
  body: z.infer<typeof updateCoachValidation.body>;
  params: z.infer<typeof updateCoachValidation.params>;
};

export const getCoachValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type GetCoachValidationType = {
  params: z.infer<typeof getCoachValidation.params>;
};
export const deleteCoachValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type DeleteCoachValidationType = {
  params: z.infer<typeof deleteCoachValidation.params>;
};
