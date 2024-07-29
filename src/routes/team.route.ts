import { TeamAuth } from "@Authentication/team.auth";
import {
  acceptRejectInvitation,
  getTeam,
  listTeamFollowers,
  listTeamLeagues,
  listTeamMemberInvites,
  listTeamMembers,
  listTeamPosts,
  listTeams,
  saveTeam,
  sendInvitation,
  updateTeam,
} from "@Controllers/team.controller";
import authMiddleware from "@Middlewares/auth.middleware";
import { validate } from "@Middlewares/validate";
import { paginationValidation } from "@Validations/pagination.validation";
import {
  createTeamValidation,
  getTeamValidation,
  listTeamFollowersPaginationValidation,
  listTeamLeagueValidation,
  listTeamMembersPaginationValidation,
  teamInvitationValidation,
  teaminvitationAcceptRejectValidation,
  updateTeamValidation,
} from "@Validations/team.validation";
import { Router } from "express";

const router: Router = Router();

router
  .route("/")
  .post(authMiddleware({ checkProfile: true }), validate(createTeamValidation), saveTeam);

router.route("/list").post(validate(paginationValidation), listTeams);

router
  .route("/invite")
  .post(authMiddleware({ checkProfile: true }), validate(teamInvitationValidation), sendInvitation);

router
  .route("/acceptreject")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(teaminvitationAcceptRejectValidation),
    acceptRejectInvitation,
  );

router
  .route("/:teamId/list-invites")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(listTeamLeagueValidation),
    listTeamMemberInvites,
  );

router
  .route("/:teamId/leagues")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(listTeamLeagueValidation),
    listTeamLeagues,
  );

router
  .route("/:teamId/members")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(listTeamMembersPaginationValidation),
    listTeamMembers,
  );
router
  .route("/:teamId/posts")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(listTeamMembersPaginationValidation),
    listTeamPosts,
  );
router
  .route("/:teamId/followers")
  .post(validate(listTeamFollowersPaginationValidation), listTeamFollowers);
router
  .route("/:id")
  .post(authMiddleware({ checkProfile: true }), validate(getTeamValidation), getTeam)
  .put(
    authMiddleware({ checkProfile: true }),
    validate(updateTeamValidation),
    TeamAuth.extractTeamDetails({ key: "params.id", role: "manage_team" }),
    updateTeam,
  );
export default router;
