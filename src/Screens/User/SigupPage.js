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
      .required("Chưa nhập tên người dùng ...!")
      .min(3, "Tên người dùng tối thiểu 3 ký tự"),
    name: yup
      .string()
      .required("Chưa nhập email")
      .required("Chưa nhập họ và tên ...!"),
    email: yup
      .string()
      .required("Chưa nhập email...!")
      .email("Email chưa hợp lệ...!"),
    phone: yup
      .string()
      .required("Chưa nhập số điện thoại ...!")
      .matches(phoneRegExp, "Số điện thoại chưa hợp lệ ...!")
  })
  .required();

function SigupPage(props) {
  const { handleSigup } = props;

  const defaultValues = {
    userName: "",
    name: "",
    phone: "",
    email: ""
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }
    handleSigup(formData);
  };

  return (
    <section className="sigupPage">
      <div className="container">
        <h4>Đăng ký </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              Tên người dùng :
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
              {...register("userName")}
            />
            <div className="text-danger ">{errors.userName?.message}</div>
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
              {...register("email")}
            />
            <div className="text-danger ">{errors.email?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Họ và tên :
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              {...register("name")}
            />
            <div className="text-danger ">{errors.name?.message}</div>
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
              {...register("phone")}
            />
            <div className="text-danger ">{errors.phone?.message}</div>
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
