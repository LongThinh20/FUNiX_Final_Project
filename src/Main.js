import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";

import PageNotFound from "./Screens/PageNoteFound/index";
import CharityManager from "./Screens/Admin/CharityManager";
import Header from "./Screens/Admin/Components/Header";
import AddCharityPage from "./Screens/Admin/AddCharityPage";

import {
  fetchCharity,
  deleteCharity,
  addCharity,
  fetchOrganization,
  editCharity
} from "./Redux/actionCreators";

function Main() {
  const dispatch = useDispatch();

  const CHARITY = useSelector((state) => state.charity.charity);
  const ORGANIZATION = useSelector((state) => state.organization.organization);

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

    // dispatch(deleteCharity(id));
  };

  const handleAdd = (charity) => {
    dispatch(addCharity(charity));
  };

  const handleUpdate = (charity) => {
    dispatch(editCharity(charity));
  };

  const handleSearch = (text) => {
    const searchResult = CHARITY.filter((charity) =>
      charity.name.toUpperCase().includes(text.toUpperCase())
    );

    console.log(searchResult);
  };

  // useEffect(() => {
  //   dispatch(fetchCharity());
  //   dispatch(fetchOrganization());
  // }, [dispatch]);

  const CharityWithId = ({ match }) => {
    return (
      <AddCharityPage
        getCharityUpdate={handleUpdate}
        Id={match.params.charityId}
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
              Organization={ORGANIZATION}
              Charity={CHARITY}
              deleteCharity={handleDelete}
              handleSearch={handleSearch}
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
