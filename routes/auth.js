const express = require("express");

const route = express.Router();

const authController = require("../controllers/auth");

const { auth } = require("../helpers/auth");

route.get("/me", auth(), authController.getMe);

route.get("/login", authController.getLogin);

route.get("/sigup", authController.postSigup);

route.post("/login", authController.postLogin);

route.post("/logout", auth(), authController.postLogout);

route.post("/resetToken", authController.resetToken);

//
module.exports = route;
