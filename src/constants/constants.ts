import { EVENT_FORMAT, PROFILE_DISCRIMINATORS } from "@Constants/enum.constants";
import { League } from "@Models/league.model";
import { Post } from "@Models/post.model";
import { Profile } from "@Models/profile.model";
import { Team } from "@Models/team.model";
import FAVOURITE_PLAYERS_JSON from "@Resources/favourite_players.json";
import FAVOURITE_TEAMS_JSON from "@Resources/favourite_teams.json";
import { PrivilegeType } from "@Types/privilege.types";

export const FAVOURITE_TEAMS_LIST = FAVOURITE_TEAMS_JSON as unknown as {
  value: string;
  label: string;
}[];

export const FAVOURITE_PLAYERS_LIST = FAVOURITE_PLAYERS_JSON as unknown as {
  value: string;
  label: string;
}[];

export const ERROR_MESSAGES = {
  ID_CONFLICT: "Only teamId or leagueId can pass",
  LINK_INVALID: "Link is Invalid / should contain .com",
  INVALID_REPITITION_END_DATE:
    "repititionEndDate must be lesser than or equal to the current repititionEndDate",
  INTERNAL_SERVER_ERROR: "Internal server error",
  RECORD_ALREADY_EXIST: "record already exist!",
  RECORD_NOT_FOUND: "record does not exist!",
  FOLLOW_REQUEST_NOT_FOUND: "follow request does not exist!",
  FORBIDDEN: "forbidden access!",
  INVALID_TOKEN: "Invalid or expired token!",
  INVALID_REQUEST: "Invalid request!",
  PARENT_LOW_PROFILES: "Parent may have more than 1 profile before!",
  UNDER_AGE_USER: "User under age. Requires to be managed!",
  INVALID_MANAGER: "Invalid manager!",
  MANAGER_UNDER_AGE: "Invalid manager. Manager under age!",
  ALREADY_FOLLOWING: "You are already following this user or follow requested!",
  INVALID_FOLLOWER: "Invalid Follower",
  INVALID_FOLLOWING: "Invalid Following",
  NOT_FOLLOWING: "You are not following or follow requested this user",
  INVALID_USER: "Invalid user",
  EMAIL_UNVERIFIED: "Email not verified",
  ALREADY_EXISTS: "Already exists",
  ALREADY_CONNECTED: "You already have connection to this user",
  ALREADY_REQUEST_SENT: "Already request sent",
  REQUEST_NOT_FOUND: "No request found",
  ADMIN_REQUIRED: "Atleast one admin is required",
  DUPLICATE_EMAIL: "ManagedBy cannot be same as email",
  POST_PUBLISHED: "Post is already published",
  INVALID_OBJECTID:
    "Id sent in route is invalid, not given or another route is overlapping the route being called",
  CONNECTIONS_ONLY_SAVE:
    "You are not allowed to save this post. The user has restricted saving their posts to their connections only.",
};

export const REGEX_CONSTANTS = {
  // eslint-disable-next-line no-useless-escape
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export const DEFAULT_PAGINATION_LIMIT = 10;

export const SUB_USER_SORT_FIELDS = ["createdAt", "fullName"];
export const FOLLOWING_SORT_FIELDS = ["createdAt", "fullName"];
export const MARGINAL_POST_MIN = 5;

export const GLOBAL_LIMITS = {
  MAX_USER_PROFILES_LIMIT: 10,
  MAX_MANAGED_USER_PROFILES_LIMIT: 3,
  MAX_MANAGED_USERS: 5,
};

export const MAX_FILE_LIMIT_MB = 20;

export const PROFILES_UNIQUE_KEYS = new Map([
  [PROFILE_DISCRIMINATORS.PLAYER, "upp"],
  [PROFILE_DISCRIMINATORS.COACH, "ucp"],
  [PROFILE_DISCRIMINATORS.OFFICIAL, "uop"],
]);

export const DEFAULT_NEW_USER_PRIVILEGES: PrivilegeType = {
  general: {
    only_connection_msg: true,
  },
  notifications: {
    messages: true,
    posts: {
      league: true,
      team: true,
    },
    manages: {
      account_update: true,
    },
    emails: true,
    accompolishment: {
      create: true,
    },
  },
  visibility: {
    achievements: true,
    connections: true,
    leagues: true,
    teams: true,
    followers: true,
    profile: true,
  },
  postPrivacy: {
    only_connection_comment: false,
    only_connection_rcv: false,
    only_connection_save: false,
    only_connection_share: false,
  },
};

export const EVENT_FORMAT_VALID_MEMBERS: {
  [key in EVENT_FORMAT]: { TEAMS?: number; PLAYERS?: number };
} = {
  [EVENT_FORMAT.GAME]: {
    TEAMS: 2,
  },
  [EVENT_FORMAT.PRACTICE]: {},
  [EVENT_FORMAT.MATCH]: {},
  [EVENT_FORMAT.COMPETITION]: {
    TEAMS: 2,
  },
  [EVENT_FORMAT.WORKOUT]: {},
  [EVENT_FORMAT.TRAINING]: {},
  [EVENT_FORMAT.TOURNAMENT]: {
    PLAYERS: 0,
  },
  [EVENT_FORMAT.PLAYOFFS]: {
    TEAMS: 2,
  },
  [EVENT_FORMAT.MEET]: {
    TEAMS: 2,
  },
  [EVENT_FORMAT.OTHER]: {},
};

export const countFields = [
  "connections",
  "experiences",
  "members",
  "profiles",
  "manages",
  "leagues",
  "teams",
  "sponsors",
  "followers",
  "followings",
  "posts",
  "likedPosts",
  "savedPosts",
  "events",
  "accomplishments",
  "comments",
];
export const statusBaseCountFields = [
  "leagues",
  "teams",
  "connections",
  "members",
  "followers",
  "followings",
];

export const GLOABL_SERACH_MODELS = {
  Profile: {
    model: Profile,
    keys: ["firstName", "lastName", "fullName", "ucp", "upp", "uop", "__t"],
    projectKeys: [
      "firstName",
      "lastName",
      "fullName",
      "ucp",
      "upp",
      "uop",
      "__t",
      "avatar",
      "privileges",
    ],
    type: "Profile",
  },
  Team: {
    model: Team,
    keys: ["name", "utp", "avatar"],
    projectKeys: ["name", "utp", "avatar"],
    type: "Team",
  },
  League: {
    model: League,
    keys: ["name", "ulp", "avatar"],
    projectKeys: ["name", "ulp", "avatar"],
    type: "League",
  },
  Post: {
    model: Post,
    keys: ["content"],
    projectKeys: ["content"],
    type: "Post",
  },
};

export const LEAGUE_SPECIFIC_EVENT_FORMATS = [
  EVENT_FORMAT.GAME,
  EVENT_FORMAT.MATCH,
  EVENT_FORMAT.COMPETITION,
  EVENT_FORMAT.PLAYOFFS,
  EVENT_FORMAT.MEET,
  EVENT_FORMAT.TOURNAMENT,
];

export const ADDITIONAL_KEYS_FOR_EVENTS = [
  {
    key: "format",
    label: "format",
  },
  {
    key: "teams",
    label: "teams",
  },
  {
    key: "status",
    label: "status",
  },
  {
    key: "playerStatus",
    label: "playerStatus",
  },
];
