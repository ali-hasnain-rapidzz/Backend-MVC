import { PROFILE_DISCRIMINATORS } from "@Constants/enum.constants";
import { objectIdValidation } from "@Validations/helpers";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

// Define list User Profiles Validation schema
export const listUserProfilesValidation = baseFilterValidation
  .extend({
    profileType: z.nativeEnum(PROFILE_DISCRIMINATORS).array().optional(),
  })
  .optional();
export type ListUserProfilesValidationType = z.infer<typeof listUserProfilesValidation>;

export const listUserProfilesPaginationValidation = {
  body: paginationValidation.body.extend({
    filter: listUserProfilesValidation,
  }),
};

export type ListUserProfilesPaginationValidationType = {
  body: z.infer<typeof listUserProfilesPaginationValidation.body>;
};

export const createUserValidation = {
  body: z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().trim().email().toLowerCase(),
    phone: z.string(),
    password: z.string(),
    dob: z.coerce.date().max(new Date(), "Date of birth cannot be in the future"),
  }),
};

export const validateUserValidation = {
  body: z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().trim().email().toLowerCase(),
    phone: z.string().optional(),
    dob: z.coerce.date().max(new Date(), "Date of birth cannot be in the future"),
    managedBy: z.string().trim().email().optional(),
  }),
};

export type CreateUserValidationType = {
  body: z.infer<typeof createUserValidation.body>;
};

export type ValidateUserValidationType = {
  body: z.infer<typeof validateUserValidation.body>;
};

export const deleteUserValidation = {
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteUserValidationType = {
  params: z.infer<typeof deleteUserValidation.params>;
};

export const updateUserValidation = {
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
};

export type UpdateUserValidationType = {
  body: z.infer<typeof updateUserValidation.body>;
};

export const assignProfileToSubUserValidation = {
  body: z.object({
    childUserId: objectIdValidation,
  }),
};

export type AssignProfileToSubUserValidationType = {
  body: z.infer<typeof assignProfileToSubUserValidation.body>;
};
