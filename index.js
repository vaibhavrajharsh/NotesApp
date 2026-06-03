// Root entry point for Vercel deployment
const app = require("./backend/src/app");
const connectDB = require("./backend/src/db/db");

// Initialize database and start listening
async function startServer() {
  try {
    // Connect to database
    await connectDB();
    console.log("Database connection attempt completed");
  } catch (err) {
    console.error("Database connection error:", err.message);
    // Continue even if DB connection fails (fallback enabled)
  }

  // For local development only
  if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

// Start the server
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

// Export app for Vercel serverless
module.exports = app;
