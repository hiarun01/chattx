import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error while connecting DB", error.message);
  }
};

export default connectDB;
