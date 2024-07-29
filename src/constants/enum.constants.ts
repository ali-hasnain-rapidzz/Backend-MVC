import { League } from "@Models/league.model";
import { Post } from "@Models/post.model";
import { Profile } from "@Models/profile.model";
import { Team } from "@Models/team.model";
import { User } from "@Models/user.model";
import { Model } from "mongoose";

export enum PROFILE_ROLES {
  PLAYER = "player",
  OFFICIAL = "official",
  COACH = "coach",
  TEAM = "team",
  LEAGUE = "league",
}

export enum PROFILE_DISCRIMINATORS {
  PLAYER = "Players",
  OFFICIAL = "Officials",
  COACH = "Coaches",
}

export enum LEAGUE_TEAM_VISIBILITY {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum TEAM_MEMBER_ROLE {
  ADMIN = "teamAdmin",
  MEMBER = "teamMember",
}

export enum LEAGUE_MEMBER_ROLE {
  ADMIN = "leagueAdmin",
  MEMBER = "leagueMember",
}

export enum QUERY_TYPE {
  AND = "and",
  OR = "or",
}

export enum MODEL_TO_VALIDATE_PERMISSION {
  TEAM = "team",
  LEAGUE = "league",
}

export enum SOCIAL_PLATFORMS {
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TIKTOK = "tiktok",
  LINKED_IN = "linkedin",
  X = "x",
}

export enum FOLLOW_UPS_COLLECTIONS {
  PROFILES = "Profiles",
  TEAMS = "Teams",
  LEAGUES = "Leagues",
}

export enum FOLLOW_STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
}

export enum FOLLOW_STATUS_REQ {
  ACCEPT = "accept",
  REJECT = "reject",
}

export enum PROFILE_INVITATIONS {
  TEAM = "Team",
  LEAGUE = "League",
}

export enum UNIT_TIME {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  WEEKS = "weeks",
  MONTHS = "months",
  YEARS = "years",
}

export enum LEAGUE_COLLECTIONS {
  PROFILES = "Profiles",
  TEAMS = "Teams",
}

export enum NOTIFICATION_ALERT_TYPE {
  KID_PROFILE_CREATED = "kidProfileCreated",
  NEW_MILESTONE = "newMileStone",
  NEW_AWARD = "newAward",
  NEW_REINFORCEMENT = "newReinforcement",
  PLAYER_KID_PROFILE_UPDATED = "playerKidProfileUpdated",
  COACH_KID_PROFILE_UPDATED = "coachKidProfileUpdated",
  OFFICIAL_KID_PROFILE_UPDATED = "OfficialKidProfileUpdated",
  UNDECIDED_EVENT = "undecidedEvent",
  KID_POST_CREATED = "kidCreatedNewPost",
  KID_LIKE = "kidLikedPost",
  POST_CREATED = "newPostCreated",
  FOLLOW = "follow",
  UNFOLLOW = "unfollow",
  SAVE = "save",
  LIKE = "like",
  COMMENT = "comment",
  INVITE = "invite",
  INVITE_ACCEPT = "inviteaccept",
  CONNECTION = "connection",
  CONNECTION_ACCEPT = "connectionaccept",
  NEW_PROFILE_ADDED = "newProfileAdded",
  SUB_USER_PROFILE_ADDED = "subUserProfileAdded",
  SUB_USER_NEW_POST = "subUserNewPost",
  UNDECIDED_EVENT_ATTENDEE = "undecidedEventAttendee",
}

export const MODELS: Record<string, Model<any>> = {
  Posts: Post,
  Leagues: League,
  Profiles: Profile,
  Teams: Team,
  Users: User,
};

export enum COACH_POSITIONS {
  HEAD_COACH = "Head Coach",
  ASSISTANT_COACH = "Assistant Coach",
}

