const md5 = require("md5");
const { validationResult } = require("express-validator");
const sgmail = require("@sendgrid/mail");
const config = require("config");

const sgAPIKey = config.get("sgAPIKey");

sgmail.setApiKey(sgAPIKey);

const User = require("../models/user");

const ITEMS_PER_PAGE = 3;

const getUser = async (req, res, mess = "", status = "") => {
  try {
    const users = await User.find().select("-password");

    res.render("userManager/userManagerPage", {
      title: "DANH SÁCH NGƯỜI DÙNG",
      users
    });
  } catch (err) {
    console.error(err);
  }
};

const getAddUserForm = async (req, res) => {
  const { userId } = req.params;
  let user;
  let checkEdit = false;

  if (userId) {
    user = await User.findById(userId.trim());
    checkEdit = true;
    if (!user) {
      res.redirect("/admin/user");
    }
  }

  res.render("userManager/addUserPage", {
    title: "THÊM NGƯỜI DÙNG",
    user: user,
    error: "",
    isEdit: checkEdit,
    hasError: ""
  });
};

const addUser = async (req, res) => {
  const { name, userName, email, phone, role, password } = req.body;
  let newPassword;

  console.log(role);

  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.render("userManager/addUserPage", {
        title: " THÊM CHƯƠNG NGƯỜI DÙNG",
        user: { userName, name, email, password, phone, role },
        isEdit: false,
        hasError: true,
        error: errors.array()
      });
    }

    const foundedUser = await User.findOne().or({ userName }, { email });

    if (foundedUser) {
      return res.render("userManager/addUserPage", {
        title: " THÊM CHƯƠNG NGƯỜI DÙNG",
        user: { userName, name, email, password, phone, role },
        isEdit: false,
        hasError: true,
        error: "Người dùng đã tồn tại !"
      });
    }

    if (password) {
      newPassword = md5(password);
    }

    const newUser = new User({
      name,
      userName,
      email,
      phone,
      role,
      password: newPassword
    });

    const result = await newUser.save();

    console.log(result);

    res.redirect("/admin/user");

    console.log("POST USER");
  } catch (err) {
    console.error(err);
  }
};

const editUser = async (req, res) => {
  const { id, name, email, phone, role } = req.body;

  const errors = validationResult(req);

  try {
    const foundedUser = await User.findById(id.trim());

    if (!foundedUser) {
      return res.redirect("/admin/user");
    }

    if (!errors.isEmpty()) {
      return res.render("userManager/addUserPage", {
        title: " CẬP NHẬT NGƯỜI DÙNG",
        user: { name, email, phone, _id: id, role },
        isEdit: true,
        hasError: true,
        error: errors.array()
      });
    }

    if (foundedUser.role === "admin" && role !== "admin") {
      return res.render("userManager/addUserPage", {
        title: " CẬP NHẬT NGƯỜI DÙNG",
        user: { _id: id, name, email, phone },
        isEdit: true,
        hasError: true,
        error: "Không thay đổi Admin thành User !"
      });
    }

    const objEdit = {
      name,
      email,
      role,
      phone
    };

    const filter = { _id: id.trim() };

    let result = await User.findOneAndUpdate(filter, objEdit);

    res.redirect("/admin/user");
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundedUser = await User.findById(userId.trim());

    if (!foundedUser) {
      throw new Error("Không tồn tại!");
    }

    if (foundedUser.role === "admin") {
      throw new Error("Không thể xóa admin");
    }

    const resut = await User.deleteOne({ _id: userId });

    res.redirect("/admin/user");
  } catch (err) {
    console.error(err);
  }
};

const filterUser = async (req, res) => {
  const { userName, phone } = req.query;
  try {
    const resutl = await User.find({
      $or: [
        { userName: { $regex: `^${userName}` }, phone: { $regex: `^${phone}` } }
      ]
    }).select("-_id");

    res.render("userManager/userManagerPage", {
      title: "DANH SÁCH NGƯỜI DÙNG",
      users: resutl
    });
  } catch (err) {
    console.error(err);
  }
};

const resetPassword = async (req, res) => {
  const { userId } = req.params;

  let newPassword = "";

  let checkPassword;

  function ramdomTest() {
    return Math.floor(Math.random() * 1001);
  }

  try {
    const foundedUser = await User.findById(userId.trim());

    if (!foundedUser) {
      throw new Error("User is not exist!");
    }

    do {
      newPassword = ramdomTest();
      checkPassword = await User.findOne({ password: md5(newPassword) });
    } while (checkPassword);

    const objEdit = {
      password: md5(newPassword)
    };

    const filter = { _id: userId.trim() };

    let result = await User.findOneAndUpdate(filter, objEdit);

    sgmail
      .send({
        from: "toihoclaptrinh20@outlook.com",
        to: foundedUser.email,
        subject: "welcom!",
        html: `<h1>Mật khẩu mới:${md5(newPassword)}</h1>`
      })
      .then((res) => console.log("success!"))
      .catch((err) => console.log(err));

    res.redirect("/admin/user");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getUser,
  getAddUserForm,
  addUser,
  editUser,
  deleteUser,
  filterUser,
  resetPassword
};
