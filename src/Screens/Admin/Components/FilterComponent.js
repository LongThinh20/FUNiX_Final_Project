import React from "react";

const conditionExpectedMoney = [
  {
    name: "Dưới 50 triệu",
    id: "50"
  },
  {
    name: "Từ  50 - 200 triệu",
    id: "50-200"
  },
  {
    name: "Trên 200 triệu",
    id: "200"
  }
];

const conditionStatus = [
  {
    name: "Chưa bắt đầu",
    id: "notStart"
  },
  {
    name: "Đang bắt đầu",
    id: "isStart"
  },
  {
    name: "Đã hoàn thành",
    id: "isDone"
  }
];

function FilterComponent(props) {
  const {
    filterCharity,
    resetFilter,
    checked,
    setCheckedCheckBox,
    checkedRadio,
    setCheckedRadio
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const conditionFilter = {
      expectedMoney: checkedRadio,
      status: checked
    };

    filterCharity(conditionFilter);
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
          <p className=" fs-italic text-secondary">Trạng thái chương trình :</p>
          {conditionStatus.map((item) => (
            <div key={item.id}>
              <input
                id={item.name}
                type="radio"
                name="status"
                className="ms-3 form-check-input"
                checked={checked === item.id}
                onChange={() => setCheckedCheckBox(item.id)}
              />
              <label className="ms-2 " htmlFor={item.name}>
                {item.name}
              </label>
              <br />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary mt-3 ">
          Tìm
        </button>
        <button
          type="button"
          className="btn btn-primary mt-3 ms-2"
          onClick={() => resetFilter()}
        >
          Reset
        </button>
      </form>
    </section>
  );
}

export default FilterComponent;
