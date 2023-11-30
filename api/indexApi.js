/**
 * Main server file for an Express application.
 *
 * This script initializes an Express application, sets up middleware, connects to MongoDB,
 * and defines routes for various functionalities like user management, authentication, and posts.
 * It includes configurations for CORS, file uploading using multer, and static file serving.
 *
 * @fileoverview Express server setup and route definitions for a Node.js application.
 * @author [Connor Johnson]
 */

const express = require("express");
const app = express();
const cors = require('cors');

const mongoose = require("mongoose");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const addCarbonDataRoute = require('./routes/addCarbonData');
const goalRoute = require("./routes/addGoals");
const keys = require('../landing_Page/config/keys');
const router = express.Router();
const path = require("path");

// Enable CORS for all requests
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
      console.log("Connected to MongoDB");
  }
);

// Serve static images from the public/images directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware for parsing JSON requests
app.use(express.json());

// Multer configuration for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

// Route for file uploading
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// API route definitions
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use('/addCarbonData', addCarbonDataRoute);
app.use('/addGoals', goalRoute);

// Server listening on port 8800
app.listen(8800, () => {
  console.log("Backend server is running!");
});

// Exporting the router for use in other parts of the application
module.exports = router;