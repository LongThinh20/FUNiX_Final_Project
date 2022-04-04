const express = require("express");

const route = express.Router();

const authController = require("../controllers/auth");

route.get("/sigup", authController.postSigup);

module.exports = route;
