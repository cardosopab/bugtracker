import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to mongoDB.");
  } catch (err) {
    throw err;
  }
};

export default connectDatabase;
