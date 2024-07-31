import { SORT_BY } from "@Constants/enum.constants";
import { z } from "zod";

// Define schema for reset password

// Define the base schema for filter validation
export const baseFilterValidation = z.object({
  sortByKey: z.string(),
  sortOrder: z.nativeEnum(SORT_BY),
 
});

// Export the optional filter validation schema
export const filterValidation = baseFilterValidation.optional();

export type FilterValidationType = z.infer<typeof filterValidation>;

export const paginationValidation = {
  body: z.object({
    stat: z.boolean().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
    filter: filterValidation,
  }),
};

export type PaginationValidationType = {
  body: z.infer<typeof paginationValidation.body>;
};
