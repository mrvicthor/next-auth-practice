import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export default connectToDatabase;
