import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

try {
  mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}/chatApp`);
  console.log("Connected to MongoDb Server");
} catch (error) {
  console.log("Error occoured while connection to mongodb");
}

export default mongoose.connection;
