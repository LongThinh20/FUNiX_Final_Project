const Charity = require("../models/charity");
const moment = require("moment");

const ITEMS_PER_PAGE = 3;
let errorMess = "";

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
    console.error(err.message);
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
    moment,
    error: ""
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
      title: title.trim(),
      summary: summary.trim(),
      image,
      content: content.trim(),
      expectedMoney,
      status,
      date: new Date(),
      userId: null,
      startDate,
      endDate,
      organization
    });

    const result = await newCharity.save();

    console.log(result);

    console.log("POST CHARITY!");

    res.redirect("/admin/charity");

    // res.status(201).send(result);
  } catch (err) {
    console.error(err.message);
    res.render("charityManager/addCharityPage", {
      title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
      charity: "",
      moment,
      error: err.message
    });
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

  let image = req.body.image;

  if (image) {
    image = req.file.path;
  }

  try {
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
  } catch (err) {
    console.error(err.message);
  }
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
    console.log(checkDelete);

    async function deleteOne(item) {
      const result = await Charity.deleteOne({ _id: item });
      console.log("XÓA THÀNH CÔNG !");
      res.redirect("/admin/charity");
    }

    async function deleteMany(array) {
      let flag = true;
      for (let i of array) {
        const fl = await Charity.findById(i.trim());
        if (!fl) flag = false;
      }

      if (!flag) {
        res.redirect("/admin/charity");
        throw new Error("XÓA KHÔNG THÀNH CÔNG !!!");
      }
      const result = await Charity.deleteMany({ _id: array });
      console.log("XÓA THÀNH CÔNG !");
      res.redirect("/admin/charity");
    }

    async function testt(array) {
      if (Array.isArray(array)) {
        deleteMany(array);
      } else {
        deleteOne(array);
      }
    }

    testt(checkDelete);
  } catch (err) {
    console.error(err);
  }
};

//POST /admin/ filterCharity

const filterCharity = async (req, res) => {
  const { status, expectedMoney, resetButton } = req.body;
  let result;
  let charities;

  try {
    if (!expectedMoney) result = await Charity.find({ status: status });

    if (!status) {
      switch (expectedMoney) {
        case "1":
          console.log("1");
          console.log(
            await Charity.find({
              expectedMoney: { $lte: 50000000 - 1 }
            })
          );
          break;
        case "2":
          result = await Charity.find({
            expectedMoney: { $gte: 50000000, $lte: 200000000 }
          });
          break;
        default:
          result = await Charity.find({
            expectedMoney: { $gte: 200000000 + 1 }
          });
          break;
      }
    }

    if (status && expectedMoney) {
      switch (expectedMoney) {
        case "1":
          console.log("1");
          result = await Charity.find({
            status: status,
            expectedMoney: { $lte: 50000000 - 1 }
          });

          break;
        case "2":
          result = await Charity.find({
            status: status,
            expectedMoney: { $gte: 50000000, $lte: 200000000 }
          });
          break;
        default:
          result = await Charity.find({
            status: status,
            expectedMoney: { $gte: 200000000 + 1 }
          });
          break;
      }
    }

    //

    if (resetButton) {
      return res.redirect("/admin/charity");
    }

    res.render("charityManager/filterPage", {
      charities: result,
      moment,
      title: "QUẢN LÝ CHƯƠNG TRÌNH QUYÊN GÓP"
    });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// exports.getImage = (req, res) => {
//   const fileName = req.params.imageName;

//   res.sendFile(path.resolve(`./images/${fileName}`));
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
