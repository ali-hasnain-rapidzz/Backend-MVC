import { Schema } from "mongoose";

// Apply the middleware to relevant query methods
export const registerPostSavePlugin = function <T>(schema: Schema<T>) {
  // Pre-save middleware to check if the document is new
  schema.pre("save", function (next) {
    if (this.isNew) {
      this._wasNew = true;
    } else {
      this._wasNew = false;
    }
    next();
  });
};
