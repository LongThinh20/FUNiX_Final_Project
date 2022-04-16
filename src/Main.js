import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

import PageNotFound from "./Screens/PageNoteFound/index";
import CharityManager from "./Screens/Admin/CharityManager";
import Header from "./Screens/Admin/Components/Header";
import AddCharityPage from "./Screens/Admin/AddCharityPage";
import {
  fetchCharities,
  deleteCharity,
  addCharity
} from "./Redux/actionCreators";

import charities from "./data/data";
import { useDispatch, useSelector } from "react-redux";

function Main() {
  const dispatch = useDispatch();

  const [resultFilter, setResultFilter] = useState();
  const [checked, setCheckedCheckBox] = useState();
  const [checkedRadio, setCheckedRadio] = useState();

  // const CHARITIES = charities;

  //fetchData
  useEffect(() => {
    dispatch(fetchCharities());
  }, [dispatch]);

  //get data from redux
  const CHARITIES = useSelector((state) => state.charities.charities);

  //handleDeleteCharity
  const handleDeleteCharity = (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        dispatch(deleteCharity(id));
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleAddCharity = (charity) => {
    dispatch(addCharity(charity));
  };

  const handleUpdate = (charity) => {};

  //handle filter
  const handeFilter = (condition) => {
    function checkAll(value) {
      switch (this.expectedMoney) {
        case 1:
          return value.expectedMoney < 50000000 && this.status === value.status;
        case 2:
          return (
            value.expectedMoney >= 50000000 &&
            value.expectedMoney <= 200000000 &&
            this.status === value.status
          );
        default:
          return (
            value.expectedMoney > 200000000 && this.status === value.status
          );
      }
    }
    function checkExpectedMoney(value) {
      switch (this.expectedMoney) {
        case 1:
          return value.expectedMoney < 50000000;
        case 2:
          return (
            value.expectedMoney >= 50000000 && value.expectedMoney <= 200000000
          );
        default:
          return value.expectedMoney > 200000000;
      }
    }
    function checkStatus(value) {
      return this.status === value.status;
    }

    if (condition.status === undefined) {
      setResultFilter(CHARITIES.filter(checkExpectedMoney, condition));
    }
    if (condition.expectedMoney === undefined) {
      setResultFilter(CHARITIES.filter(checkStatus, condition));
    }
    if (condition.expectedMoney && condition.status) {
      setResultFilter(CHARITIES.filter(checkAll, condition));
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
              deleteCharity={handleDeleteCharity}
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
          render={() => <AddCharityPage getAddCharity={handleAddCharity} />}
        />
        <Route path="/admin/addCharity/:charityId" component={CharityWithId} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Main;