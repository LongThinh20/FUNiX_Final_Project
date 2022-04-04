import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import moment from "moment";

function AddCharity(props) {
  const { getAddCharity, getCharityUpdate, charity, organization } = props;

  const { handleSubmit } = useForm();

  const [objAddCharity, setObjAddCharity] = useState(() => {
    if (charity) {
      return {
        id: charity[0]._id,
        name: charity[0].name,
        image: charity[0].image,
        expectedMoney: charity[0].expectedMoney,
        startDate: charity[0].ExpDate.startDate,
        endDate: charity[0].ExpDate.endDate,
        organizationId: ""
      };
    }
    return {
      name: "",
      image: "",
      expectedMoney: "",
      startDate: "",
      endDate: "",
      organizationId: ""
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
  };

  const onSubmit = (e) => {
    let formData = new FormData();
    for (let key in objAddCharity) {
      formData.append(key, objAddCharity[key]);
    }

    for (var value of formData.values()) {
      console.log("fromdata", value);
    }

    if (charity) {
      getCharityUpdate(formData);
    } else {
      getAddCharity(formData);
    }

    console.log(objAddCharity);
  };

  return (
    <div>
      <Container>
        <h3>THÊM CHƯƠNG TRÌNH TỪ THIỆN</h3>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="row">
            <div className="col-3">
              <p>Tên chương trình</p>
              <p>Ảnh đại diện</p>
              <p>Mô tả </p>
              <p>Số tiền dự kiến quyên góp</p>
              <p>Ngày bắt đầu / kết thúc chương trình</p>
              {charity ? <p>Tên tổ chức/quỹ từ thiện</p> : ""}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                defaultValue={charity ? charity[0].name : ""}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                className="form-control"
                name="description"
                defaultValue={charity ? charity[0].description : ""}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                className="form-control"
                name="expectedMoney"
                defaultValue={charity ? charity[0].expectedMoney : ""}
                onChange={(e) => handleChange(e)}
              />
              <Row>
                <Col>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    defaultValue={
                      charity
                        ? moment(charity[0].ExpDate.startDate).format(
                            "YYYY-MM-DD"
                          )
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                ---
                <Col>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    defaultValue={
                      charity
                        ? moment(charity[0].ExpDate.endDate).format(
                            "YYYY-MM-DD"
                          )
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
              </Row>
              {charity ? (
                <select
                  name="organizationId"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  {organization?.map((item) => {
                    return charity[0].organizationId[0] ? (
                      <>
                        {charity[0].organizationId[0].name === item.name ? (
                          <option
                            key={item._id}
                            value={item._id}
                            disabled
                            defaultChecked
                          >
                            {item.name}
                          </option>
                        ) : (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        )}
                      </>
                    ) : (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                ""
              )}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            {charity ? "Cập nhật" : "Tạo mới"}
          </button>
        </form>
      </Container>
    </div>
  );
}

export default AddCharity;
