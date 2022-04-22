const Charity = require("../models/charity");
const moment = require("moment");
const { validationResult } = require("express-validator");

const deleteFile = require("../utils/deleteFile");

const Methods = require("../utils/method");

const ITEMS_PER_PAGE = 3;

//get all
const getAllCharity = async (req, res) => {
  try {
    const charity = await Charity.find();
    res.send(charity);
  } catch (err) {
    console.err(err);
  }
};

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

  let isEdit = false;

  if (charityId) {
    charity = await Charity.findById(charityId.trim());
    isEdit = true;
    if (!charity) {
      return getCharity(req, res, "Không tìm thấy chương trình !", "warning");
    }
  }
  res.render("charityManager/addCharityPage", {
    title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
    charity: charity,
    moment,
    isEdit: isEdit,
    hasError: false,
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("charityManager/addCharityPage", {
      title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
      charity: {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        expectedMoney: expectedMoney,
        organization: organization.trim(),
        startDate: startDate,
        endDate: endDate
      },
      moment,
      isEdit: false,
      hasError: true,
      error: errors.array()
    });
  }

  if (!imageFile) {
    return res.render("charityManager/addCharityPage", {
      title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
      charity: {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        expectedMoney: expectedMoney,
        organization: organization.trim(),
        startDate: startDate,
        endDate: endDate
      },
      moment,
      isEdit: false,
      hasError: true,
      error: "Hình ảnh không hợp lệ "
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

    res.send(result);

    res.redirect("/admin/charity");
  } catch (err) {
    console.error(err.message);
    // res.status(500).send({ err: err.message });
  }
};

//POST /admin/editCharity
const editCharity = async (req, res) => {
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

  let checkEditImage = false;

  const foundedCharity = await Charity.findById(id.trim());
  if (!foundedCharity) {
    return res.send({ message: "Charity is not found !" });
  }

  if (req.file) {
    image = req.file.path;
    checkEditImage = true;
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("charityManager/addCharityPage", {
      title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN",
      charity: {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        image: image,
        expectedMoney: expectedMoney,
        organization: organization.trim()
      },
      moment,
      isEdit: true,
      hasError: true,
      error: errors.array()
    });
  }

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

  try {
    const filter = { _id: id };

    let result = await Charity.findOneAndUpdate(filter, objEdit);

    if (checkEditImage) {
      await deleteFile(foundedCharity.image);
    }

    res.redirect("/admin/charity");
    res.send(result);
  } catch (err) {
    console.error(err.message);
  }
};

//DELETE /admin / deleteManyCharity
const deleteManyCharity = async (req, res) => {
  const { checkDelete } = req.body;
  try {
    if (checkDelete === undefined) {
      return getCharity(req, res, "Chưa chọn đối tượng để xóa !", "warning");
    }

    if (Array.isArray(checkDelete)) {
      await Methods.deleteMany(checkDelete);
    } else {
      await Methods.deleteOne(checkDelete);
    }

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

const deleteOneCharity = async (req, res) => {
  const { charityId } = req.params;

  const founderCharity = await Charity.findById(charityId.trim());

  if (!founderCharity) {
    return res.status(400).send({ message: "Charity is not exist!" });
  }

  const result = await Charity.deleteOne({ _id: charityId.trim() });

  deleteFile(founderCharity.image);

  res.send(result);
};

//POST /admin/ filterCharity
const filterCharity = async (req, res) => {
  const { status, expectedMoney } = req.body;
  let result = [];
  try {
    if (!status && !expectedMoney) {
      return getCharity(req, res, "Chưa chọn điều kiện lọc!", "warning");
    }
    if (!expectedMoney) result = await Charity.find({ status: status });
    if (!status) {
      result = await Methods.handleFilterWithMoney(expectedMoney);
    }
    if (status && expectedMoney) {
      result = await Methods.handleFilterAll(expectedMoney, status);
    }
    res.render("charityManager/filterPage", {
      charities: result,
      moment,
      title: "QUẢN LÝ CHƯƠNG TRÌNH QUYÊN GÓP"
    });
  } catch (err) {
    console.err(err);
  }
};

module.exports = {
  addCharity,
  editCharity,
  getAddCharityForm,
  getCharity,
  deleteManyCharity,
  deleteOneCharity,
  getDeleteManyCharity,
  filterCharity,
  getAllCharity
};
