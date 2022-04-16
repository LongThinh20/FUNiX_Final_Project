import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";

function CharityList(props) {
  const { charities, deleteCharity } = props;
  return (
    <div>
      {" "}
      <div className="charityTable  mt-2">
        <table className="hover table-striped table-bordered table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Hình ảnh</th>
              <th>Tóm tắt </th>
              <th>Nội dung.</th>
              <th>Số tiền quyên góp dự kiến</th>
              <th>Người tạo</th>
              <th>Ngày tạo</th>
              <th>Ngày bắt đầu / kết thúc </th>
              <th>Trạng thái</th>
              <th>Tên tổ chức/quỹ từ thiện</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {charities.length > 0 ? (
              charities.map((charity) => (
                <tr key={charity._id}>
                  <td>{charity.title}</td>
                  <td>
                    <img
                      src={`http://localhost:3001/${charity.image}`}
                      className="img-fluid"
                      alt={charity.tile}
                    />
                  </td>
                  <td>{charity.summary}</td>
                  <td>{charity.content}</td>
                  <td>{charity.expectedMoney}</td>
                  <td>{charity.userId}</td>
                  <td>{moment(charity.date).format("DD/MM/YYYY")}</td>
                  <td>
                    {moment(charity.startDate).format("DD/MM/YYYY")}--
                    {moment(charity.endDate).format("DD/MM/YYYY")}
                  </td>
                  <td>{charity.status}</td>
                  <td>{charity.organization}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCharity(charity._id)}
                    >
                      Xóa
                    </button>
                    <NavLink
                      to={`/admin/addCharity/${charity._id}`}
                      className="btn btn-warning mt-2 "
                    >
                      Sửa
                    </NavLink>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CharityList;
