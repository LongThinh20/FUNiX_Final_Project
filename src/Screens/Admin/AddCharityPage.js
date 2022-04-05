import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import moment from "moment";

function AddCharity(props) {
  const { getAddCharity, getCharityUpdate, charity } = props;

  const { handleSubmit } = useForm();

  const [objAddCharity, setObjAddCharity] = useState(() => {
    if (charity) {
      return {
        id: charity[0]._id,
        title: charity[0].name,
        image: charity[0].image,
        summary: charity[0].summary,
        content: charity[0].content,
        startDate: charity[0].startDate,
        endDate: charity[0].endDate,
        organization: charity[0].organization,
        expectedMoney: charity[0].expectedMoney
      };
    }
    return {
      title: "",
      image: "",
      summary: "",
      content: "",
      startDate: "",
      endDate: "",
      organization: "",
      expectedMoney: 0
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setObjAddCharity({ ...objAddCharity, [name]: e.target.files[0] });
    } else {
      setObjAddCharity({
        ...objAddCharity,
        [name]: value
      });
    }
    console.log(objAddCharity);
  };

  const onSubmit = (e) => {
    let formData = new FormData();
    for (let key in objAddCharity) {
      formData.append(key, objAddCharity[key]);
    }
    for (var value of formData.values()) {
      console.log("fromdata", value);
    }

    // if (charity) {
    //   getCharityUpdate(formData);
    // } else {
    //   getAddCharity(formData);
    // }
  };

  return (
    <section className="AddCharityPage">
      <Container>
        {charity ? (
          <h3>CẬP NHẬT CHƯƠNG TRÌNH TỪ THIỆN</h3>
        ) : (
          <h3>THÊM CHƯƠNG TRÌNH TỪ THIỆN</h3>
        )}
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Tiêu đề :
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder=""
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="image" className="form-label">
              Hình ảnh :
            </label>
            <input
              type="file"
              className="form-control"
              name="image"
              id="image"
              placeholder="Chọn hình ảnh"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="summary" className="form-label">
              Tóm tắt
            </label>
            <textarea
              className="form-control"
              name="summary"
              id="summary"
              rows={3}
              defaultValue={""}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Nội dung :
            </label>
            <textarea
              className="form-control"
              name="content"
              id="content"
              rows={3}
              defaultValue={""}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <label htmlFor="expectedMoney" className="form-label">
            Số tiền dự kiến quyên góp :
          </label>
          <input
            type="number"
            className="form-control"
            name="expectedMoney"
            id="expectedMoney"
            placeholder=""
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="startDate" className="form-label">
            Ngày bắt đầu :
          </label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            id="startDate"
            placeholder=""
            onChange={(e) => handleChange(new Date(e))}
          />
          <label htmlFor="endDate" className="form-label">
            Ngày kết thúc:
          </label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            id="endDate"
            placeholder=""
            onChange={(e) => handleChange(new Date(e))}
          />
          <label htmlFor="organization" className="form-label">
            Tên tổ chứ/quỹ từ thiện :
          </label>
          <input
            type="text"
            className="form-control"
            name="organization"
            id="organization"
            placeholder=""
            onChange={(e) => handleChange(e)}
          />
          <button className="btn btn-primary" type="submit">
            Cập nhật
          </button>
          <button className="btn btn-primary ms-2">Reset</button>
        </form>
      </Container>
    </section>
  );
}

export default AddCharity;
