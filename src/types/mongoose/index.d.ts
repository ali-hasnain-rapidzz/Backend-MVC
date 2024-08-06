// mongoose.d.ts
import "mongoose";

declare module "mongoose" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Document<T = any, QueryHelpers = object> {
    softDelete(data: { userId: Types.ObjectId; session?: any }): Promise<void>;
    _wasNew?: boolean;
  }
}
