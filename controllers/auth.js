const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.postSigup = (req, res, next) => {
  // const userName = req.body.name;
  // const password = req.body.password;

  const password = "123";

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      console.log(hashPassword);
      const newUser = new User({
        name: "DUONG DUY KHIEM",
        phoneNumber: "01234538016",
        password: hashPassword,
        role: "user",
        charityList: []
      });
      return newUser.save();
    })
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
