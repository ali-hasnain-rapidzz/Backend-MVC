import { ACCOMPLISHMENT_TYPE } from "@Constants/enum.constants";
import { objectIdValidation } from "@Validations/helpers";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

export const createAccomplishmentValidation = {
  body: z.object({
    teamId: objectIdValidation.optional(),
    leagueId: objectIdValidation.optional(),
    date: z.coerce.date(),
    accomplishmentType: z.nativeEnum(ACCOMPLISHMENT_TYPE),
    profileToAssign: objectIdValidation.optional(),
    image: z.string(),
    description: z.string(),
  }),
};

export type CreateAccomplishmentValidationType = {
  body: z.infer<typeof createAccomplishmentValidation.body>;
};

export const teamOrLeagueAccomplishmentsValidation = {
  body: paginationValidation.body.extend({
    teamId: objectIdValidation,
    leagueId: objectIdValidation,
    createdBy: objectIdValidation,
    page: z.number().default(1),
    limit: z.number().default(10),
  }),
};
export type TeamOrLeagueEventsValidationType = z.infer<
  typeof teamOrLeagueAccomplishmentsValidation.body
>;
export const listAccomplishmentsValidation = {
  body: paginationValidation.body.extend({
    profileId: objectIdValidation,
    filter: baseFilterValidation.extend({
      teamId: objectIdValidation,
      leagueId: objectIdValidation,
      createdBy: objectIdValidation,
      type: z.nativeEnum(ACCOMPLISHMENT_TYPE).optional(),
    }),
  }),
};

export type ListAccomplishmentsValidationType = {
  body: z.infer<typeof listAccomplishmentsValidation.body>;
};
export type ListAccomplishmentsValidationBodyType = z.infer<
  typeof listAccomplishmentsValidation.body
>;

export const createReinforcementCardValidation = {
  body: z.object({
    bgColor: z.string(),
    textColor: z.string(),
  }),
};

export type CreateReinforcementCardValidationType = {
  body: z.infer<typeof createReinforcementCardValidation.body>;
};

export const updateReinforcementCardValidation = {
  body: z.object({
    bgColor: z.string(),
    textColor: z.string(),
  }),
};

export type UpdateReinforcementCardValidation = {
  body: z.infer<typeof updateReinforcementCardValidation.body>;
};

export const createAwardValidation = {
  body: z.object({
    name: z.string(),
  }),
};

export type CreateAwardValidationType = {
  body: z.infer<typeof createAwardValidation.body>;
};

export const updateAwardValidation = {
  body: z.object({
    name: z.string(),
  }),
};

export type updateAwardValidationType = {
  body: z.infer<typeof updateAwardValidation.body>;
};

export const createMilestoneValidation = {
  body: z.object({
    name: z.string(),
  }),
};

export type CreateMilestoneValidationType = {
  body: z.infer<typeof createMilestoneValidation.body>;
};

export const getAccomplishmentValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};

export type GetAccomplishmentValidationType = {
  params: z.infer<typeof getAccomplishmentValidation.params>;
};

export const updateAccomplishmentValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
  body: z.object({
    date: z.coerce.date(),
    profileId: z.string().optional(),
    accomplishmentType: z.nativeEnum(ACCOMPLISHMENT_TYPE),
    image: z.string(),
    description: z.string(),
  }),
};

export type UpdateAccomplishmentValidationType = {
  params: z.infer<typeof updateAccomplishmentValidation.params>;
  body: z.infer<typeof updateAccomplishmentValidation.body>;
};

export const updateMilestoneValidation = {
  body: z.object({
    name: z.string(),
  }),
};

export type UpdateMilestoneValidationType = {
  body: z.infer<typeof updateMilestoneValidation.body>;
};

export const deleteAccomplishmentValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};

export type DeleteAccomplishmentValidationType = {
  params: z.infer<typeof deleteAccomplishmentValidation.params>;
};
