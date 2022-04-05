import React from "react";

import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">
            Logo
          </a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/charity">
                  DANH SÁCH QUYÊN GÓP
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/addCharity">
                  THÊM /CẬP NHẬTCHƯƠNG TRÌNH TỪ THIỆN
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  ĐĂNG XUẤT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
