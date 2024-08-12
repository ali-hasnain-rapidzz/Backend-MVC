import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

export const listAllUsersPaginationValidation = {
  body: paginationValidation.body.extend({
    filter: baseFilterValidation,
  }),
};

export type ListAllUsersPaginationValidationType = {
  body: z.infer<typeof listAllUsersPaginationValidation.body>;
};
