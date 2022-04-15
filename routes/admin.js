const express = require("express");
const { body, check } = require("express-validator");

const route = express.Router();

const adminController = require("../controllers/admin");

//get charity List
route.get("/admin/charity", adminController.getCharity);

route.get("/admin/addCharity", adminController.getAddCharityForm);

route.get("/admin/addCharity/:charityId", adminController.getAddCharityForm);

route.post(
  "/admin/addCharity",
  body("title")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhập tiêu đề lớn hơn 3 ký tự"),
  body("summary")
    .trim()
    .isString()
    .isLength({ min: 3, max: 400 })
    .withMessage("Nhập tóm tắt từ  3 - 400 ký tự !"),
  body("content")
    .trim()
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Nhập nội dung từ 3 - 400 ký tự !"),
  body("organization")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhân tên tổ chức / quỹ từ thiện từ 3 ký tự trở lên !"),
  body("startDate").isDate().withMessage("Ngày bắt đầu chưa hợp lệ !"),
  check("expectedMoney")
    .notEmpty()
    .isNumeric()
    .custom((value, { req }) => {
      if (value < 5000000) {
        throw new Error("Nhập số  tiền quyên góp tối thiểu là 5 triệu !");
      }
      return true;
    }),
  adminController.addCharity
);

route.post(
  "/admin/editCharity",
  body("title")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhập tiêu đề lớn hơn 3 ký tự"),
  body("summary")
    .trim()
    .isString()
    .isLength({ min: 3, max: 400 })
    .withMessage("Nhập tóm tắt từ  3 - 400 ký tự !"),
  body("content")
    .trim()
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Nhập nội dung từ 3 - 400 ký tự !"),
  body("organization")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Nhân tên tổ chức / quỹ từ thiện từ 3 ký tự trở lên !"),
  body("startDate").isDate().withMessage("Ngày bắt đầu chưa hợp lệ !"),
  check("expectedMoney")
    .notEmpty()
    .isNumeric()
    .custom((value, { req }) => {
      if (value < 5000000) {
        throw new Error("Nhập số  tiền quyên góp tối thiểu là 5 triệu !");
      }
      return true;
    }),
  adminController.editCharity
);

route.post("/admin/deleteManyCharity", adminController.deleteManyCharity);

route.get("/admin/deleteManyCharity", adminController.getDeleteManyCharity);

route.post("/admin/filterCharity", adminController.filterCharity);

// route.get("/:imageName", adminController.getImage);

// route.post("/admin/123", adminController.postCharity);

// route.post("/admin/editCharity", adminController.editCharity);

module.exports = route;
