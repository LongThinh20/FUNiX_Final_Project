const express = require("express");
const { body } = require("express-validator");

const route = express.Router();

const userController = require("../controllers/user");

route.get("/user", userController.getUser);

route.get("/addUser", userController.getAddUserForm);

route.get("/addUser/:userId", userController.getAddUserForm);

route.post(
  "/addUser",
  body("userName")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("userName"),
  body("name").trim().isString().isLength({ min: 3 }).withMessage("name"),
  body("email").trim().isEmail().withMessage("email"),
  body("phone")
    .trim()
    .custom((value, { req }) => {
      if (!/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(value)) {
        throw new Error("Số điện thoại không hợp lệ!");
      }

      return true;
    }),
  body("password")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("password"),

  userController.addUser
);
route.post(
  "/editUser",
  body("name").trim().isString().isLength({ min: 3 }).withMessage("name"),
  body("email").trim().isEmail().withMessage("email"),
  body("phone")
    .trim()
    .custom((value, { req }) => {
      if (!/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(value)) {
        throw new Error("Số điện thoại không hợp lệ!");
      }

      return true;
    }),
  userController.editUser
);

route.post("/deleteUser/:userId", userController.deleteUser);

route.get("/filterUser", userController.filterUser);

module.exports = route;
