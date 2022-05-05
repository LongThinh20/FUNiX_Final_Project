import React from "react";
import { NavLink } from "react-router-dom";
import UserFilter from "./Components/UserFilter";
import Swal from "sweetalert2";

function UserManager(props) {
  const { users, user, handleFilterUser, handleDeleteUser, handeResetFilter } =
    props;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa không ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa "
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
      }
    });
  };

  return (
    <div>
      <section className="userManagerPage">
        <div className="container-fluid">
          <h4> QUẢN LÝ NGƯỜI DÙNG</h4>
          <div className="userManagerDetail">
            <h5>
              Tên Admin :{" "}
              <span> {user && user.role === "admin" ? user.name : ""} </span>
            </h5>
          </div>
          <div className="d-flex justify-content-between userManagerDetail ">
            <div>
              <UserFilter
                handleFilterUser={handleFilterUser}
                handeResetFilter={handeResetFilter}
              />
            </div>
            <div className="align-self-end">
              <NavLink to="/admin/addUser" className="btn btn-primary">
                Thêm người dùng
              </NavLink>
            </div>
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
                    <button
                      className="btn btn-danger"
                      disabled={user.role === "admin" ? true : false}
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      XÓA
                    </button>
                    <NavLink
                      className="btn btn-warning ms-2"
                      to={`/admin/addUser/${user._id}`}
                    >
                      SỬA
                    </NavLink>
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
