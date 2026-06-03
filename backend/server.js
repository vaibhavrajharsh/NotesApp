//server.js used to start the server
const app = require("./src/app");
const connectDB = require("./src/db/db");

// Initialize database and start listening
async function startServer() {
  try {
    await connectDB();
    console.log("Database connection attempt completed");
  } catch (err) {
    console.error("Database connection error:", err.message);
    // Continue even if DB connection fails (fallback enabled)
  }

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

// Start the server when run directly
if (require.main === module) {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}

module.exports = app;
