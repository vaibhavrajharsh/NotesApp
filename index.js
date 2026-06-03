// Root entry point for Vercel deployment
const app = require("./backend/src/app");
const connectDB = require("./backend/src/db/db");

// Connect to database
connectDB();

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
