const Organizaion = require("../models/organization");
const Charity = require("../models/charity");
const mongoose = require("mongoose");
const path = require("path");
const deleteFile = require("../utils/deleteFile");

exports.postOrganizationTest = (req, res) => {
  // const { name, avatar } = req.body;
  const newOrganization = new Organizaion({
    name: "Quỹ Hy Vọng - Hope Foundation",
    avatar:
      "https://quyhyvong.com/wp-content/themes/hope/assets/images/hope.svg",
    description:
      "Hope Foundation là quỹ xã hội - từ thiện hoạt động vì cộng đồng, không vì lợi nhuận, do VnExpress và Công ty Cổ phần FPT vận hành. Quỹ Hy vọng theo đuổi hai mục tiêu: hỗ trợ các hoàn cảnh khó khăn và tạo động lực phát triển. Quỹ Hy Vọng cho rằng để tạo ra một xã hội phát triển thì trước hết cần có nhiều sự kết nối để chia sẻ với những hoàn cảnh khó khăn. Và thúc đẩy các dự án phát triển trong đó mọi người được khuyến khích giải phóng tiềm năng của họ và trang bị cho mình các công cụ, cũng sẽ xóa đói giảm nghèo và tạo ra sự bình đẳng.",
    charityId: []
  });
  newOrganization
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};

exports.postCharityTest = (req, res) => {
  // const { name, startDate, endDate } = req.body;
  const newCharity = new Charity({
    name: "Cùng Quỹ Hy Vọng mang Tết ấm áp, đủ đầy đến cho trẻ em mồ côi vì dịch bệnh",
    image:
      "https://momo.vn/_next/image?url=https%3A%2F%2Fstatic.mservice.io%2Fblogscontents%2Fmomo-upload-api-220222154244-637811413641226986.jpg&w=1200&q=75",
    description:
      "Chung tay cùng Quỹ Hy vọng mang “những tia nắng xuân ấm áp đến các em nhỏ mồ côi có hoàn cảnh khó khăn vì dịch bệnh.",
    ExpDate: {
      startDate: new Date("02/1/2022"),
      endDate: new Date("03/25/2022")
    },
    expectedMoney: 150000000,
    timesDonate: 0,
    totalDonated: 0,
    organizationId: []
  });

  newCharity
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.error(err));
};

//POST /admin/postCharity
exports.postCharity = (req, res) => {
  const image = req.file.path;
  const { name, startDate, endDate, description, expectedMoney } = req.body;

  console.log(startDate, endDate);

  const newCharity = new Charity({
    name: name,
    image: image,
    description: description,
    ExpDate: {
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    },
    expectedMoney: expectedMoney,
    timesDonate: 0,
    totalDonated: 0,
    organizationId: []
  });
  newCharity
    .save()
    .then((result) => {
      console.log("POST CHARITY!");
      res.send(result);
    })
    .catch((err) => console.error(err));
};

//GET /admin/getCharity
exports.getCharity = (req, res) => {
  Charity.find()
    .populate("organizationId")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

//DELETE /admin/deleteCharity
exports.deleteCharity = (req, res) => {
  Charity.findByIdAndDelete(req.query.charityId)
    .then((result) => {
      res.send(result);
      console.log("DELETE CHARITY");
    })
    .catch((err) => console.log(err));
};

exports.getImage = (req, res) => {
  const fileName = req.params.imageName;

  res.sendFile(path.resolve(`./images/${fileName}`));
};

//POST /admin/editCharity
exports.editCharity = (req, res) => {
  const {
    id,
    name,
    expectedMoney,
    description,
    startDate,
    endDate,
    organizationId
  } = req.body;
  const image = req.file.path;

  Charity.findById(id)
    .then((result) => {
      deleteFile(result.image);
    })
    .catch((err) => console.log(err));

  const objUpdate = {
    name,
    expectedMoney,
    image,
    description,
    ExpDate: {
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    },
    organizationId: [mongoose.Types.ObjectId(organizationId.trim())]
  };

  Charity.findByIdAndUpdate({ _id: id }, objUpdate, (result) => {
    res.send(result);
  });
};

//GET /admin/organization
exports.getOrganizaion = (req, res) => {
  Organizaion.find()
    .populate("charityId")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};
