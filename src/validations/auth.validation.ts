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






