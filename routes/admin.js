const express = require("express");

const route = express.Router();

const adminController = require("../controllers/admin");

//get charity List
route.get("/admin/charity", adminController.getCharity);

route.get("/admin/addCharity", adminController.getAddCharityForm);

route.get("/admin/addCharity/:charityId", adminController.getAddCharityForm);

route.post("/admin/addCharity", adminController.addCharity);

route.post("/admin/editCharity", adminController.editCharity);

route.post("/admin/deleteManyCharity", adminController.deleteManyCharity);

route.get("/admin/deleteManyCharity", adminController.getDeleteManyCharity);

route.post("/admin/filterCharity", adminController.filterCharity);

// route.get("/:imageName", adminController.getImage);

// route.post("/admin/123", adminController.postCharity);

// route.post("/admin/editCharity", adminController.editCharity);

module.exports = route;
