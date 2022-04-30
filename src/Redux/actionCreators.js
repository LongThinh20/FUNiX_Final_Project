import Axios from "axios";
import * as ActionTypes from "./actionTypes";
import Swal from "sweetalert2";
import { domain } from "../Config/config";

Axios.defaults.withCredentials = true;

export const fetchUser = async (token, dispatch, axiosJWT) => {
  try {
    const result = await axiosJWT({
      method: "get",
      url: `${domain}/auth/me`,
      headers: {
        Authorization: `Bearer ${token} `
      }
    });

    return dispatch(addUserCurrent(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = (users) => {
  return {
    type: ActionTypes.GET_USERS,
    payload: users
  };
};

//post login
export const postLogin = async (user) => {
  try {
    const res = await Axios({
      method: "POST",
      url: `${domain}/auth/login`,
      data: user
    });

    console.log("token", res.data);

    localStorage.setItem("token", JSON.stringify(res.data));

    return window.location.replace("/");
  } catch (err) {
    return console.log(err);
  }
};
//
export const postLogout = (token) => async (dispatch) => {
  try {
    const result = await Axios({
      method: "POST",
      url: `${domain}/auth/logout`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(logoutUser(result));
    localStorage.removeItem("token");
    return window.location.replace("/");
  } catch (err) {
    console.log(err);
  }
};

export const addUserCurrent = (user) => {
  return {
    type: ActionTypes.CURRENT_USER,
    payload: user
  };
};

export const logoutUser = () => {
  return {
    type: ActionTypes.LOGOUT_USER
  };
};
//get charity
export const fetchCharities = async (dispatch) => {
  try {
    const res = await Axios({
      method: "get",
      url: `${domain}/admin/allCharity`
    });
    return dispatch(getCharity(res.data));
  } catch (err) {
    return console.log(err);
  }
};

export const getCharity = (charity) => {
  return {
    type: ActionTypes.GET_CHARITY,
    payload: charity
  };
};

//delete
export const deleteCharity = (id) => async (dispatch) => {
  try {
    const res = await Axios({
      method: "DELETE",
      url: `${domain}/admin/deleteOneCharity/${id}`
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Xóa Thành công !",
      showConfirmButton: false,
      timer: 2000
    });
    dispatch(fetchCharities());
  } catch (err) {
    return console.log(err);
  }
};

//add
export const addCharity = (charity) => async (dispatch) => {
  try {
    await Axios({
      method: "POST",
      url: `${domain}/admin/addCharity`,
      data: charity
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thêm thành công !",
      showConfirmButton: false,
      timer: 2000
    });
    dispatch(fetchCharities());
    return window.location.replace("/admin/charity");
  } catch (err) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Thất bại !",
      showConfirmButton: false,
      timer: 2000
    });
    console.error(err);
  }
};
//post editCharity

export const editCharity = (charity) => async (dispatch) => {
  try {
    await Axios({
      method: "POST",
      url: `${domain}/admin/editCharity`,
      data: charity
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cập nhật thành công !",
      showConfirmButton: false,
      timer: 2000
    });
    dispatch(fetchCharities());
    return window.location.replace("/admin/charity");
  } catch (err) {
    return console.log(err);
  }
};

//get all User

export const fetchUsers = async (token, dispatch) => {
  try {
    const res = await Axios({
      method: "GET",
      url: `${domain}/admin/allUser`,
      headers: {
        Authorization: `Bearer ${token} `
      }
    });
    return dispatch(getUsers(res.data));
  } catch (err) {
    return console.log(err);
  }
};

//filter user

export const filterUser = (searchTerm) => async (dispatch) => {
  try {
    const res = await Axios({
      method: "get",
      url: `${domain}/admin/filterUser?userName=${searchTerm.userName}&phone=${searchTerm.phone}`,
      withCredentials: true
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
