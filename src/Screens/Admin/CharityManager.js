import React from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";

import Filter from "./Components/FilterComponent";

function CharityManager(props) {
  const { Charity, Organization, deleteCharity, handleSearch } = props;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleSearch(e.target.searchText.value);
  };

  return (
    <section className="CharityManagerPage">
      <div className="container-fluid">
        <h3>DANH SÁCH CÁC CHƯƠNG TRÌNH QUYÊN GÓP</h3>
        <div className="row ">
          <div className="col">
            <h5>Tên Admin : </h5>
          </div>
          <div className="col">
            <NavLink className="btn btn-primary" to="/admin/addCharity">
              TẠO CHƯƠNG TRÌNH QUYÊN GÓP
            </NavLink>
          </div>
        </div>
        <div>
          <Filter handleOnSubmit={handleOnSubmit} />
        </div>

        <div id="charityTable " className="card p-1 mt-2">
          <Table hover>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Hình ảnh</th>
                <th>Tóm tắt </th>
                <th>Nội dung.</th>
                <th>Người tạo</th>
                <th>Ngày tạo</th>
                <th>Ngày bắt đầu / kết thúc </th>
                <th>Trạng thái</th>
                <th>Tên tổ chức/quỹ từ thiện</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Chung tay phục hồi mảng xanh, phủ xanh đất trống đồi trọc miền
                  Trung, Quảng Trị
                </td>
                <td>
                  <img
                    src="https://momo.vn/_next/image?url=https%3A%2F%2Fstatic.mservice.io%2Fblogscontents%2Fmomo-upload-api-211124181421-637733744614202519.jpg&w=1200&q=75"
                    width="100"
                    height="100"
                    alt="image"
                  />
                </td>
                <td>
                  Cùng Quỹ Hoa Chia Sẻ góp sức bảo vệ mảng xanh nhằm hạn chế
                  biến đổi khí hậu và suy thoái môi trường, giảm thiểu thiên
                  tai, hạn hán đối với các vùng đồng bào miền Trung nước ta.
                </td>
                <td>
                  Để sửa chữa và khắc phục hậu quả của những việc làm ấy, trồng
                  rừng đã và đang là một giải pháp hiệu quả và thiết thực giúp
                  phục hồi các biến đổi của thiên nhiên. Một cây xanh mọc lên,
                  một sự sống tồn tại.Hưởng ứng chiến dịch trồng rừng: Trồng ít
                  nhất 1 tỷ cây xanh giai đoạn 2021 - 2025 như lời phát động của
                  Thủ tướng Chính Phủ, Quỹ Hoa Chia Sẻ phối hợp cùng Ví Điện Tử
                  MoMo tổ chức chiến dịch trồng cây, kêu gọi quyên góp
                  150.000.000 đồng để phủ cây xanh lấp đồi trọc. Chiến dịch
                  trồng rừng, phủ đất trống lấp đồi trọc rất mong muốn được sự
                  hỗ trợ đồng hành từ cộng đồng. Mọi sự đóng góp dù nhỏ nhất
                  cũng giúp phục hồi nên một mảng xanh.
                </td>
                <td>Admin1</td>
                <td>4/5/2022</td>
                <td>3/4/2022-5/6/2022</td>
                <td>Chưa bắt đầu</td>
                <td>Quỹ Từ thiện Hoa Chia Sẻ </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCharity("1")}
                  >
                    Xóa
                  </button>
                  <NavLink
                    to={`/admin/addCharity`}
                    className="btn btn-warning mt-2 "
                  >
                    Sửa
                  </NavLink>
                </td>
              </tr>
            </tbody>
            {/* <tbody>
            {Charity.length > 0 ? (
              Charity.map((charity) => (
                <tr key={charity._id}>
                  <td>{charity.title}</td>
                  <td>
                    <img
                      src={
                        charity.image.slice(0, 6) !== "images"
                          ? charity.image
                          : `http://localhost:3001${charity.image.slice(6)}`
                      }
                      width="50"
                      height="50"
                      alt="image"
                    />
                  </td>
                  <td>{charity.summary}</td>
                  <td>{charity.ocntent}</td>
                  <td>{charity.userId.name}</td>
                  <td>{charity.date}</td>
                  <td>
                    {moment(charity.ExpDate.startDate).format("DD/MM/YYYY")} --{" "}
                    {moment(charity.ExpDate.endDate).format("DD/MM/YYYY")}
                  </td>
                  <td>{charity.organization}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCharity(charity._id)}
                    >
                      Xóa
                    </button>
                    <NavLink
                      to={`/admin/addCharity/${charity._id}`}
                      className="btn btn-warning ms-2 "
                    >
                      Sửa
                    </NavLink>
                  </td>
                </tr>
              ))
            ) : (
              <h5>Chưa có dữ liệu</h5>
            )}
          </tbody> */}
          </Table>
        </div>
      </div>
    </section>
  );
}

export default CharityManager;
