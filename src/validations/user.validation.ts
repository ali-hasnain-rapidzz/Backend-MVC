import { objectIdValidation } from "@Validations/helpers";
import { z } from "zod";

export const createUserValidation = {
  body: z.object({
    name: z.string().trim(),

    email: z.string().trim().email().toLowerCase(),

    password: z.string(),
  }),
};

export type CreateUserValidationType = {
  email: string | undefined;
  body: z.infer<typeof createUserValidation.body>;
};
