require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");

// static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// connectDB
const connectDB = require("./db/connectDB");

// router
const bookRouter = require("./routes/main");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Parse JSON middleware
app.use(express.json());

// routes
app.use("/api/v1/book", bookRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
