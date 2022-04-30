const bcrypt = require("bcryptjs");
const md5 = require("md5");
const config = require("config");
const jwt = require("jsonwebtoken");

const jwtSignature = config.get("jwtSignature");

const User = require("../models/user");

const postSigup = (req, res, next) => {
  // const userName = req.body.name;
  // const password = req.body.password;

  console.log("123");

  const password = "123";

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      console.log(hashPassword);
      const newUser = new User({
        name: "test4",
        email: "test4@gmail.com",
        phone: "084787654",
        password: hashPassword,
        role: "user",
        status: false
      });
      return newUser.save();
    })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getLogin = (req, res, mess = "") => {
  res.render("auth/login", {
    title: "ĐĂNG NHẬP",
    messError: mess
  });
};

const postLogin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const foundedUser = await User.findOne({
      userName: userName,
      password: md5(password)
    });

    if (!foundedUser) {
      getLogin(req, res, "Tên đăng nhập hoặc mật khẩu không đúng ! ");
      throw new Error("Tên người dùng hoặc mật khẩu không đúng");
    }
    const accessToken = await jwt.sign(
      {
        _id: foundedUser._id
      },
      jwtSignature,
      { expiresIn: "20s" }
    );

    const refreshToken = await jwt.sign(
      {
        _id: foundedUser._id
      },
      jwtSignature
    );

    foundedUser.tokens.push(refreshToken);

    await foundedUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      secure: false,
      sameSite: "strict"
    });

    // if (foundedUser.role === "admin") return res.redirect("/admin/charity");

    console.log("LOGIN SUCCESS!");

    res.status(200).send(accessToken);

    // res.status(200).send({ message: "LOGIN SUCCESS!" });
  } catch (err) {
    console.log(err);
  }
};

const getMe = async (req, res) => {
  const result = req.user.toJSON();
  res.send(result);
};

const postLogout = async (req, res) => {
  res.clearCookie("accessToken");

  const index = req.user.tokens.findIndex(
    (token) => token === req.cookies.accessToken
  );

  req.user.tokens.splice(index, 1);

  await req.user.save();

  res.redirect("/");

  res.send();
};

const resetToken = async (req, res) => {
  const rfToken = req.cookies.refreshToken;

  const decode = jwt.verify(rfToken, jwtSignature);

  const foundedUser = await User.findOne({
    _id: decode._id
  });
  if (!foundedUser) {
    return res.status(401).send({ message: "You are not authorized!" });
  }

  const newAccessToken = await jwt.sign(
    {
      _id: foundedUser._id
    },
    jwtSignature,
    { expiresIn: "20s" }
  );

  const newRefreshToken = await jwt.sign(
    {
      _id: foundedUser._id
    },
    jwtSignature
  );

  const index = foundedUser.tokens.findIndex((token) => token === rfToken);

  foundedUser.tokens.splice(index, 1);

  foundedUser.tokens.push(newRefreshToken);

  await foundedUser.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "strict"
  });

  res.send(newAccessToken);
};

module.exports = {
  postSigup,
  getLogin,
  postLogin,
  postLogout,
  getMe,
  resetToken
};
