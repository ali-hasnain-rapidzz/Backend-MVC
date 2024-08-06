import { softDeletePlugin } from "@Plugins/softDelete.plugin";
import { UserType } from "@Types/user.types";
import { Model, Schema, model } from "mongoose";

const userSchema = new Schema<UserType>(
  {
    name: {
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
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre("save", function (next) {
  if (this.isNew) {
    this._wasNew = true;
  } else {
    this._wasNew = false;
  }
  next();
});

// Plugins
userSchema.plugin(softDeletePlugin);

export const User: Model<UserType> = model("Users", userSchema);
