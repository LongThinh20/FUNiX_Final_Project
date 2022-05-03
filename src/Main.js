import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

import jwt_decode from "jwt-decode";

import PageNotFound from "./Screens/PageNoteFound/index";

import CharityManager from "./Screens/Admin/CharityManager";
import UserManager from "./Screens/Admin/UserManager";
import Header from "./Components/Header";
import AddCharityPage from "./Screens/Admin/AddCharityPage";

import Home from "./Screens/User/Home";
import LoginPage from "./Screens/User/LoginPage";
import SigupPage from "./Screens/User/SigupPage";
import ChangePasswordPage from "./Screens/User/ChangePasswordPage";

import { domain } from "./Config/config";

import Axios from "axios";

import {
  fetchCharities,
  deleteCharity,
  addCharity,
  editCharity,
  fetchUsers,
  postLogin,
  postLogout,
  fetchUser,
  filterUser,
  checkPass
} from "./Redux/actionCreators";

import { useDispatch, useSelector } from "react-redux";
import AddUserPage from "./Screens/Admin/AddUserPage";
import UserPage from "./Screens/User/UserPage";
import ConfirmPasswordPage from "./Screens/User/ConfirmPasswordPage";

const axiosJWT = Axios.create();

Axios.defaults.withCredentials = true;

const token = JSON.parse(localStorage.getItem("token"));

function Main() {
  const dispatch = useDispatch();

  const [resultFilter, setResultFilter] = useState();
  const [checked, setCheckedCheckBox] = useState();
  const [checkedRadio, setCheckedRadio] = useState();

  //get data from redux
  const CHARITIES = useSelector((state) => state.charities.charities);
  const USERS = useSelector((state) => state.users.users);
  const CURRENT_USER = useSelector((state) => state.users.currentUser);

  //
  const refreshToken = async () => {
    try {
      const res = await Axios({
        url: `${domain}/auth/resetToken`,
        method: "post",
        withCredentials: true
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();

      const decodeToken = jwt_decode(token);

      if (decodeToken.exp < date.getTime() / 1000) {
        const res = await refreshToken();

        if (res) {
          localStorage.setItem("token", JSON.stringify(res));

          config.headers["Authorization"] = "Bearer " + res;
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  //

  useEffect(() => {
    if (token) {
      fetchUser(token, dispatch, axiosJWT);
      fetchUsers(token, dispatch);
    }
    fetchCharities(dispatch);
  }, []);
  //

  //handle Login
  const handleLogin = (user) => {
    dispatch(postLogin(user));
  };

  const handleLogout = () => {
    postLogout(token, dispatch, axiosJWT);
  };

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

  //handleAddCharity
  const handleAddCharity = (charity) => {
    dispatch(addCharity(charity));
  };

  //handleEditCharity
  const handleEditCharity = (charity) => {
    dispatch(editCharity(charity));
  };

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

  //handle add user
  const handleAddUser = (user) => {};

  //handle add user
  const handleCheckPassword = (user) => {
    checkPass(token, user);
  };

  //handele Change pass

  const handleChangePass = (pass) => {
    console.log(pass);
  };

  //handle Filter User

  const handleFilterUser = (searchTerm) => {
    dispatch(filterUser(searchTerm));
  };
  //get charity for EditCharity Page
  const CharityWithId = ({ match }) => {
    return (
      <AddCharityPage
        getEditCharity={handleEditCharity}
        Id={match.params.charityId}
        charity={CHARITIES.filter(
          (charity) => charity._id === match.params.charityId.toString()
        )}
      />
    );
  };

  //fetchData

  return (
    <div>
      <Header user={CURRENT_USER} handleLogout={handleLogout} />
      <Switch>
        <Route
          path="/login"
          exact
          render={() => <LoginPage handleLogin={handleLogin} />}
        />
        <Route path="/sigup" exact render={() => <SigupPage />} />
        <Route path="/user" exact render={() => <UserPage />} />
        <Route
          path="/password"
          exact
          render={() => (
            <ConfirmPasswordPage
              handleCheckPassword={handleCheckPassword}
              user={CURRENT_USER}
            />
          )}
        />
        <Route
          path="/password/changePass"
          render={() => (
            <ChangePasswordPage handleChangePass={handleChangePass} />
          )}
        />
        <Route path="/" exact render={() => <Home charities={CHARITIES} />} />
        <Route
          exact
          path="/admin/charity"
          render={() => (
            <CharityManager
              user={CURRENT_USER}
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
          render={() => (
            <AddCharityPage
              getAddCharity={handleAddCharity}
              user={CURRENT_USER}
            />
          )}
        />
        <Route path="/admin/addCharity/:charityId" component={CharityWithId} />
        <Route
          exact
          path="/admin/user"
          render={() => (
            <UserManager
              users={USERS}
              user={CURRENT_USER}
              handleFilterUser={handleFilterUser}
            />
          )}
        />
        <Route
          exact
          path="/admin/addUser"
          render={() => <AddUserPage getAddUser={handleAddUser} />}
        />
        <Route path="" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Main;
