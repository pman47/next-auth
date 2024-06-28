import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;

    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not available.");

    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "nextAuth",
    });

    console.log(`Connected to ${connection.host}`);
  } catch (error) {
    throw new Error("Error connecting to DB.");
  }
};
