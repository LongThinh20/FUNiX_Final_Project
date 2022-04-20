const express = require("express");

const upload = require("../controllers/upload");

const route = express.Router();

route.get(":imageName", upload.getImage);

module.exports = route;
