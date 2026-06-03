const mongoose = require("mongoose");

// Shared state to tell if Mongoose connected successfully or if we're using file fallback
const dbState = {
  connected: false,
  usingFallback: false,
};

async function connectDB() {
  // Use MONGODB_URI environment variable for production (Vercel)
  const mongodbUri = process.env.MONGODB_URI;
  const localURI = "mongodb://127.0.0.1:27017/Spidey";

  // Try MongoDB Atlas first (via environment variable for production)
  if (mongodbUri) {
    console.log("Attempting connection to MongoDB Atlas via MONGODB_URI...");
    try {
      await mongoose.connect(mongodbUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Connected to MongoDB Atlas successfully!");
      dbState.connected = true;
      return;
    } catch (atlasErr) {
      console.warn("MongoDB Atlas connection failed.");
      console.warn(`Details: ${atlasErr.message}`);
    }
  } else {
    console.log(
      "MONGODB_URI environment variable not set. Trying local MongoDB...",
    );
  }

  // Try local MongoDB for development
  console.log(
    "Attempting connection to local MongoDB instance (mongodb://127.0.0.1:27017)...",
  );
  try {
    await mongoose.connect(localURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log("Connected to local MongoDB instance successfully!");
    dbState.connected = true;
    return;
  } catch (localErr) {
    console.warn("Local MongoDB instance connection also failed.");
    console.log(
      "Activating File-backed Database Fallback (notes_db_fallback.json)...",
    );
    dbState.usingFallback = true;
  }
}

module.exports = connectDB;
module.exports.dbState = dbState;
