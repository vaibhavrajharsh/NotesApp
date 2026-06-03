const mongoose = require("mongoose");

// Shared state to tell if Mongoose connected successfully or if we're using file fallback
const dbState = {
  connected: false,
  usingFallback: false,
};

async function connectDB() {
  const atlasURI =
    "mongodb+srv://harshrajj8804_db_user:Harsh0987@milkyway.tb5apzu.mongodb.net/Spidey";
  const localURI = "mongodb://127.0.0.1:27017/Spidey";

  console.log("Attempting connection to MongoDB Atlas...");
  try {
    await mongoose.connect(atlasURI, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log("Connected to MongoDB Atlas successfully!");
    dbState.connected = true;
    return;
  } catch (atlasErr) {
    console.warn(
      "MongoDB Atlas connection failed (likely due to SSL network issue or IP Whitelist restrictions).",
    );
    console.warn(`Details: ${atlasErr.message}`);

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
        "Activating premium File-backed Database Fallback (notes_db_fallback.json)...",
      );
      dbState.usingFallback = true;
    }
  }
}

module.exports = connectDB;
module.exports.dbState = dbState;
