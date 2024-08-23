import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_DB_URL);

    if (connection) console.log(`Connected To DB: ${connection.host}`);
  } catch (error) {
    console.log("Error in DB Connection", error);
    process.exit(1);
  }
};

export default connectToDB;
