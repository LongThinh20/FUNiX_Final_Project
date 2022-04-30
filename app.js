const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const config = require("config");

const cookieParser = require("cookie-parser");

const app = express();

const router = require("./routes/index");

const MONGODB_URI = config.get("dbUrl");
const PORT = config.get("port");

const storegeFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
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

const imagesFolderPath = path.join(__dirname, "images");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(imagesFolderPath));

app.use(
  multer({ storage: storegeFile, fileFilter: fileFilter }).single("image")
);

router(app);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connect Server");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
