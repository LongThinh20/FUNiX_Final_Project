import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

import PageNotFound from "./Screens/PageNoteFound/index";
import CharityManager from "./Screens/Admin/CharityManager";
import Header from "./Screens/Admin/Components/Header";
import AddCharityPage from "./Screens/Admin/AddCharityPage";

import charities from "./data/data";

function Main() {
  //test

  const [resultFilter, setResultFilter] = useState();
  const [checked, setCheckedCheckBox] = useState();
  const [checkedRadio, setCheckedRadio] = useState();
  const CHARITIES = charities;

  //

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleAdd = (charity) => {};

  const handleUpdate = (charity) => {};
  //handle filter
  const handeFilter = (condition) => {
    console.log(condition);
    function xetdk(value) {
      if (this.expectedMoney === 1) {
        return value.expectedMoney < 50000000 && this.status === value.status;
      } else if (this.expectedMoney === 2) {
        return (
          value.expectedMoney >= 50000000 &&
          value.expectedMoney <= 200000000 &&
          this.status === value.status
        );
      } else {
        return value.expectedMoney > 200000000 && this.status === value.status;
      }
    }

    function xetdk1(value) {
      if (this.expectedMoney === 1) {
        return value.expectedMoney < 50000000;
      } else if (this.expectedMoney === 2) {
        return (
          value.expectedMoney >= 50000000 && value.expectedMoney <= 200000000
        );
      } else {
        return value.expectedMoney > 200000000;
      }
    }

    function xetdk2(value) {
      return this.status === value.status;
    }

    if (condition.status === undefined) {
      setResultFilter(CHARITIES.filter(xetdk1, condition));
    }
    if (condition.expectedMoney === undefined) {
      setResultFilter(CHARITIES.filter(xetdk2, condition));
    }
    if (condition.expectedMoney && condition.status) {
      setResultFilter(CHARITIES.filter(xetdk, condition));
    }
  };

  const handleResetFilter = () => {
    setResultFilter();
    setCheckedCheckBox();
    setCheckedRadio();
  };

  //get charity for EditCharity Page
  const CharityWithId = ({ match }) => {
    return (
      <AddCharityPage
        getCharityUpdate={handleUpdate}
        Id={match.params.charityId}
        charity={charities.filter(
          (charity) => charity.id === parseInt(match.params.charityId, 10)
        )}
      />
    );
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/admin/charity"
          render={() => (
            <CharityManager
              charities={CHARITIES}
              resultFilter={resultFilter}
              deleteCharity={handleDelete}
              filterCharity={handeFilter}
              resetFilter={handleResetFilter}
              checked={checked}
              setCheckedCheckBox={setCheckedCheckBox}
              checkedRadio={checkedRadio}
              setCheckedRadio={setCheckedRadio}
            />
          )}
        />
        <Route
          exact
          path="/admin/addCharity"
          render={() => <AddCharityPage getAddCharity={handleAdd} />}
        />
        <Route path="/admin/addCharity/:charityId" component={CharityWithId} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Main;
