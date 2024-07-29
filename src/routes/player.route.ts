import {
  createPlayer,
  deletePlayer,
  getPlayer,
  listPlayers,
  updatePlayer,
} from "@Controllers/player.controller";
import { validate } from "@Middlewares/validate";
import { paginationValidation } from "@Validations/pagination.validation";
import {
  createPlayerValidation,
  deletePlayerValidation,
  getPlayerValidation,
  updatePlayerValidation,
} from "@Validations/player.validation";
import { Router } from "express";

const router: Router = Router();

router.route("/").post(validate(createPlayerValidation), createPlayer);

router.route("/list").post(validate(paginationValidation), listPlayers);
router
  .route("/:id")
  .post(validate(getPlayerValidation), getPlayer)
  .put(validate(updatePlayerValidation), updatePlayer)
  .delete(validate(deletePlayerValidation), deletePlayer);

export default router;
