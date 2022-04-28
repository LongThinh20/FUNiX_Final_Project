import React from "react";

import { NavLink } from "react-router-dom";

function Header(props) {
  const { user, handleLogout } = props;
  let role = null;
  if (user) {
    role = user.role;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-around"
            id="collapsibleNavbar"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  TRANG CHỦ
                </NavLink>
              </li>
              {role === "admin" ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/charity">
                      QUẢN LÝ CHƯƠNG TRÌNH QUYÊN GÓP
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/user">
                      QUẢN LÝ NGƯỜI DÙNG
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav">
              {role ? (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      ĐĂNG XUẤT
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sigup">
                      ĐĂNG KÝ
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      ĐĂNG NHẬP
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
