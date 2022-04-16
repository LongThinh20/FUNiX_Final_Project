import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import moment from "moment";

const schema = yup
  .object()
  .shape({
    title: yup
      .string()
      .min(10, "Tối thiều 10 ký tự ...!")
      .required("Chưa nhập tiêu đề ...!"),
    image: yup.string().required("Chưa chọn hình ảnh ...!"),
    summary: yup
      .string()
      .min(10, "Tối thiều 10 ký tự ...!")
      .required("Chưa nhập tóm tắt ...!"),
    content: yup
      .string()
      .min(10, "Tối thiều 10 ký tự ...!")
      .required("Chưa nhập nội dung ...!"),
    status: yup.string().required("Chưa chọn trạng thái ...!"),
    startDate: yup.string().required("Chưa chọn ngày bắt đầu ...!"),
    endDate: yup.string().required("Chưa chọn ngày kết thúc ...!"),
    expectedMoney: yup
      .number()
      .min(5000000, "Số tiền dự kiến tối thiểu là 5 triệu ...!")
      .typeError("Chưa nhập số tiền ...!")

      .required("Chưa nhập số tiền ...!")
      .nullable(),
    organization: yup.string().required("Chưa nhập tên tổ chức ...!")
  })
  .required();

function AddCharity(props) {
  const { Id, charity, getAddCharity } = props;

  const defaultValues = {
    id: "",
    title: "",
    summary: "",
    content: "",
    image: "",
    expectedMoney: null,
    userId: "",
    date: "",
    status: "",
    startDate: "",
    endDate: "",
    organization: ""
  };

  if (charity) {
    for (let key in charity[0]) {
      defaultValues[key] = charity[0][key];
    }
    defaultValues.startDate = moment(charity[0].startDate).format("YYYY-MM-DD");
    defaultValues.endDate = moment(charity[0].endDate).format("YYYY-MM-DD");
  }

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

  const watchAllFields = watch();

  const onSubmit = (data) => {
    const formData = new FormData();

    for (let key in watchAllFields) {
      if (key === "image") {
        formData.append(key, watchAllFields[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    //
    for (let value of formData.values()) {
      console.log("fromdata", value);
    }
    //
    getAddCharity(formData);

    window.location.replace("/admin/charity");
  };

  const handleReset = () => {
    return reset(
      {
        title: "",
        summary: "",
        content: "",
        image: "",
        status: "",
        expectedMoney: null,
        startDate: "",
        endDate: "",
        organization: ""
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
              Tiêu đề :
            </label>
            <input
              placeholder="Nhập nội dung tiêu đề ..."
              type="text"
              className={`form-control ${errors.title ? "isValid" : ""} `}
              name="title"
              id="title"
              defaultValue="123213"
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
              placeholder="Nhập nội dung tóm tắt ..."
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
              placeholder="Nhập nội dung ..."
              className={`form-control ${errors.content ? "isValid" : ""} `}
              name="content"
              id="content"
              rows={3}
              defaultValue={""}
              {...register("content")}
            />
            <div className="text-danger ">{errors.content?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="expectedMoney" className="form-label">
              Số tiền dự kiến quyên góp :
            </label>
            <input
              placeholder="Nhập số tiền dự kiến ..."
              type="number"
              className={`form-control ${
                errors.expectedMoney ? "isValid" : ""
              } `}
              name="expectedMoney"
              id="expectedMoney"
              {...register("expectedMoney")}
            />
            <div className="text-danger ">{errors.expectedMoney?.message}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Trạng thái :</label>
            <select
              {...register("status")}
              name="status"
              className={` form-select ${errors.status ? "isValid" : ""} `}
            >
              <option value="" disabled>
                --Chọn một trạng thái--
              </option>
              <option value="notStart">Chưa bắt đầu</option>
              <option value="isStart">Đang bắt đầu</option>
              <option value="isDone" disabled>
                Đã hoàn thành
              </option>
            </select>
            <div className="text-danger ">{errors.status?.message}</div>
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label htmlFor="endDate" className="form-label">
              Ngày kết thúc:
            </label>
            <input
              type="date"
              className={`form-control ${errors.endDate ? "isValid" : ""} `}
              name="endDate"
              id="endDate"
              {...register("endDate")}
            />
            <div className="text-danger ">{errors.endDate?.message}</div>
          </div>
          <div className="form-group">
            <label htmlFor="organization" className="form-label">
              Tên tổ chứ/quỹ từ thiện :
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.organization ? "isValid" : ""
              } `}
              name="organization"
              id="organization"
              {...register("organization")}
            />
            <div className="text-danger ">{errors.organization?.message}</div>
          </div>
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
