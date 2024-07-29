import { SoftDeleteType } from "@Types/plugins/softDelete.types";
import { Types } from "mongoose";

export interface UserManagedByType {
  email: string;
}

export interface UserProfileType {
  profileId: Types.ObjectId;
  isPrimary?: boolean;
}

export interface UserType extends Document, SoftDeleteType {
  firebaseUserId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  isVerified: boolean;
  managedBy: UserManagedByType | null;
  manages: Types.ObjectId[];
  profiles: UserProfileType[];
}
