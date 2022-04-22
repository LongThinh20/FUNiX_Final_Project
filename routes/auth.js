const express = require("express");

const route = express.Router();

const authController = require("../controllers/auth");

route.get("/sigup", authController.postSigup);

route.get("/login", authController.postLogin);

module.exports = route;
