import { PostAuth } from "@Authentication/post.auth";
import { POST_TYPE } from "@Constants/enum.constants";
import {
  createComment,
  createPost,
  deletePost,
  getPost,
  likeDislikePost,
  listAllPosts,
  listPostsFeed,
  repostPost,
  updatePost,
} from "@Controllers/post.controller";
import { applyValidators, validate } from "@Middlewares/validate";
import { ApplyValidatorsType } from "@Types/types";
import { paginationValidation } from "@Validations/pagination.validation";
import {
  createCommentValidation,
  createEventPostValidation,
  createPollPostValidation,
  createPostValidation,
  deletePostValidation,
  getPostValidation,
  likePostValidation,
  rePostValidation,
  updatePollPostValidation,
  updatePostValidation,
} from "@Validations/post.validation";
import { Router } from "express";
const router: Router = Router();

const createPostValidatorsObj: ApplyValidatorsType = {
  keyToCheck: "postType",
  options: [
    {
      check: POST_TYPE.POLL,
      validators: [createPollPostValidation],
    },
    {
      check: POST_TYPE.EVENT,
      validators: [createEventPostValidation],
    },
  ],
};

const updatePostValidatorsObj: ApplyValidatorsType = {
  keyToCheck: "postType",
  options: [
    {
      check: POST_TYPE.POLL,
      validators: [updatePollPostValidation],
    },
  ],
};

router
  .route("/")
  .post(
    PostAuth.checkCreatePermission(),
    validate(createPostValidation),
    applyValidators(createPostValidatorsObj),
    createPost,
  );
router.route("/list").post(validate(paginationValidation), listAllPosts);
router.route("/list-feed").post(validate(paginationValidation), listPostsFeed);
router.route("/:id/comments").post(validate(createCommentValidation), createComment);
router.route("/:id/like").post(validate(likePostValidation), likeDislikePost);
router.route("/:id/repost").post(validate(rePostValidation), repostPost);

router
  .route("/:id")
  .post(validate(getPostValidation), getPost)
  .put(
    PostAuth.checkUpdatePermission({ key: "params.id" }),
    validate(updatePostValidation),
    applyValidators(updatePostValidatorsObj),
    updatePost,
  )
  .delete(
    PostAuth.checkUpdatePermission({ key: "params.id" }),
    validate(deletePostValidation),
    deletePost,
  );
export default router;
