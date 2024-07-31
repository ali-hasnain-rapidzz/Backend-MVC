import { SoftDeleteType } from "@Types/plugins/softDelete.types";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface UserType extends Document, SoftDeleteType {
  name: string;
  email: string;
  password: string;
}
