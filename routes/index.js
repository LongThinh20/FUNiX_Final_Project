const charity = require("./charity");
const user = require("./user");
const upload = require("./upload");
const auth = require("./auth");

function router(app) {
  app.use("/auth", auth);
  app.use("/admin", charity);
  app.use("/admin", user);
  app.use("/", upload);
}

module.exports = router;
