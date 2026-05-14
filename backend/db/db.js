import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected!!!");
    console.log("DB:", conn.connection.name);
    console.log("HOST:", conn.connection.host);
  } catch (error) {
    console.error("Mongo Error:", error.message);
  }
};

export default connectDB;
