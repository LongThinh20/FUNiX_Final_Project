const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");

const jwtSignature = config.get("jwtSignature");

const auth = (roles) => async (req, res, next) => {
  try {
    let token = "";
    let isAutheticated = false;

    // const authToken = req.cookies.accessToken;

    const authToken = req.header("Authorization");

    if (!authToken) {
      // res.redirect("/auth/login");
      return res.send();
    }

    token = authToken.replace("Bearer ", "");

    const decode = jwt.verify(token, jwtSignature);

    const allowRoles = roles || ["admin", "user"];

    const foundedUser = await User.findOne({
      _id: decode._id,
      role: { $in: allowRoles }
    });

    if (!foundedUser) {
      return res.status(401).send({ message: "You are not authorized!" });
    }

    req.user = foundedUser;

    req.token = token;

    isAutheticated = true;

    res.locals.isAuth = true;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: "You are not authorized!" });
  }
};

module.exports = { auth };
