import React from "react";

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
            <label htmlFor="userName">Tên người dùng :</label>
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
            Gửi
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
