import React, { useState } from "react";

function FilterComponent(props) {
  const { handleOnSubmit, Organization } = props;

  const conditionExpectedMoney = [
    {
      name: "Dưới 50 triệu",
      id: 1
    },
    {
      name: "Từ  50 - 200 triệu",
      id: 2
    },
    {
      name: "Trên 200 triệu",
      id: 3
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.isDone.value);
  };

  return (
    <div>
      <h5>Bộ lọc</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="d-flex">
          <p>Chọn tên tổ chức/quỹ từ thiện</p> 
          {Organization?.map((item) => (
            <div key={item._id}>
              <input
                id={item.name}
                type="radio"
                name="organizationName"
                className="ms-3 form-check-input"
                defaultValue={item._id}
              />
              <label className="ms-2 form-check-label " htmlFor={item.name}>
                {item.name}
              </label>
              <br />
            </div>
          ))}
        </div>
        <div className="d-flex">
          <p>Mức tiền dự kiến quyên góp: </p> 
          {conditionExpectedMoney.map((item) => (
            <>
              <input
                id={item.id}
                type="radio"
                name="expectedMoney"
                className="ms-3 form-check-input"
                value={item.id}
              />
              <label className="ms-2 " htmlFor={item.id}>
                {item.name}
              </label>
              <br />
            </>
          ))}
        </div>
        <div className="d-flex">
          <input
            className="form-check-input ms-2"
            type="checkbox"
            id="isDone"
            name="isDone"
          />
          <label className="form-check-label ms-2" htmlFor="isDone">
            Chương trình quyên góp đã hoàn thành
          </label>
          <input
            className="form-check-input ms-2"
            type="checkbox"
            id="isExp"
            name="isExp"
          />
          <label className="form-check-label ms-2" htmlFor="isExp">
            Chương trình quyên góp hết hạn
          </label>
        </div>

        <button type="submit" className="btn btn-primary mx-2">
          Tìm
        </button>
      </form>
    </div>
  );
}

export default FilterComponent;