export enum PLAYER_SPORTS {
  HOCKEY = "hockey",
  FOOTBALL = "football",
  BASKETBALL = "basketball",
  SOCCER = "soccer",
  TENNIS = "tennis",
  PADDLE_TENNIS = "paddleTennis",
  BASEBALL = "baseball",
  VOLLEY_BALL = "volleyBall",
  LACROSSE = "lacrosse",
  WRESTLING = "wrestling",
  GYMNASTIC = "gymnastic",
  CHEER_LEADING = "cheerLeading",
  DANCE = "dance",
  PICKLE_BALL = "pickleBall",
  GOLF = "golf",
  TRACK_AND_FIELD = "trackAndField",
  FLAG_FOOTBALL = "flagFootball",
  OTHER = "other",
}

export const SPORTS_POSITIONS = {
  [PLAYER_SPORTS.FOOTBALL]: [
    "QB",
    "RB",
    "FB",
    "H-Back",
    "TE",
    "Tackle",
    "Guard",
    "Center",
    "WR",
    "DT",
    "Nose",
    "DE",
    "LB",
    "SS",
    "FS",
    "CB",
    "DB",
    "Punter",
    "Place Kicker",
    "Long Snapper",
  ],
  [PLAYER_SPORTS.BASEBALL]: [
    "Pitcher",
    "Starting Pitcher",
    "Relief Pitcher",
    "Closer",
    "1st Base",
    "2nd Base",
    "Shortstop",
    "3rd Base",
    "Outfield",
    "Left Field",
    "Right Field",
    "Center Field",
    "Catcher",
    "Utility",
    "DH",
    "Infield",
  ],

  [PLAYER_SPORTS.BASKETBALL]: [
    "Point Guard",
    "Shooting Guard",
    "Guard",
    "Wing",
    "Small Forward",
    "Power Forward",
    "Forward",
    "Center",
    "Stretch 5",
  ],

  [PLAYER_SPORTS.LACROSSE]: [
    "Defense",
    "Middie",
    "Attack",
    "FOGO",
    "LSM",
    "Goalie",
    "X",
    "Def  Middie",
    "Off Middie",
  ],
  [PLAYER_SPORTS.WRESTLING]: ["Weight Classes", "State Specific?"],

  [PLAYER_SPORTS.SOCCER]: [
    "Goal Keeper",
    "CenterBack",
    "Wing Back",
    "Def Midfield",
    "Attacking Midfield",
    "Center Forward",
    "Wide Striker",
    "Striker",
    "Fullback",
  ],

  [PLAYER_SPORTS.HOCKEY]: ["Center", "LW", "RW", "Wing", "Def", "Goalie"],
  [PLAYER_SPORTS.VOLLEY_BALL]: [
    "Setter",
    "Outside Hitter",
    "Opposite Hitter",
    "Middle Blocker",
    "Libero",
    "Defensive Specialist",
    "Serving Specialist",
  ],
  [PLAYER_SPORTS.GYMNASTIC]: ["Beam", "Floor", "Uneven Bar", "Vault", "All Around"],

  [PLAYER_SPORTS.CHEER_LEADING]: ["Back Spot", "Base", "Flyer"],

  [PLAYER_SPORTS.DANCE]: [
    "Ballet",
    "Hip Hop",
    "Irish",
    "Swing",
    "Folk",
    "Ballroom",
    "Tap Dance",
    "Belly Dance",
    "Theatre",
    "Contemporary",
    "Modern",
    "Jazz",
    "Latin",
    "Country",
  ],
  [PLAYER_SPORTS.TENNIS]: ["Tennis player"],
  [PLAYER_SPORTS.PADDLE_TENNIS]: ["Paddle tennis player"],
  [PLAYER_SPORTS.PICKLE_BALL]: ["Pickleball player"],
  [PLAYER_SPORTS.GOLF]: ["Golf player"],
  [PLAYER_SPORTS.TRACK_AND_FIELD]: [
    "Sprinter",
    "Middle Distance",
    "Long Distance",
    "Hurdles",
    "Relays",
    "100m",
    "200m",
    "400m",
    "800m",
    "1500m",
    "3000m",
    "Steeplechase",
    "5000m",
    "10000m",
    "110/100m Hurdles",
    "400m Hurdles",
    "4x100m relay",
    "4x400m relay",
    "mixed 4x400m relay",
    "Long jump",
    "High jump",
    "Triple jump",
    "Pole Vault",
    "Discus",
    "Shot put",
    "Javelin",
    "Hammer throw",
    "Marathon",
    "Decathalon",
    "Heptathlon",
    "Cross Country",
  ],
  [PLAYER_SPORTS.FLAG_FOOTBALL]: [
    "Quarterback",
    "Center",
    "Wide Receiver",
    "Running Back",
    "Safety",
    "Defensive Back",
    "Rusher",
  ],
  [PLAYER_SPORTS.OTHER]: ["Player"],
};

