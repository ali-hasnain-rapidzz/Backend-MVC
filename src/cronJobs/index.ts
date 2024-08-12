import { UserService } from "@Services/user.service";
import cron from "node-cron";

const CRON_EXPRESSION = {
  EVERY_MIN: "* * * * *",
  EVERY_HOUR: "0 * * * *",
  EVERY_WEEK_DAY: "0 0 * * 1-5",
  EVERY_MONTH: "0 0 1 * *",
  EVERY_YEAR: "0 0 1 1 *",
  EVERY_DAY_AT_MIDNIGHT: "0 0 * * *",
  EVERY_15_MINS: "*/15 * * * *",
  EVERY_30_MINS: "*/30 * * * *",
};

// Schedule the cron job to run every 15 minutes
cron.schedule(CRON_EXPRESSION.EVERY_15_MINS, UserService.UserCron);
