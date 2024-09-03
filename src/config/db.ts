import { catchAsync } from "@Utils/catchAsync";
import mongoose, { connect, disconnect } from "mongoose";

const dbConnect = catchAsync(async (url: string) => {
  mongoose.set("strictQuery", true);
  await connect(url);
  console.log("DB Connected");
});

const dbDisconnect = catchAsync(async () => {
  await disconnect();
  console.log("DB Disconnected");
});

export { dbConnect, dbDisconnect };
