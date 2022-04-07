const Charity = require("../models/charity");
const mongoose = require("mongoose");
const path = require("path");
const moment = require("moment");

const deleteFile = require("../utils/deleteFile");

// exports.postOrganizationTest = (req, res) => {
//   // const { name, avatar } = req.body;
//   const newOrganization = new Organizaion({
//     name: "Quỹ Hy Vọng - Hope Foundation",
//     avatar:
//       "https://quyhyvong.com/wp-content/themes/hope/assets/images/hope.svg",
//     description:
//       "Hope Foundation là quỹ xã hội - từ thiện hoạt động vì cộng đồng, không vì lợi nhuận, do VnExpress và Công ty Cổ phần FPT vận hành. Quỹ Hy vọng theo đuổi hai mục tiêu: hỗ trợ các hoàn cảnh khó khăn và tạo động lực phát triển. Quỹ Hy Vọng cho rằng để tạo ra một xã hội phát triển thì trước hết cần có nhiều sự kết nối để chia sẻ với những hoàn cảnh khó khăn. Và thúc đẩy các dự án phát triển trong đó mọi người được khuyến khích giải phóng tiềm năng của họ và trang bị cho mình các công cụ, cũng sẽ xóa đói giảm nghèo và tạo ra sự bình đẳng.",
//     charityId: []
//   });
//   newOrganization
//     .save()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => console.log(err));
// };

exports.postCharityTest = (req, res) => {
  const newCharity = new Charity({
    title:
      "Chung tay đóng góp để trồng cây bản địa và gây vườn rừng tại bản Cát Cát, Sapa.",
    image:
      "https://momo.vn/_next/image?url=https%3A%2F%2Fstatic.mservice.io%2Fblogscontents%2Fmomo-upload-api-211124181116-637733742768863354.jpg&w=1200&q=75",
    summary:
      "Với mỗi 30,000 VNĐ, bạn có thể đóng góp để trồng một cái cây tại vườn rừng rộng 2ha tại bản Cát Cát - Sapa. Mục tiêu của chúng tôi là trồng 3000 cây để gây rừng, tạo công ăn việc làm cho người dân và phát triển thế mạnh cây bản địa của địa phương.",
    content:
      "Để làm được điều này, chúng tôi dự kiến sẽ trồng 3000 cây giống bản địa sẽ phát triển tốt trong 6 tháng và có thể thu hoạch để sản xuất sau 2-3 năm, các cây lâu năm phát triển tốt. Đồng thời, trong quá trình triển khai dự án sẽ tạo ra thêm nhiều công ăn việc làm mỗi năm cho người dân địa phương. Theo dự kiến, tổng kinh phí cho toàn bộ dự án 100,000,000 VNĐ (chi phí mua cây giống và trồng và chăm sóc cây)." +
      "Chúng tôi rất mong nhận được sự chung tay gây quỹ của các nhà hảo tâm. Với mỗi 30,000 VNĐ, bạn có thể đóng góp để trồng một cái cây tại vườn rừng rộng 2ha tại bản Cát Cát - Sapa giúp rừng được khôi phục, cuộc sống bà con địa phương được cải thiện.",
    date: new Date(),
    expectedMoney: 85000000,
    startDate: new Date("04/07/2022"),
    endDate: new Date("06/08/2022"),
    organization: "Trung tâm Live & Learn"
  });

  newCharity
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.error(err));
};

//POST /admin/postCharity
// exports.postCharity = (req, res) => {
//   const image = req.file.path;
//   const { name, startDate, endDate, description, expectedMoney } = req.body;

//   console.log(startDate, endDate);

//   const newCharity = new Charity({
//     name: name,
//     image: image,
//     description: description,
//     ExpDate: {
//       startDate: new Date(startDate),
//       endDate: new Date(endDate)
//     },
//     expectedMoney: expectedMoney,
//     timesDonate: 0,
//     totalDonated: 0,
//     organizationId: []
//   });
//   newCharity
//     .save()
//     .then((result) => {
//       console.log("POST CHARITY!");
//       res.send(result);
//     })
//     .catch((err) => console.error(err));
// };

//GET / admin / getCharity;
exports.getCharity = (req, res) => {
  Charity.find()
    .then((charities) => {
      console.log(charities);
      res.render("charityManager/charityManagerPage", {
        charities,
        moment,
        title: "QUẢN LÝ CHƯƠNG TRÌNH QUYÊN GÓP"
      });
    })
    .catch((err) => console.er(err));
};

//GET /admin/addCharity

exports.addCharityForm = (req, res) => {
  res.render("charityManager/addCharityPage", {
    title: " THÊM CHƯƠNG TRÌNH TỪ THIỆN"
  });
};

//DELETE /admin/deleteCharity
// exports.deleteCharity = (req, res) => {
//   Charity.findByIdAndDelete(req.query.charityId)
//     .then((result) => {
//       res.send(result);
//       console.log("DELETE CHARITY");
//     })
//     .catch((err) => console.log(err));
// };

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

//GET /admin/organization
// exports.getOrganizaion = (req, res) => {
//   Organizaion.find()
//     .populate("charityId")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// };
