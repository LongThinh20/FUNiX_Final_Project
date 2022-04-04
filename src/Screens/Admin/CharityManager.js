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
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4>DÁNH SÁCH CÁC CHƯƠNG TRÌNH QUYÊN GÓP</h4>
        </div>
        <div className="col">
          <NavLink className="btn btn-primary" to="/admin/addCharity">
            TẠO CHƯƠNG TRÌNH QUYÊN GÓP
          </NavLink>
        </div>
      </div>
      <div>
        <Filter handleOnSubmit={handleOnSubmit} Organization={Organization} />
      </div>

      <div id="charityTable">
        <Table hover>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Hình ảnh</th>
              <th>Mô tả </th>
              <th>Số tiền quyên góp dự kiến</th>
              <th>Số lượt đã quyên góp</th>
              <th>Tổng số tiền đã quyên góp</th>
              <th>Ngày bắt đầu / kết thúc </th>
              <th>Tên tổ chức/quỹ thực hiện </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Charity ? (
              Charity.map((charity) => (
                <tr key={charity._id}>
                  <td>{charity.name}</td>
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
                  <td>{charity.description}</td>
                  <td>{charity.expectedMoney}</td>
                  <td>{charity.timesDonate}</td>
                  <td>{charity.totalDonated}</td>
                  <td>
                    {moment(charity.ExpDate.startDate).format("DD/MM/YYYY")} --{" "}
                    {moment(charity.ExpDate.endDate).format("DD/MM/YYYY")}
                  </td>
                  <td>
                    {charity.organizationId.length > 0
                      ? charity.organizationId[0].name
                      : ""}
                  </td>
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
              <tr>
                <td>Chưa có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CharityManager;
