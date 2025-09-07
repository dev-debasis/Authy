import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully!!");
  } catch (error) {
    console.error("MongoDB Connection Failed: ", error);
    process.exit(1);
  }
};

export { connectDB };
