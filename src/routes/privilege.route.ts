import { updateProfilePrivilege } from "@Controllers/privilege.controller";
import { validate } from "@Middlewares/validate";
import { updatePrivilegeValidation } from "@Validations/privilege.validation";
import { Router } from "express";

const router: Router = Router();

router.route("/").put(validate(updatePrivilegeValidation), updateProfilePrivilege);

export default router;
