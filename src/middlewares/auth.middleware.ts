import { DEFAULT_NEW_USER_PRIVILEGES, ERROR_MESSAGES } from "@Constants/constants";
import { FirebaseService } from "@Services/firebase.service";
import { ProfileService } from "@Services/profile.service";
import { UserService } from "@Services/user.service";
import { FirebaseDecodedToken } from "@Types/firebase.types";
import { PrivilegeType } from "@Types/privilege.types";
import { ApiError } from "@Utils/ApiError";
import { catchAsync } from "@Utils/catchAsync";
import httpStatus from "http-status";
import { Types } from "mongoose";

interface optionsType {
  checkProfile?: boolean;
  allowSubUser?: boolean;
  allowMainUserId?: boolean;
}

// Middleware factory function
const authMiddleware = (options: optionsType = {}) =>
  catchAsync(async (req, res, next) => {
    const { checkProfile, allowMainUserId = true, allowSubUser = true } = options;
    const authHeader: string | undefined = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
    }

    const idToken = authHeader.substring(7);
    if (!idToken) {
      throw new ApiError(httpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
    }

    const decodedToken = (await FirebaseService.decodeToken(idToken)) as FirebaseDecodedToken;

    req.user = {
      ...decodedToken,
      token: idToken,
    };

    if (allowMainUserId && !req.body.mainUserId) {
      throw new ApiError(httpStatus.FORBIDDEN, "mainUserId is required but was not provided.");
    }
    req.user.mainUserId = new Types.ObjectId(req.body.mainUserId);

    if (checkProfile) {
      if (!req.body.profileId) {
        throw new ApiError(httpStatus.FORBIDDEN, "profileId is required but was not provided.");
      }
      req.user.profileId = new Types.ObjectId(req.body.profileId);

      const profile = await ProfileService.getProfileWithPrivileges(req.user.profileId);
      if (!profile?.privileges) await ProfileService.createProfilePrivileges(req.user.profileId);
      req.user.privileges = (profile?.privileges ||
        DEFAULT_NEW_USER_PRIVILEGES) as PrivilegeType & {
        _id: Types.ObjectId;
      };
    }

    let subUser = null;
    if (allowSubUser) {
      if (req.body.subUser?.mainUserId) {
        const [mainUser] = await Promise.all([UserService.getOneUser({ id: req.body.mainUserId })]);
        const isSubUser = (mainUser?.manages || []).includes(req.body.subUser.mainUserId);
        if (!isSubUser) throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MESSAGES.INVALID_MANAGER);

        subUser = {
          mainUserId: new Types.ObjectId(req.body.subUser.mainUserId),
        };

        if (checkProfile) {
          if (!req.body.subUser.profileId)
            throw new ApiError(
              httpStatus.UNAUTHORIZED,
              "subUser.profileId is required but was not provided",
            );

          Object.assign(subUser, {
            profileId: new Types.ObjectId(req.body.subUser.profileId),
          });
        }
      }
    }
    req.user.subUser = subUser;

    next();
  });

export default authMiddleware;
