import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Tiêu đề không được rỗng !"),
    image: yup.string().required("Hình ảnh không được rỗng!"),
    summary: yup.string().required("Tóm tắt không được rỗng!"),
    content: yup.string().required("Nội dung không được rỗng !"),
    startDate: yup.string().required("Ngày bắt đầu không được rỗng !"),
    endDate: yup.string().required("Ngày   kết thúc không được rỗng !"),
    expectedMoney: yup.number().nullable().required("132"),
    organizaion: yup.string().required("Tên tổ chức từ thiện không được rỗng !")
  })
  .required();

function InputField(props) {
  const defaultValues = {
    tite: "",
    summary: "",
    content: "",
    image: "",
    expectedMoney: null,
    startDate: "",
    endDate: "",
    organizaion: ""
  };

  const { label, name, placeholder, type } = props;

  const {
    register,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues
  });

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${errors.name ? "isValid" : ""} `}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
      <div className="text-danger ">{errors.name?.message}</div>
    </div>
  );
}

export default InputField;
