import mongoose, { connect, disconnect } from "mongoose";

export async function dbConnect(url: string) {
  try {
   
    mongoose.set("strictQuery", true);
    await connect(url);
    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
}

export async function dbDisconnect() {
  try {
    await disconnect();
    console.log("DB Disconnected");
  } catch (error) {
    console.error(error);
  }
}
