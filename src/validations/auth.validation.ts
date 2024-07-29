import { passwordSchema } from "@Validations/helpers";
import { notificationDeviceValidation } from "@Validations/profile.validation";
import { z } from "zod";

export const loginValidation = {
  body: z.object({
    email: z.string().email("please provide valid email"),
    password: z.string(),
  }),
};

export type LoginValidationType = {
  body: z.infer<typeof loginValidation.body>;
};

export const forgotPasswordValidation = {
  body: z.object({
    email: z.string().email("please provide valid email"),
  }),
};

export type ForgotPasswordValidationType = {
  body: z.infer<typeof forgotPasswordValidation.body>;
};
export const resetPasswordValidation = {
  body: z.object({
    email: z.string().email("please provide valid email"),
    newPassword: passwordSchema,
  }),
};

export type ResetPasswordValidationType = {
  body: z.infer<typeof resetPasswordValidation.body>;
};

export const profileLoginValidation = {
  body: z.object({
    userId: z.string().optional(),
    profileId: z.string(),
    notificationDevices: z.array(notificationDeviceValidation),
  }),
};

export type ProfileLoginValidationType = {
  body: z.infer<typeof profileLoginValidation.body>;
};

export const subUserLoginValidation = {
  body: z.object({}),
};

export type SubUserLoginValidationType = {
  body: z.infer<typeof subUserLoginValidation.body>;
};
