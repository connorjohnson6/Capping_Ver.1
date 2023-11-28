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


mongoose.connect(
  keys.mongodb.dbURI,
  { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true 
  },
  () => {
      console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use('/addCarbonData', addCarbonDataRoute);
app.use('/addGoals', goalRoute);



app.listen(8800, () => {
  console.log("Backend server is running!");
});


module.exports = router;
