import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, `../secrets/env/.env.${process.env.ENVIRONMENT}`) });

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const firebaseServiceAccount =
  process.env.ENVIRONMENT === "staging"
    ? require("../secrets/firebase/spn-project-staging-firebase-adminsdk-dh2wg-f5d5eb1b53.json")
    : require("../secrets/firebase/spn-project-419310-firebase-adminsdk-hgqwo-3a15e8d7d2.json");
