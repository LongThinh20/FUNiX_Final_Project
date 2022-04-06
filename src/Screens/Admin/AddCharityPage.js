import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";

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

function AddCharity(props) {
  const { Id } = props;

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

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues
  });

  const tesst = watch();

  const onSubmit = (data) => {
    const formData = new FormData();

    for (let key in tesst) {
      if (key === "image") {
        formData.append(key, tesst[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    // for (let value of formData.values()) {
    //   console.log("fromdata", value);
    // }
  };

  const handleReset = () => {
    return reset(
      {
        tite: "",
        summary: "",
        content: "",
        image: "",
        expectedMoney: null,
        startDate: "",
        endDate: "",
        organizaion: ""
      },
      {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false
      }
    );
  };

  return (
    <section className="AddCharityPage">
      <Container>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/admin/charity">Danh sách chương trình</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {Id
                ? " Cập nhật chương trình quyên góp"
                : "Thêmchương trình quyên góp"}
            </li>
          </ol>
        </nav>
        {Id ? (
          <h3>CẬP NHẬT CHƯƠNG TRÌNH TỪ THIỆN</h3>
        ) : (
          <h3>THÊM CHƯƠNG TRÌNH TỪ THIỆN</h3>
        )}
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Tiêu đề
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "isValid" : ""} `}
              name="title"
              id="title"
              placeholder="Chọn hình ảnh"
              {...register("title")}
            />
            <div className="text-danger ">{errors.title?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Hình ảnh :
            </label>
            <input
              type="file"
              className={`form-control ${errors.image ? "isValid" : ""} `}
              name="image"
              placeholder="Chọn hình ảnh"
              {...register("image")}
            />
            <div className="text-danger ">{errors.image?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="summary" className="form-label">
              Tóm tắt
            </label>
            <textarea
              className={`form-control ${errors.summary ? "isValid" : ""} `}
              name="summary"
              id="summary"
              rows={3}
              defaultValue={""}
              {...register("summary")}
            />
            <div className="text-danger ">{errors.summary?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Nội dung :
            </label>
            <textarea
              className={`form-control ${errors.content ? "isValid" : ""} `}
              name="content"
              id="content"
              rows={3}
              defaultValue={""}
              {...register("content")}
            />
            <div className="text-danger ">{errors.content?.message}</div>
          </div>
          <label htmlFor="expectedMoney" className="form-label">
            Số tiền dự kiến quyên góp :
          </label>
          <input
            type="number"
            className={`form-control ${errors.expectedMoney ? "isValid" : ""} `}
            name="expectedMoney"
            id="expectedMoney"
            placeholder=""
            {...register("expectedMoney")}
          />
          <div className="text-danger ">{errors.expectedMoney?.message}</div>
          <label htmlFor="startDate" className="form-label">
            Ngày bắt đầu :
          </label>
          <input
            type="date"
            className={`form-control ${errors.startDate ? "isValid" : ""} `}
            name="startDate"
            id="startDate"
            placeholder=""
            {...register("startDate")}
          />
          <div className="text-danger ">{errors.startDate?.message}</div>
          <label htmlFor="endDate" className="form-label">
            Ngày kết thúc:
          </label>
          <input
            type="date"
            className={`form-control ${errors.endDate ? "isValid" : ""} `}
            name="endDate"
            id="endDate"
            placeholder=""
            {...register("endDate")}
          />
          <div className="text-danger ">{errors.endDate?.message}</div>
          <label htmlFor="organization" className="form-label">
            Tên tổ chứ/quỹ từ thiện :
          </label>
          <input
            type="text"
            className={`form-control ${errors.organizaion ? "isValid" : ""} `}
            name="organization"
            id="organization"
            placeholder=""
            {...register("organizaion")}
          />
          <div className="text-danger ">{errors.organizaion?.message}</div>
          <button className="btn btn-primary mt-4" type="submit">
            {Id ? "Cập nhật" : "Thêm"}
          </button>
          <button
            className="btn btn-primary ms-2 mt-4"
            type="button"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        </form>
      </Container>
    </section>
  );
}

export default AddCharity;
