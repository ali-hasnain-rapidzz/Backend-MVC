import { ERROR_MESSAGES } from "@Constants/constants";
import { Types } from "mongoose";
import { z } from "zod";

export const isAlphaNumeric = (str: any) => {
  const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return !specialChars.test(str.toString());
};

export const passwordValidation = z.string().min(6).max(14);
export const objectIdValidation = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true; // Allow empty value
      return Types.ObjectId.isValid(value);
    },
    {
      message: ERROR_MESSAGES.INVALID_OBJECTID,
    },
  );
  