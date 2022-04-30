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
    const foundedCharity = await Charity.findById(item);
    if (!foundedCharity) throw new Error("Charity not found!");
    const result = await Charity.deleteOne({ _id: item });
    if (result.deletedCount === 0) throw new Error("Delete charity failed!");
    await deleteFile(foundedCharity.image);
  };
  deleteMany = async (array) => {
    for (let i of array) {
      const foundedCharity = await Charity.findById(i.trim());
      if (!foundedCharity) throw new Error("Charity not found!");
      const result = await Charity.deleteOne({ _id: i });
      if (result.deletedCount === 0) throw new Error("Delete charity failed!");
      await deleteFile(foundedCharity.image);
    }
  };

  ramdomTest(textLength) {
    const textRamdom =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < textLength; i++) {
      text += textRamdom.charAt(Math.floor(Math.random() * textRamdom.length));
    }
    return text;
  }
}

module.exports = new Methods();
