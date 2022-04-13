const Charity = require("../models/charity");
const moment = require("moment");

const ITEMS_PER_PAGE = 3;

//GET / admin / getCharity;
const getCharity = async (req, res, mess = "", status = "") => {
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
      message: mess,
      status: status,
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

  const imageFile = req.file;

  if (!imageFile) {
    res.render("charityManager/addCharityPage", {
      title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
      charity: "",
      moment,
      error: "Thêm không thành công ! "
    });
  }

  const image = imageFile.path;

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

    console.log("POST CHARITY!");

    res.redirect("/admin/charity");

    // res.status(201).send(result);
  } catch (err) {
    console.error(err.message);
    res.render("charityManager/addCharityPage", {
      title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
      charity: "",
      moment,
      error: "Thêm không thành công"
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

//DELETE /admin / deleteManyCharity
const deleteManyCharity = async (req, res) => {
  const { checkDelete } = req.body;
  try {
    // console.log(checkDelete);

    if (checkDelete === undefined) {
      getCharity(req, res, "Xóa không thành công", "fail");
    }

    async function deleteOne(item) {
      const result = await Charity.deleteOne({ _id: item });
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
    }

    async function handleDelete(array) {
      if (Array.isArray(array)) {
        deleteMany(array);
      } else {
        deleteOne(array);
      }
    }
    handleDelete(checkDelete);

    getCharity(req, res, "Xóa thành công", "success");
  } catch (err) {
    console.error(err.message);
  }
};

const getDeleteManyCharity = async (req, res) => {
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
      message: "",
      status: "",
      title: "QUẢN LÝ CHƯƠNG TRÌNH QUYÊN GÓP",
      currentPage: page,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  } catch (err) {
    console.error(err.message);
  }
};

//POST /admin/ filterCharity

const filterCharity = async (req, res) => {
  const { status, expectedMoney, resetButton } = req.body;
  let result = [];

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

    if (resetButton) {
      return res.redirect("/admin/charity");
    }
    res.render("charityManager/filterPage", {
      charities: result,
      moment,
      title: "QUẢN LÝ CHƯƠNG TRÌNH QUYÊN GÓP"
    });
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
  deleteManyCharity,
  getDeleteManyCharity,
  filterCharity
};
