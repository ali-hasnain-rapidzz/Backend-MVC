import { login, signup } from "@Controllers/auth.controller";
import { validate } from "@Middlewares/validate";
import { loginValidation } from "@Validations/auth.validation";
import { createUserValidation } from "@Validations/user.validation";
import { Router } from "express";

const router: Router = Router();

router.route("/register-user").post(validate(createUserValidation), signup);
router.route("/login").post(validate(loginValidation), login);

export default router;
