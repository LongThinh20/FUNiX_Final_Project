import React, { useState } from "react";

function ConfirmPasswordPage(props) {
  const { handleCheckPassword, user } = props;
  const [showPass, setShowPass] = useState(false);
  const [showError, setShowError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let value = e.target.password.value;

    if (value.length <= 0 || !value) {
      setShowError(true);
    } else {
      handleCheckPassword({ ...user, password: value });
    }
  };

  return (
    <section className="confirmPasswordPage">
      <div className="container">
        <h6>Bạn cần xác định danh tính để tiếp tục</h6>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">
              Mật khẩu hiện tại :
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              className="form-control"
              onFocus={(e) => setShowError(false)}
            />
            <p> {showError ? "Chưa nhập mật khẩu !" : ""} </p>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => setShowPass(!showPass)}
              checked={showPass}
              id="flexCheckDefault"
            />
            <p> </p>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Hiện mật khẩu
            </label>
          </div>
          <a className="btn btn-outline-primary">Bạn quên mật khẩu ?</a>

          <button className="btn btn-primary ms-4" type="submit">
            Tiếp tục
          </button>
        </form>
      </div>
    </section>
  );
}

export default ConfirmPasswordPage;
