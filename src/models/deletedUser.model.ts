import { UserManagedByType, UserProfileType, UserType } from "@Types/user.types";
import { Model, Schema, Types, model } from "mongoose";

const managedBySchema = new Schema<UserManagedByType>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    versionKey: false,
  },
);
export const userProfileSchema = new Schema<UserProfileType>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Profiles",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
    timestamps: {
      createdAt: true,
    },
  },
);

const deletedUserSchema = new Schema<UserType>(
  {
    firebaseUserId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      default: "",
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    managedBy: {
      type: managedBySchema,
      required: false,
      default: null,
    },
    manages: [{ type: Types.ObjectId, ref: "Users" }],
    profiles: [userProfileSchema],
    isDeleted: { type: Boolean, required: false, default: false },
    deletedBy: { type: Types.ObjectId, ref: "Users", required: false },
    deletedAt: { type: Date, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const DeletedUser: Model<UserType> = model("Deleted_users", deletedUserSchema);
