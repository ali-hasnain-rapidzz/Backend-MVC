import dotenv from "dotenv";
import path from "path";

//dotenv.config({ path: path.resolve(__dirname, `../secrets/env/.env.${process.env.ENVIRONMENT}`) });
dotenv.config({ path: path.resolve(__dirname, `../secrets/env/.env.prod`) });

// eslint-disable-next-line @typescript-eslint/no-var-requires
