require("dotenv").config();
// async errors
require("express-async-errors");
const cors = require("cors");

const path = require("path");

const express = require("express");
const app = express();

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, "public")));

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

const notFoundMiddlware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(
    '<h1>Store API</h1><a href="/api/v1/products">products route</a></a>'
  );
});

app.use("/api/v1/products", productRouter);

// products route

app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (req, res) => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
