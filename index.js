// Root entry point for Vercel deployment
const express = require("express"); // Required for Vercel to recognize this as Express entry point
const app = require("./backend/src/app");
const connectDB = require("./backend/src/db/db");

// Initialize database connection (don't block on it)
connectDB().catch((err) => {
  console.error("Database connection error:", err.message);
  // Continue anyway - fallback storage is enabled
});

// Export the Express app for Vercel serverless functions
module.exports = app;
