import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;

const schema = yup
  .object()
  .shape({
    userName: yup
      .string()
      .required("Chưa nhập tên người dùng...!")
      .min(3, "Tên người dùng tối thiểu 3 ký tự ...!"),
    name: yup.string().required("Chưa nhập tên người dùng ...!"),
    email: yup
      .string()
      .required("Chưa nhập email...!")
      .email("Email chưa hợp lệ...!"),
    password: yup.string().required("Chưa nhập mật khẩu...!"),
    phone: yup
      .string()
      .required("Chưa nhập số điện thoại..!")
      .matches(phoneRegExp, "Số điện thoại chưa hợp lệ ...!"),
    role: yup.string().required("Chưa chọn loại người dùng ...!")
  })
  .required();
const scheman = yup
  .object()
  .shape({
    name: yup.string().required("Chưa nhập tên người dùng ...!"),
    email: yup
      .string()
      .required("Chưa nhập email...!")
      .email("Email chưa hợp lệ...!"),
    phone: yup
      .string()
      .required("Chưa nhập số điện thoại..!")
      .matches(phoneRegExp, "Số điện thoại chưa hợp lệ ...!"),
    role: yup.string().required("Chưa chọn loại người dùng ...!")
  })
  .required();
function AddUserPage(props) {
  const { handleAddUser, user, handleEditUser } = props;
  let role;

  const customSchema = () => {
    if (user) {
      return yupResolver(scheman);
    }
    return yupResolver(schema);
  };

  const defaultValues = {
    _id: "",
    userName: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    role: ""
  };

  if (user) {
    for (let key in user[0]) {
      defaultValues[key] = user[0][key];
    }
    role = user[0]?.role;
  }

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    resolver: customSchema(),
    defaultValues
  });

  const watchAllFields = watch();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    if (user) {
      for (let key in watchAllFields) {
        formData.append(key, watchAllFields[key]);
      }
    } else {
      for (let key in data) {
        formData.append(key, data[key]);
      }
    }
    for (let value of formData.values()) {
      console.log("fromdata", value);
    }
    if (user) {
      handleEditUser(formData);
    } else {
      handleAddUser(formData);
    }
  };

  return (
    <section className="addUserPage">
      <div className="container">
        <h4>Thêm người dùng</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          {user ? (
            ""
          ) : (
            <div className="form-group">
              <label htmlFor="userName" className="form-label">
                Tên người dùng :
              </label>
              <input
                className="form-control"
                id="userName"
                name="userName"
                type="text"
                {...register("userName")}
              />
              <div className="text-danger ">{errors.userName?.message}</div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Họ và tên :
            </label>
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              {...register("name")}
            />
            <div className="text-danger ">{errors.name?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              {...register("email")}
            />
            <div className="text-danger ">{errors.email?.message}</div>
          </div>
          {user ? (
            ""
          ) : (
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Mật khẩu
              </label>
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                {...register("password")}
              />
              <div className="text-danger ">{errors.password?.message}</div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Số điện thoại :
            </label>
            <input
              className="form-control"
              id="phone"
              name="phone"
              type="tel"
              {...register("phone")}
            />
            <div className="text-danger ">{errors.phone?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Loại người dùng :
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("role")}
              disabled={role === "admin" ? true : false}
            >
              <option value="" disabled>
                --Chọn loại người dùng--
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <div className="text-danger ">{errors.role?.message}</div>
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Thêm người dùng
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddUserPage;
