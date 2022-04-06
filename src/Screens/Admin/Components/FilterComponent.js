import React, { useState } from "react";

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

const conditionStatus = [
  {
    name: "Chương trình chưa bắt đầu",
    id: 1
  },
  {
    name: "chương trìn đang bắt đầu",
    id: 2
  },
  {
    name: "Chương trình đã hoàn thành",
    id: 3
  }
];

function FilterComponent(props) {
  const { handleOnSubmit } = props;
  const [checked, setCheckedCheckBox] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState();

  const isChecked = (id) => {
    return checked.includes(id);
  };

  const handleChecked = (id) => {
    setCheckedCheckBox((prev) => {
      const isCheck = isChecked(id);
      if (isCheck) {
        return checked.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="filterCharity">
      <h5 className="fst-italic text-decoration-underline ">Bộ lọc</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="d-flex">
          <p className=" fs-italic text-secondary">
            Mức tiền dự kiến quyên góp:{" "}
          </p>
           
          {conditionExpectedMoney.map((item) => (
            <div key={item.id}>
              <input
                id={item.name}
                type="radio"
                name="expectedMoney"
                className="ms-3 form-check-input"
                checked={checkedRadio === item.id}
                onChange={() => setCheckedRadio(item.id)}
              />
              <label className="ms-2 " htmlFor={item.name}>
                {item.name}
              </label>
              <br />
            </div>
          ))}
        </div>
        <div className="d-flex">
          {conditionStatus.map((item) => (
            <div key={item.id}>
              <input
                className="form-check-input "
                type="checkbox"
                id={item.name}
                name={item.id}
                checked={isChecked(item.id)}
                onChange={() => handleChecked(item.id)}
              />
              <label className="form-check-label ms-1 me-3" htmlFor={item.name}>
                {item.name}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary mt-3 ">
          Tìm
        </button>
      </form>
    </section>
  );
}

export default FilterComponent;
