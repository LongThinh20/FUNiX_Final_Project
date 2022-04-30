import React, { useState } from "react";

function UserFilter(props) {
  const { handleFilterUser } = props;

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleFilterUser({ userName, phone });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h5 className="fst-italic text-decoration-underline ">Bộ lọc</h5>
        <div className="row">
          <div className="form-group col">
            <label className="form-label  text-secondary" htmlFor="userName">
              Tên người dùng :
            </label>
            <input
              className="form-control"
              name="userName"
              id="userName"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group col">
            <label className="form-label text-secondary" htmlFor="phone">
              Số điện thoại:
            </label>
            <input
              className="form-control"
              id="phone "
              name="phone"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary mt-2" type="submit">
          Tìm
        </button>

        <a href="/admin/user" className="btn btn-primary mt-2 ms-2">
          Reset
        </a>
      </form>
    </div>
  );
}

export default UserFilter;
