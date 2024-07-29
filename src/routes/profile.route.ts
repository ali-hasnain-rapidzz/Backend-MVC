import {
  deleteProfile,
  deleteProfileLeague,
  deleteProfileTeam,
  listExploreLeagues,
  listExploreProfiles,
  listExploreTeammates,
  listExploreTeams,
  listLikedPosts,
  listProfileEvents,
  listProfileInvites,
  listProfileLeagues,
  listProfileNotifications,
  listProfilePosts,
  listProfileTeams,
  listSavedPosts,
  profileAcceptRejectInvitation,
  savePost,
} from "@Controllers/profile.controller";
import authMiddleware from "@Middlewares/auth.middleware";
import { validate } from "@Middlewares/validate";
import { paginationValidation } from "@Validations/pagination.validation";
import { savePostValidation } from "@Validations/post.validation";
import {
  deleteProfileLeagueValidation,
  deleteProfileTeamValidation,
  listProfileEventsValidation,
  listProfileInvitesValidation,
  listProfileLeaguesValidation,
  listProfilePostsValidation,
  profileInvitationAcceptRejectValidation,
} from "@Validations/profile.validation";
import { listTeamMembersPaginationValidation } from "@Validations/team.validation";
import { Router } from "express";

const router: Router = Router();

router.route("/").delete(authMiddleware({ checkProfile: true }), deleteProfile);
router
  .route("/team/:teamId")
  .delete(
    authMiddleware({ checkProfile: true }),
    validate(deleteProfileTeamValidation),
    deleteProfileTeam,
  );
router
  .route("/league/:leagueId")
  .delete(
    authMiddleware({ checkProfile: true }),
    validate(deleteProfileLeagueValidation),
    deleteProfileLeague,
  );
router
  .route("/list-invites")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(listProfileInvitesValidation),
    validate(paginationValidation),
    listProfileInvites,
  );
router.route("/list-posts/:profileId").post(validate(listProfilePostsValidation), listProfilePosts);
router
  .route("/list/leagues/:profileId")
  .post(validate(listProfileLeaguesValidation), listProfileLeagues);
router.route("/list/teams/:profileId").post(validate(paginationValidation), listProfileTeams);
router
  .route("/list/events/:profileId")
  .post(validate(listProfileEventsValidation), listProfileEvents);
// router.route("/list/profiles").post(validate(paginationValidation), listAllProfiles);
router
  .route("/list/notifications")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(paginationValidation),
    listProfileNotifications,
  );
router
  .route("/list/liked-posts")
  .post(authMiddleware({ checkProfile: true }), validate(paginationValidation), listLikedPosts);
router
  .route("/list/saved-posts")
  .post(authMiddleware({ checkProfile: true }), validate(paginationValidation), listSavedPosts);
router
  .route("/list/explore-profiles")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(paginationValidation),
    listExploreProfiles,
  );
router
  .route("/list/explore-teams")
  .post(authMiddleware({ checkProfile: true }), validate(paginationValidation), listExploreTeams);
router
  .route("/list/explore-leagues")
  .post(authMiddleware({ checkProfile: true }), validate(paginationValidation), listExploreLeagues);
router
  .route("/acceptreject")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(profileInvitationAcceptRejectValidation),
    profileAcceptRejectInvitation,
  );
router
  .route("/list/teammates")
  .post(
    authMiddleware({ checkProfile: true }),
    validate(listTeamMembersPaginationValidation),
    listExploreTeammates,
  );

router
  .route("/posts/:id/save-unsave-post")
  .post(authMiddleware({ checkProfile: true }), validate(savePostValidation), savePost);

export default router;
