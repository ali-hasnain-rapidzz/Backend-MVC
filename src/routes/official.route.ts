import {
  getOfficial
} from "@Controllers/official.controller";
import { validate } from "@Middlewares/validate";
import {
  getOfficialValidation
} from "@Validations/official.validation";
import { Router } from "express";

const router: Router = Router();

router
  .route("/:id")
  .post(validate(getOfficialValidation), getOfficial)

export default router;
