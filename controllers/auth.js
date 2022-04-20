const bcrypt = require("bcryptjs");

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

module.exports = { postSigup };
