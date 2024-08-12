import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, `../secrets/env/.env.${process.env.ENVIRONMENT}`) });
