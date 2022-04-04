const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
const MONGODB_URI =
  "mongodb+srv://finalproject:123@cluster0.0kvgp.mongodb.net/FinalProject";
const PORT = 3001;
const storegeFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");

app.use(cors({ optionsSuccessStatus: 200, origin: "http://localhost:3000" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  multer({ storage: storegeFile, fileFilter: fileFilter }).single("image")
);
app.use(authRoute);
app.use(adminRoute);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connect Server");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
