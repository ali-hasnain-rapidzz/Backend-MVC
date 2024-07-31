import { listUsers } from "@Controllers/user.controller";

import { Router } from "express";

const router: Router = Router();

router.route("/list").post(listUsers);

export default router;
