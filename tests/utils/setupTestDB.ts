import mongoose from "mongoose";

export const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://");
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
  });
};
