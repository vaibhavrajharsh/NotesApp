//server.js used to start the server
const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

// Only listen if this file is run directly (not imported)
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

module.exports = app;
