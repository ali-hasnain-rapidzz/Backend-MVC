import { GenericAggregation } from "@Aggregations/generic.aggregation";
import { ERROR_MESSAGES, PROFILES_UNIQUE_KEYS } from "@Constants/constants";
import Transaction from "@Decorators/transaction.decorator";
import { DeletedUser } from "@Models/deletedUser.model";
import { Profile } from "@Models/profile.model";
import { User } from "@Models/user.model";
import { UserProfileType, UserType } from "@Types/user.types";
import { ApiError } from "@Utils/ApiError";
import { FilterValidationType } from "@Validations/pagination.validation";
import { ListUserProfilesValidationType } from "@Validations/user.validation";
import httpStatus from "http-status";
import { ClientSession, Types } from "mongoose";

class UserServiceClass {
  getAllUsers = () => User.find({}, { _id: 0 });

  createUser = (body: Partial<UserType>) => {
    return User.create({
      ...body,
      isVerified: body.isVerified || true,
      managedBy: body.managedBy || null,
      manages: [],
    });
  };

  getOneUser = ({
    email = "",
    phone = "",
    id,
  }: {
    email?: string;
    phone?: string;
    id?: Types.ObjectId;
  }) => {
    const filterObj: Partial<UserType> = {};
    if (id) return User.findById(id);
    if (email) filterObj.email = email;
    if (phone) {
      return User.findOne({
        $or: [{ email: filterObj.email }, { phone: phone }],
      });
    }
    return User.findOne(filterObj);
  };

  getUserManager = (email: string) => {
    return User.find({ "managedBy.email": email });
  };

  editUser = async (email: string, updateBody: Partial<UserType>) => {
    return User.findOneAndUpdate({ email: email }, updateBody);
  };

  deleteUser = (email: string) =>
    User.deleteOne({
      email: email,
    });

  softDeleteUser = async (data: { email: string; userId: Types.ObjectId; session?: any }) => {
    const { email, userId, session } = data;
    const user = await User.findOne({ email: email });

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.RECORD_NOT_FOUND);
    await user.softDelete({ userId, session });

    // Create a plain object from the user document
    const userObj = user.toObject();

    const deletedUser = new DeletedUser({
      ...userObj,
      isDeleted: true,
      deletedBy: userId,
      deletedAt: new Date(),
    });

