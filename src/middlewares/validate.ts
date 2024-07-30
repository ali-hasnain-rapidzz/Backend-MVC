import { ApplyValidatorsType } from "@Types/types";
import { ApiError } from "@Utils/ApiError";
import { pick } from "@Utils/pick";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodSchema, ZodTypeAny } from "zod";

export const validate =
  <T extends ZodTypeAny | { [key: string]: ZodSchema }>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchemaKeys = ["params", "query", "body"];
    const validSchema = pick(schema, validSchemaKeys as Array<keyof typeof schema>);

    const object: { [key: string]: any } = pick(
      req,
      Object.keys(validSchema) as Array<keyof Request>,
    );

    // Initialize an empty errors array to collect potential validation errors
    let errors: string[] = [];

    // Iterate over the validSchema to validate each part of the request
    for (const [key, value] of Object.entries(validSchema)) {
      const result = (value as ZodSchema).safeParse(object[key]);
      if (!result.success) {
        // Map Zod error messages for the current part (params, query, body)
        const partErrors = result.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`,
        );
        errors = errors.concat(partErrors);
      }
    }

    // If there are any accumulated errors, create and pass an ApiError to next
    if (errors.length > 0) {
      console.log({ errors });

      const errorMessage = errors.join(", ");
      throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
    }

    next();
  };

export const applyValidators =
  (data: ApplyValidatorsType) => async (req: Request, res: Response, next: NextFunction) => {
    const selectedOption = req.body[data.keyToCheck];
    const validators = data.options.find((opt) => opt.check === selectedOption)?.validators || [];

 
    try {
      for (const validator of validators) {
        await new Promise((resolve, reject) => {
          validate(validator)(req, res, (err) => (err ? reject(err) : resolve(null)));
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
