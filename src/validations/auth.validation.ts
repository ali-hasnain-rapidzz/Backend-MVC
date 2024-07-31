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

export const signUpValidation = {
  body: z.object({
    name: z.string().trim(),

    email: z.string().trim().email().toLowerCase(),

    password: z.string(),
  }),
};

export type SignUpValidationType = {
  body: z.infer<typeof signUpValidation.body>;
};
