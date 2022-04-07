const express = require("express");

const route = express.Router();

const adminController = require("../controllers/admin");

// route.get("/admin/post", adminController.postOrganizationTest);

// route.get("/admin/post1", adminController.postCharityTest);

//test

route.get("/admin/charity", adminController.getCharity);
route.get("/admin/addCharity", adminController.addCharityForm);

// route.get("/organization", adminController.getOrganizaion);

// route.get("/:imageName", adminController.getImage);

// route.post("/admin/123", adminController.postCharity);

// route.delete("/admin/delete123", adminController.deleteCharity);

// route.post("/admin/editCharity", adminController.editCharity);

module.exports = route;
