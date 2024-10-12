const express = require("express");
const app = express();
const cors = require("cors");
const tasks = require("./routes/tasks"); // Your routes for tasks
const connectDB = require("./db/connect"); // Database connection logic
require("dotenv").config(); // Load environment variables
const notFound = require("./middleware/not-found"); // Middleware for handling 404s
const errorHandlerMiddlware = require("./middleware/error-handler"); // Middleware for handling errors

// 1. Use CORS middleware to allow cross-origin requests
app.use(cors());

// 2. Middleware to serve static files
// app.use(express.static("./public"));

// 3. Middleware to parse incoming JSON requests (body parser)
app.use(express.json());

// 4. Define your routes
app.use("/api/v1/tasks", tasks); // Route for tasks

// 5. Middleware for handling 404 errors (routes not found)
app.use(notFound);

// 6. Global error handler middleware (to catch all errors)
app.use(errorHandlerMiddlware);

const port = process.env.PORT || 5000;

// Function to start the server
const start = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
