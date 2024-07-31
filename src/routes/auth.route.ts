import { login, signup } from "@Controllers/auth.controller";
import { validate } from "@Middlewares/validate";
import { loginValidation, signUpValidation } from "@Validations/auth.validation";
import { Router } from "express";

const router: Router = Router();

router.route("/register").post(validate(signUpValidation), signup);
router.route("/login").post(validate(loginValidation), login);

export default router;
