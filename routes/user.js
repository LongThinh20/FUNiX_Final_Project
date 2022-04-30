const express = require("express");
const { body } = require("express-validator");

const route = express.Router();

const userController = require("../controllers/user");
const { auth } = require("../helpers/auth");

route.get("/allUser", userController.getAllUser);

route.get("/user", auth(["admin"]), userController.getUser);

route.get("/addUser", userController.getAddUserForm);

route.get("/addUser/:userId", userController.getAddUserForm);

route.post(
  "/addUser",
  body("userName")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhập tên người dùng ít nhất 3 ký tự..!"),
  body("name")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhập họ tên ít nhất 3 ký tự ...!"),
  body("email").trim().isEmail().withMessage("Chưa nhập email..!"),
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
    .isLength({ min: 3, max: 10 })
    .withMessage("Nhập mật khẩu từ 3 đến 10 ký tự ...! "),

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

route.get("/deleteUser/:userId", userController.deleteUser);

route.get("/filterUser", userController.filterUser);

route.get("/resetPassword/:userId", userController.resetPassword);

module.exports = route;
