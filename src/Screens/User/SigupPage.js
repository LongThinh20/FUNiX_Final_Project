import React from "react";

function SigupPage() {
  return (
    <section className="sigupPage">
      <div className="container">
        <h4>Đăng ký </h4>
        <form>
          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              Tên người dùng :
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Họ và tên :
            </label>
            <input id="name" name="name" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Số điện thoại :
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
}

export default SigupPage;
