import React, { useState } from "react";
import Swal from "sweetalert2";
import HelpPassword from "./Component/HelpPassword";
import RangePasswordComponent from "./Component/RangePasswordComponent";

function ChangePasswordPage(props) {
  const { handleChangePass } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [checkMatch, setCheckMatch] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showError, setShowError] = useState({ content: "", status: false });

  console.log(showError.status);

  const [password, setPassword] = useState({
    newPassword: { value: "", status: null },
    confirmPassword: { value: "", status: null }
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setPassword({
      ...password,
      [name]: { value: value, status: checkPass(value) }
    });
  };

  const handleFocus = (e) => {
    let name = e.target.name;
    setCheckMatch(true);
    if (name === "newPassword") {
      setShowHelp(true);
    }
    if (name === "confirmPassword") {
      setShowHelp(false);
    }
    setShowError({ content: "", status: false });
  };

  const checkPass = (str) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
    );

    if (strongRegex.test(str)) return "strong";

    if (mediumRegex.test(str)) return "medium";

    if (str.length > 8 && str) return "weak";
  };

  const onSubmit = (e) => {
    setShowHelp(false);
    e.preventDefault();
    let newPassword = password.newPassword.value;
    let confirmPassword = password.confirmPassword.value;
    setCheckMatch(() => {
      if (newPassword !== confirmPassword) {
        return false;
      }
      return true;
    });

    if (
      password.newPassword.value.length < 8 ||
      password.confirmPassword.status === "weak"
    ) {
      setShowError({
        content: "Chưa thỏa mật khẩu trung bình !",
        status: true
      });
    }

    if (
      checkMatch &&
      (password.confirmPassword.status === "medium" ||
        password.confirmPassword.status === "strong")
    ) {
      handleChangePass(password.confirmPassword.value);
    }
  };

  return (
    <section className="changePasswordPage">
      <div className="container">
        <div
          className={`alert alert-danger text-center ${
            !showError.status ? "d-none" : ""
          } `}
          role="alert"
        >
          {showError.status ? showError.content : ""}
        </div>

        <h4>Đổi mật khẩu</h4>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">
              Mật khẩu mới:
            </label>

            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                className="form-control"
                aria-describedby="newPasswordHelp"
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleFocus(e)}
              />
              <RangePasswordComponent status={password.newPassword.status} />
              <HelpPassword
                showHelp={showHelp}
                newPasswordStatus={password.newPassword.status}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Nhập lại mật khẩu :
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className="form-control"
              onChange={(e) => handleChange(e)}
              onFocus={(e) => handleFocus(e)}
            />
            <RangePasswordComponent status={password.confirmPassword.status} />

            <p className="text-danger">
              {!checkMatch ? "Mật khẩu chưa trùng khớp !" : ""}{" "}
            </p>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => setShowPassword(!showPassword)}
              checked={showPassword}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Hiện mật khẩu
            </label>
          </div>
          <button className="btn btn-primary">Đổi Mật Khẩu</button>
        </form>
      </div>
    </section>
  );
}

export default ChangePasswordPage;
