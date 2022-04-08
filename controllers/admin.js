const Charity = require("../models/charity");
const mongoose = require("mongoose");
const path = require("path");
const moment = require("moment");

const ITEMS_PER_PAGE = 3;

//GET / admin / getCharity;
const getCharity = async (req, res) => {
  const page = +req.query.page || 1;
  let totalItems;
  try {
    totalItems = await Charity.find().countDocuments();
    const charities = await Charity.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.render("charityManager/charityManagerPage", {
      charities,
      moment,
      title: "QUẢN LÝ CHƯƠNG TRÌNH QUYÊN GÓP",
      currentPage: page,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  } catch (err) {
    console.error(err);
  }
};

//GET /admin/addCharity
const getAddCharityForm = async (req, res) => {
  const { charityId } = req.params;
  let charity;

  if (charityId) {
    charity = await Charity.findById(charityId.trim());
  }

  res.render("charityManager/addCharityPage", {
    title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
    charity: charity,
    moment
  });
};

//POST /admin/postCharity
const addCharity = async (req, res) => {
  const {
    title,
    summary,
    content,
    expectedMoney,
    status,
    startDate,
    endDate,
    organization
  } = req.body;
  const image = req.file.path;
  try {
    const newCharity = new Charity({
      title,
      summary,
      image,
      content,
      expectedMoney,
      status,
      date: new Date(),
      userId: null,
      startDate,
      endDate,
      organization
    });

    const result = await newCharity.save();
    console.log("POST CHARITY!");

    res.redirect("/admin/charity");

    // res.status(201).send(result);
  } catch (err) {
    console.error(err);
  }
};

//POST /admin/editCharity

const editCharity = (req, res) => {
  const {
    id,
    title,
    summary,
    content,
    expectedMoney,
    status,
    startDate,
    endDate,
    organization
  } = req.body;

  const image = req.file.path;

  const objEdit = {
    title,
    image,
    summary,
    content,
    expectedMoney,
    status,
    startDate,
    endDate,
    organization
  };

  Charity.findByIdAndUpdate({ _id: id }, objEdit, (result) => {
    res.redirect("/admin/charity");
  });
};

// DELETE / admin / deleteCharity;
const deleteCharity = async (req, res) => {
  const { charityId } = req.body;

  try {
    const result = await Charity.findByIdAndDelete(charityId.trim());

    res.redirect("/admin/charity");

    console.log("DELETE CHARITY!");

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

//DELETE /admin / deleteManyCharity
const deleteManyCharity = async (req, res) => {
  const { checkDelete } = req.body;

  try {
    const result = await Charity.deleteMany({ _id: checkDelete });

    console.log("DELETE MANY CHARITY !");

    res.redirect("/admin/charity");
  } catch (err) {
    console.error(err);
  }
};

//POST /admin/ filterCharity

const filterCharity = async (req, res) => {
  const { status, expectedMoney } = req.body;
  let test1;

  try {
    const test = await Charity.find({
      status: status
    });

    if (expectedMoney === "1") {
      test1 = await Charity.find({
        expectedMoney: { $lte: 50000000 }
      });
    }

    if (expectedMoney === "2") {
      test1 = await Charity.find({
        expectedMoney: { $gte: 50000001, $lte: 200000000 }
      });
    }
    if (expectedMoney === "3") {
      test1 = await Charity.find({
        expectedMoney: { $gte: 200000001 }
      });
    }

    console.log(test1);
  } catch (err) {
    console.log(err);
  }
};

// exports.getImage = (req, res) => {
//   const fileName = req.params.imageName;

//   res.sendFile(path.resolve(`./images/${fileName}`));
// };

//POST /admin/editCharity
// exports.editCharity = (req, res) => {
//   const {
//     id,
//     name,
//     expectedMoney,
//     description,
//     startDate,
//     endDate,
//     organizationId
//   } = req.body;
//   const image = req.file.path;

//   Charity.findById(id)
//     .then((result) => {
//       deleteFile(result.image);
//     })
//     .catch((err) => console.log(err));

//   const objUpdate = {
//     name,
//     expectedMoney,
//     image,
//     description,
//     ExpDate: {
//       startDate: new Date(startDate),
//       endDate: new Date(endDate)
//     },
//     organizationId: [mongoose.Types.ObjectId(organizationId.trim())]
//   };

//   Charity.findByIdAndUpdate({ _id: id }, objUpdate, (result) => {
//     res.send(result);
//   });
// };

module.exports = {
  addCharity,
  editCharity,
  getAddCharityForm,
  getCharity,
  deleteCharity,
  deleteManyCharity,
  filterCharity
};
