import { SEARCH_TYPE } from "@Constants/enum.constants";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

export const globalSearchValidation = {
  body: paginationValidation.body.extend({
    eachModelLimit: z.number().optional(),
    filter: baseFilterValidation.extend({
      models: z.nativeEnum(SEARCH_TYPE).array().optional(),
    }),
  }),
};

export type globalSearchValidationType = {
  body: z.infer<typeof globalSearchValidation.body>;
};
