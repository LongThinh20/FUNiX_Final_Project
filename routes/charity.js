const express = require("express");
const { body } = require("express-validator");

const route = express.Router();

const charityController = require("../controllers/charity");

route.get("/allCharity", charityController.getAllCharity);

route.get("/charity", charityController.getCharity);

route.get("/addCharity", charityController.getAddCharityForm);

route.get("/addCharity/:charityId", charityController.getAddCharityForm);

route.post(
  "/addCharity",
  body("title")
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Nhập tiêu đề lớn hơn 10 ký tự"),
  body("summary")
    .trim()
    .isString()
    .isLength({ min: 10, max: 500 })
    .withMessage("Nhập tóm tắt từ  10 - 500 ký tự !"),
  body("content")
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Nhập nội dung ít nhất 10 ký tự"),
  body("organization")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhân tên tổ chức / quỹ từ thiện từ 3 ký tự trở lên !"),
  // body("endDate").custom((value, { req }) => {
  //   if (req.body.startDate >= value) {
  //     throw new Error("Ngày kết thúc phải lớn hơn ngày bắt đầu !");
  //   }
  //   return true;
  // }),
  body("expectedMoney").custom((value, { req }) => {
    if (value < 5000000) {
      throw new Error("Nhập số  tiền quyên góp tối thiểu là 5 triệu !");
    }
    return true;
  }),
  charityController.addCharity
);

route.post(
  "/editCharity",
  body("title")
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Nhập tiêu đề lớn hơn 10 ký tự"),
  body("summary")
    .trim()
    .isString()
    .isLength({ min: 10, max: 500 })
    .withMessage("Nhập tóm tắt từ  10 - 500 ký tự !"),
  body("content")
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Nhập nội dung tối thiểu 10 ký tự !"),
  body("endDate").custom((value, { req }) => {
    if (req.body.startDate >= value) {
      throw new Error("Ngày kết thúc phải lớn hơn ngày bắt đầu !");
    }
    return true;
  }),
  body("organization")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhân tên tổ chức / quỹ từ thiện từ 3 ký tự trở lên !"),
  body("expectedMoney")
    .notEmpty()
    .isNumeric()
    .custom((value, { req }) => {
      if (value < 5000000) {
        throw new Error("Nhập số  tiền quyên góp tối thiểu là 5 triệu !");
      }
      return true;
    }),
  charityController.editCharity
);

route.post("/deleteManyCharity", charityController.deleteManyCharity);

route.delete(
  "/deleteOneCharity/:charityId",
  charityController.deleteOneCharity
);

route.get("/deleteManyCharity", charityController.getDeleteManyCharity);

route.post("/filterCharity", charityController.filterCharity);

module.exports = route;
