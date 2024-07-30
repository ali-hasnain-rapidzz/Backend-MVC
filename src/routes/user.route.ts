import { login, signup } from "@Controllers/auth.controller";
import { listUsers } from "@Controllers/user.controller";
import { validate } from "@Middlewares/validate";
import { createUserValidation } from "@Validations/user.validation";
import { Router } from "express";

const router: Router = Router();

router.route("/list").post(listUsers);

export default router;
