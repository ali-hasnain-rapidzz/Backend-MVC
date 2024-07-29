import { Types } from "mongoose";

export interface SoftDeleteType {
  isDeleted?: boolean;
  deletedBy?: Types.ObjectId;
  deletedAt?: Date;
}
