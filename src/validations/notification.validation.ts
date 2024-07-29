import { objectIdValidation } from "@Validations/helpers";
import { z } from "zod";

export const deleteNotificationValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};

export type DeleteNotificationValidationType = {
  params: z.infer<typeof deleteNotificationValidation.params>;
};
