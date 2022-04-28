import React from "react";
import { NavLink } from "react-router-dom";

function UserManager(props) {
  const { users } = props;
  return (
    <div>
      <section className="userManagerPage">
        <div className="container-fluid">
          <h4> QUẢN LÝ NGƯỜI DÙNG</h4>

          <div>
            <NavLink to="/admin/addUser" className="btn btn-primary">
              Thêm người dùng
            </NavLink>
          </div>

          <table className="table  hover table-striped table-bordered">
            <thead>
              <tr>
                <td></td>
                <td>Tên người dùng: </td>
                <td>Email: </td>
                <td>Họ và tên :</td>
                <td>Số điện thoại :</td>
                <td>Loại người dùng:</td>
                <td>Trạng thái</td>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>
                    <button className="btn btn-danger"> XÓA</button>
                    <a className="btn btn-warning ms-2">SỬA</a>
                    <a className="btn btn-info ms-2">RESET PASSWORD</a>
                  </td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.role === "admin" ? "Admin" : "User"} </td>
                  <td>
                    {user.status === true ? "Đã kích hoạt" : "Chưa kích hoạt"}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default UserManager;
