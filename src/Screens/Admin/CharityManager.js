import React from "react";
import { NavLink } from "react-router-dom";

import CharityList from "./Components/CharityList";
import Filter from "./Components/FilterComponent";

function CharityManager(props) {
  const {
    charities,
    deleteCharity,
    filterCharity,
    resultFilter,
    resetFilter,
    checked,
    setCheckedCheckBox,
    checkedRadio,
    setCheckedRadio
  } = props;

  return (
    <section className="   CharityManagerPage">
      <div className="container-fluid">
        <h3>DANH SÁCH CÁC CHƯƠNG TRÌNH QUYÊN GÓP</h3>
        <div className="charityManagerDetail ">
          <h5>
            Tên Admin : <span>Admin1</span>{" "}
          </h5>
        </div>
        <div className="d-flex justify-content-between charityManagerDetail ">
          <div>
            <Filter
              filterCharity={filterCharity}
              resetFilter={resetFilter}
              checked={checked}
              setCheckedCheckBox={setCheckedCheckBox}
              checkedRadio={checkedRadio}
              setCheckedRadio={setCheckedRadio}
            />
          </div>
          <div className="align-self-end">
            <NavLink className="btn btn-primary " to="/admin/addCharity">
              TẠO CHƯƠNG TRÌNH QUYÊN GÓP
            </NavLink>
          </div>
        </div>
        {resultFilter ? (
          <>
            {resultFilter.length > 0 ? (
              <CharityList
                charities={resultFilter}
                deleteCharity={deleteCharity}
              />
            ) : (
              <h5>Không có dữ liệu</h5>
            )}
          </>
        ) : (
          <>
            <CharityList charities={charities} deleteCharity={deleteCharity} />
          </>
        )}
      </div>
    </section>
  );
}

export default CharityManager;
