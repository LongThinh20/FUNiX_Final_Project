const charity = require("./charity");
const user = require("./user");
const upload = require("./upload");
const auth = require("./auth");
const home = require("./home");

function router(app) {
  app.use((req, res, next) => {
    res.locals.isAuth = false;
    next();
  });
  app.use("", home);
  app.use("/auth", auth);
  app.use("/admin", charity);
  app.use("/admin", user);
  app.use("/", upload);
}

module.exports = router;