    await deletedUser.save({ session });
    await user.remove({ session });
    return user;
  };

  deleteManyUser = (emails: string[]) =>
    User.deleteMany({
      email: {
        $in: emails,
      },
    });

  addManagedUser = async (email: string, managedUserId: Types.ObjectId) => {
    return User.findOneAndUpdate({ email }, { $push: { manages: managedUserId } }, { new: true });
  };

  populateProfiles = (
    id: Types.ObjectId,
    fieldsToPopulate: string[],
    fieldsToRemoveStr: string,
  ) => {
    let query = User.findOne({ _id: id });

    fieldsToPopulate.forEach((field) => {
      query = query.populate(field, fieldsToRemoveStr);
    });

    return query;
  };

  // REMEMBER: NOT TO USE ARROW FUNCTIONS WITH DECORATORS
  @Transaction()
  async swapProfileWithUser(
    data: {
      parentUserId: Types.ObjectId;
      childUserId: Types.ObjectId;
      profileId: Types.ObjectId;
    },
    session: ClientSession | null = null,
  ): Promise<void> {
    const { parentUserId, childUserId, profileId } = data;
    // Fetch the parent user
    const [parentUser, childUser, profile] = await Promise.all([
      User.findById(parentUserId),
      User.findById(childUserId),
      Profile.findById(profileId),
    ]);
    if (!parentUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "Parent user not found");
    }
    if (!childUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "Child user not found");
    }
    if (
      !parentUser.manages.some((managedUser) => managedUser.toString() === childUserId.toString())
    ) {
      throw new ApiError(httpStatus.METHOD_NOT_ALLOWED, ERROR_MESSAGES.INVALID_REQUEST);
    }
    if (parentUser.profiles.length === 1) {
      throw new ApiError(httpStatus.METHOD_NOT_ALLOWED, ERROR_MESSAGES.PARENT_LOW_PROFILES);
    }
    if (!profile) {
      throw new ApiError(httpStatus.NOT_FOUND, "Profile not found");
    }

    // Check if the profile exists in the parent user's profiles list
    const profileIndex = parentUser.profiles.findIndex(
      (profile) => profile.profileId.toString() === profileId.toString(),
    );
    if (profileIndex === -1) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Profile not found in parent user's profiles list",
      );
    }

    // Check if the current profile being removed is primary
    const wasPrimaryProfile = parentUser.profiles[profileIndex].isPrimary;

    childUser.profiles.push({
      profileId: profile._id,
      isPrimary: false,
    });
    parentUser.profiles.splice(profileIndex, 1);

    // If the removed profile was primary and there are remaining profiles in parentUser
    if (wasPrimaryProfile && parentUser.profiles.length > 0) {
      let oldestProfileIndex = 0;
      let oldestProfile = (parentUser.profiles as (UserProfileType & { createdAt: Date })[])[0];

      for (let i = 1; i < parentUser.profiles.length; i++) {
        if (
          new Date(
            (parentUser.profiles as (UserProfileType & { createdAt: Date })[])[i].createdAt,
          ) > new Date(oldestProfile.createdAt)
        ) {
          oldestProfile = (parentUser.profiles as (UserProfileType & { createdAt: Date })[])[i];
          oldestProfileIndex = i;
        }
      }

      // Set the oldest profile as primary
      parentUser.profiles[oldestProfileIndex].isPrimary = true;
    }

    profile.userId = childUserId;

    await Promise.all([
      childUser.save({ session }),
      parentUser.save({ session }),
      profile.save({ session }),
    ]);
  }

  getProfile = async (id: Types.ObjectId, profileId?: Types.ObjectId) =>
    User.findOne({ _id: id, "profiles.profileId": profileId });

  listSubUsers = async (data: {
    _id?: Types.ObjectId;
    filter?: FilterValidationType;
    page: number;
    limit: number;
    stat?: boolean;
  }) => {
    const { _id, filter, page, limit, stat = false } = data;
    const relationship = "manages";
    const collections = ["users"];
    const key: string = "";
    const postPopulateQuery: any = {};
    if (filter?.searchTerm) {
      ["fullName", "email", "phone"].forEach((key) => (postPopulateQuery[key] = filter.searchTerm));
    }

    const searchQuery = { postPopulateQuery };

    let aggregation = GenericAggregation.populateAndFilter({
      _id,
      searchQuery,
      relationship,
      key,
      collections,
    });
    const countQry = [...aggregation, { $count: "totalCount" }];

    const paginateData = GenericAggregation.paginateAndSort({ filter, page, limit });
    const statValues: any = GenericAggregation.statValues({ hideArrays: stat });
    aggregation = [...aggregation, ...paginateData, ...statValues];
    const getCount = User.aggregate(countQry);
    const getList = User.aggregate(aggregation);
    const [count, result] = await Promise.all([getCount, getList]);

    return {
      count: count[0]?.totalCount || 0,
      manages: result,
    };
  };

  listUserProfiles = async (data: {
    _id?: Types.ObjectId;
    filter?: ListUserProfilesValidationType;
    page: number;
    limit: number;
    stat?: boolean;
  }) => {
    const { _id, filter, page, limit, stat = false } = data;

    const searchTerm = filter?.searchTerm || "";
    const searchQuery = {
      $match: {
        $and: [
          ...(filter?.profileType ? [{ __t: { $in: filter?.profileType } }] : []),
          {
            $or: [
              ...(filter?.profileType
                ? [
                    ...(filter?.profileType || []).map((type) => ({
                      [PROFILES_UNIQUE_KEYS.get(type)!]: {
                        $regex: searchTerm,
                        $options: "i",
                      },
                    })),
                  ]
                : [
                    ...["ucp", "upp", "uop"].map((key) => ({
                      [key]: { $regex: searchTerm, $options: "i" },
                    })),
                  ]),
              {
                fullName: {
                  $regex: searchTerm,
                  $options: "i",
                },
              },
            ],
          },
        ],
      },
    };

    const relationship = "profiles";
    const collections = ["profiles"];
    const key: string = "profileId";
    let aggregation = GenericAggregation.populateAndFilter({
      _id,
      relationship,
      key,
      collections,
      postPopulateAggregation: searchQuery,
    });
    const countQry = [...aggregation, { $count: "totalCount" }];

    const paginateData = GenericAggregation.paginateAndSort({ filter, page, limit });
    const statValues: any = GenericAggregation.statValues({ hideArrays: stat });
    aggregation = [...aggregation, ...paginateData, ...statValues];

    const getCount = User.aggregate(countQry);
    const getList = User.aggregate(aggregation);
    const [count, result] = await Promise.all([getCount, getList]);

    return {
      count: count[0]?.totalCount || 0,
      profiles: result,
    };
  };
}

export const UserService = new UserServiceClass();
