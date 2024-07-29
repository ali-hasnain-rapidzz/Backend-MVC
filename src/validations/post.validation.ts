import { FOLLOW_UPS_COLLECTIONS, POST_TYPE, POST_VISIBILITY } from "@Constants/enum.constants";
import { allowEmptyStringValidation, objectIdValidation } from "@Validations/helpers";
import { z } from "zod";

export const getPostValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};

export const deletePostValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};

export type GetPostValidationType = {
  params: z.infer<typeof getPostValidation.params>;
};

export type DeletePostValidationType = {
  params: z.infer<typeof deletePostValidation.params>;
};

export const createPostValidation = {
  body: z
    .object({
      content: allowEmptyStringValidation.optional(),
      images: z.array(z.string().trim()).min(0),
      visibility: z.nativeEnum(POST_VISIBILITY),
      postType: z.nativeEnum(POST_TYPE),
      startDate: z.coerce.date().min(new Date(), "startDate cannot be in the past"),
      role: z.nativeEnum(FOLLOW_UPS_COLLECTIONS),
      leagueId: objectIdValidation,
      teamId: objectIdValidation,
    })
    .superRefine((data, ctx) => {
      const isEventType = data.postType === POST_TYPE.EVENT;
      if (!isEventType && !data.content && data.images.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `content and images cannot be empty`,
          path: ["content"],
        });
      }
    }),
};

export type CreatePostValidationType = {
  body: z.infer<typeof createPostValidation.body>;
};

export const rePostValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
  body: z.object({
    content: allowEmptyStringValidation,
    visibility: z.nativeEnum(POST_VISIBILITY),
    startDate: z.coerce.date().min(new Date(), "startDate cannot be in the past"),
    role: z.nativeEnum(FOLLOW_UPS_COLLECTIONS),
    leagueId: objectIdValidation,
    teamId: objectIdValidation,
  }),
};

export type RePostValidationType = {
  params: z.infer<typeof rePostValidation.params>;
  body: z.infer<typeof rePostValidation.body>;
};

export const updatePostValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
  body: z.object({
    content: z.string().trim().optional(),
    images: z.array(z.string().trim()).min(0).optional(),
    visibility: z.nativeEnum(POST_VISIBILITY).optional(),
    postType: z.nativeEnum(POST_TYPE).optional(),
    startDate: z.coerce.date().min(new Date(), "startDate cannot be in the past").optional(),
  }),
};

export type UpdatePostValidationType = {
  body: Partial<z.infer<typeof updatePostValidation.body>>;
  params: Partial<z.infer<typeof updatePostValidation.params>>;
};

export const createPollPostValidation = {
  body: z.object({
    question: z.string().trim(),
    options: z.array(z.string().trim()),
    endDate: z.coerce.date().min(new Date(), "endDate cannot be in the past"),
  }),
};

export const updatePollPostValidation = {
  body: z.object({
    question: z.string().trim(),
    options: z.array(z.string().trim()),
    endDate: z.coerce.date().min(new Date(), "endDate cannot be in the past"),
  }),
};

export type CreatePollPostValidationType = {
  body: z.infer<typeof createPollPostValidation.body>;
};

export type UpdatePollPostValidationType = {
  body: Partial<z.infer<typeof updatePollPostValidation.body>>;
};

export const createEventPostValidation = {
  body: z.object({
    eventId: objectIdValidation,
  }),
};

export type CreateEventPostValidationType = {
  body: z.infer<typeof createEventPostValidation.body>;
};

export const createCommentValidation = {
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    comment: z.string().trim(),
  }),
};

export type CreateCommentValidationType = {
  params: z.infer<typeof createCommentValidation.params>;
  body: z.infer<typeof createCommentValidation.body>;
};
export const likePostValidation = {
  params: z.object({
    id: z.string().trim(),
  }),
};

export type LikePostValidationType = {
  params: z.infer<typeof likePostValidation.params>;
};

export const savePostValidation = {
  params: z.object({
    id: z.string(),
  }),
};

export type SavePostValidationType = {
  params: z.infer<typeof savePostValidation.params>;
};
