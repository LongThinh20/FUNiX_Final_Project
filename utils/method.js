const Charity = require("../models/charity");
const deleteFile = require("./deleteFile");

class Methods {
  handleFilterAll = async (expectedMoney, status) => {
    switch (expectedMoney) {
      case "1":
        return await Charity.find({
          status: status,
          expectedMoney: { $lte: 50000000 - 1 }
        });

      case "2":
        return await Charity.find({
          status: status,
          expectedMoney: { $gte: 50000000, $lte: 200000000 }
        });

      default:
        return await Charity.find({
          status: status,
          expectedMoney: { $gte: 200000000 + 1 }
        });
    }
  };
  handleFilterWithMoney = async (expectedMoney) => {
    switch (expectedMoney) {
      case "1":
        return await Charity.find({
          expectedMoney: { $lte: 50000000 - 1 }
        });

      case "2":
        return await Charity.find({
          expectedMoney: { $gte: 50000000, $lte: 200000000 }
        });

      default:
        return await Charity.find({
          expectedMoney: { $gte: 200000000 + 1 }
        });
    }
  };

  deleteOne = async (item) => {
    const charity = await Charity.find({ _id: item });
    await deleteFile(charity[0].image);
    const result = await Charity.deleteOne({ _id: item });
  };
  deleteMany = async (array) => {
    let isCheck = true;
    for (let i of array) {
      const foundedCharity = await Charity.findById(i.trim());
      if (!foundedCharity) isCheck = false;
    }

    if (!isCheck) {
      return getCharity(req, res, "Xóa không thành công!", "danger");
    }

    const charity = await Charity.find({ _id: array });
    for (let i of charity) {
      await deleteFile(i.image);
    }
    const result = await Charity.deleteMany({ _id: array });
  };
}

module.exports = new Methods();
