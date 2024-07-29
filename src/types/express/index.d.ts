import { FirebaseDecodedToken } from "@Types/firebase.types";

declare module "express-serve-static-core" {
  export interface Request {
    user: FirebaseDecodedToken;
  }
}

// to make the file a module and avoid the TypeScript error
export { };

