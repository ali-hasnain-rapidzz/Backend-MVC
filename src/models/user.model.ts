import { softDeletePlugin } from "@Plugins/softDelete.plugin";
import { UserType } from "@Types/user.types";
import { Model, Schema, Types, model } from "mongoose";

const userSchema = new Schema<UserType>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    isDeleted: { type: Boolean, required: false, default: false },
    deletedBy: { type: Types.ObjectId, ref: "Users", required: false },
    deletedAt: { type: Date, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Plugins
userSchema.plugin(softDeletePlugin);

export const User: Model<UserType> = model("Users", userSchema);
