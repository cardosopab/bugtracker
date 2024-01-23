import mongoose from "mongoose";

const connectDatabase = async (URI: string) => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to mongoDB.");
  } catch (err) {
    throw err;
  }
};

export default connectDatabase;
