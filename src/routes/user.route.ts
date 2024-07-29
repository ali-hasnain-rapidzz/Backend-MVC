import {
  assignProfileToSubUser,
  deleteUser,
  getAllUsers,
  listSubUsers,
  listUserProfiles,
  saveUser,
  updateUser,
  validate_newuser,
} from "@Controllers/user.controller";
import authMiddleware from "@Middlewares/auth.middleware";
import { validate } from "@Middlewares/validate";
import { paginationValidation } from "@Validations/pagination.validation";
import {
  assignProfileToSubUserValidation,
  createUserValidation,
  listUserProfilesPaginationValidation,
  updateUserValidation,
  validateUserValidation,
} from "@Validations/user.validation";
import { Router } from "express";

const router: Router = Router();

router
  .route("/")
  .get(getAllUsers)
  .post(validate(createUserValidation), saveUser)
  .put(validate(updateUserValidation), updateUser)
  .delete(authMiddleware(), deleteUser);

router
  .route("/list")
  .post(authMiddleware(), validate(listUserProfilesPaginationValidation), listUserProfiles);

router.route("/validate-new-user").post(validate(validateUserValidation), validate_newuser);
// router.route("/list-profiles").post(authMiddleware(), getUserProfiles);
router.route("/list-subUsers").post(authMiddleware(), validate(paginationValidation), listSubUsers);
router
  .route("/assign-profile-to-subUser")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(assignProfileToSubUserValidation),
    assignProfileToSubUser,
  );

export default router;