export enum SORT_BY {
  ASC = "asc",
  DESC = "desc",
}

export enum CONNECTION_STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
}

export enum INVITATION_STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum COUNTER_TYPE {
  PLAYER = "player",
  OFFICIAL = "official",
  COACH = "coach",
  TEAM = "team",
  LEAGUE = "league",
}

export enum EVENT_TYPE {
  ONLINE = "online",
  INPERSON = "inPerson",
}

export enum POST_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export enum POST_VISIBILITY {
  ANYONE = "anyone",
  CONNECTIONS = "connections",
  FOLLOWERS = "followers",
}

export enum POST_TYPE {
  MEDIA = "media",
  EVENT = "event",
  POLL = "poll",
  GENERAL = "General_post",
  REPOST = "Repost",
}

export enum POST_DISCRIMINATORS {
  EVENT = "Events_post",
  POLL = "Polls",
  GENERAL = "General_post",
  REPOST = "Repost",
}

export enum DATE_COMPARE_BY {
  EQU = "equ",
  NEQ = "neq",
  LT = "lt",
  LEQ = "leq",
  GT = "gt",
  GEQ = "geq",
}

export enum DATE_DIFFERENCE {
  YEARS = "years",
  MONTHS = "months",
  WEEKS = "weeks",
  DAYS = "days",
  HOURS = "hours",
  MINUTES = "minutes",
  SECONDS = "seconds",
  MILLISECONDS = "milliseconds",
}

export enum CRON_JOBS_SCHEDULING {
  POST_PUBLISH_MIN = 15,
}

export enum INVITATIONS_LIST_TYPE {
  TEAMS = "Teams",
  LEAGUES = "Leagues",
}

export enum NOTIFICATION_DEVICE_PLATFORMS {
  ANDROID = "android",
  IOS = "ios",
}
export enum INVITE_TYPE {
  SENT = "sent",
  RECIEVED = "recieved",
}
export enum ACCOMPLISHMENT_TYPE {
  REINFORCEMENT = "reinforcement",
  AWARD = "award",
  MILESTONE = "milestone",
}
export enum ACCOMPLISHMENT_CREATED_VIA {
  SELF = "self",
  TEAM = "team",
  LEAGUE = "league",
}

export enum EVENT_VISIBILITY {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum EVENT_REPITITION {
  NONE = "none",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum EVENT_FORMAT {
  GAME = "Game",
  PRACTICE = "Practice",
  MATCH = "Match",
  COMPETITION = "Competition",
  WORKOUT = "Workout",
  TRAINING = "Training",
  TOURNAMENT = "Tournament",
  PLAYOFFS = "Playoffs",
  MEET = "Meet",
  OTHER = "Other",
}

export enum EVENT_DISCRIMINATORS {
  RECURSIVE_EVENT = "RecursiveEvent",
  ORG_EVENT = "OrgEvent",
}

export enum EVENT_STATUS {
  YET_TO_START = "yet_to_start",
  STARTED = "started",
  PENDING_RESULT = "pending_result",
  COMPLETED = "completed",
}

export enum ATTENDEE_STATUS {
  ATTEND = "attend",
  MAYBE = "maybe",
  NOT_ATTEND = "not_attend",
  NOT_DECIDED = "not_decided",
}
export enum ATTENDEE_TYPE {
  LEAGUES = "leagues",
  TEAMS = "teams",
  PLAYERS = "players",
}

export enum SEARCH_TYPE {
  PROFILE = "Profile",
  TEAM = "Team",
  LEAGUE = "League",
  POST = "Post",
}
