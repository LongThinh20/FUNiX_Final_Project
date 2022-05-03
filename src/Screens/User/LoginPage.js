import React from "react";
import { domain } from "../../Config/config";

function LoginPage(props) {
  const { handleLogin } = props;

  const submit = (values) => {
    values.preventDefault();

    const target = values.target;

    handleLogin({
      userName: target.userName.value,
      password: target.password.value
    });
  };

  return (
    <section className="loginPage">
      <div className="container">
        <h4>Đăng nhập</h4>
        <form onSubmit={(e) => submit(e)}>
          <div className="form-group">
            ư<label htmlFor="userName">Tên người dùng :</label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="form-control"
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Mật khẩu :</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Đăng nhập
          </button>
          <a className="btn btn-outline-info mt-2 ms-2" href={`${domain}/`}>
            Quên mật khẩu ?
          </a>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
