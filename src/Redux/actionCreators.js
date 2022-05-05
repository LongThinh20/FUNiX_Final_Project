import Axios from "axios";
import * as ActionTypes from "./actionTypes";
import Swal from "sweetalert2";
import { domain } from "../Config/config";

Axios.defaults.withCredentials = true;

const token = JSON.parse(localStorage.getItem("token"));

export const fetchUser = async (token, dispatch, textJWt) => {
  try {
    const result = await textJWt({
      method: "get",
      url: `${domain}/auth/me`,
      headers: {
        Authorization: `Bearer ${token} `
      }
    });

    return dispatch(addUserCurrent(result.data));
  } catch (err) {
    console.error(err);
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
export const postLogout = async (token, dispatch, axiosJWT) => {
  try {
    const result = await axiosJWT({
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

export const fetchCharitiesForClient = async (dispatch) => {
  try {
    const res = await Axios({
      method: "get",
      url: `${domain}/allCharity`
    });
    return dispatch(getCharity(res.data));
  } catch (err) {
    return console.log(err);
  }
};
//get charity
export const fetchCharities = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT({
      method: "get",
      url: `${domain}/admin/allCharity`,
      headers: {
        Authorization: `Bearer ${token}`
      }
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
export const deleteCharity = async (token, id, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT({
      method: "DELETE",
      url: `${domain}/admin/deleteOneCharity/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Xóa thành công!",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        fetchCharities(dispatch);
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Thất bại", "Xóa thất bại", "error");
  }
};

//add
export const addCharity = async (token, charity, dispatch, axiosJWT) => {
  try {
    await axiosJWT({
      method: "POST",
      url: `${domain}/admin/addCharity`,
      data: charity,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thêm thành công !",
      showConfirmButton: false,
      timer: 2000
    });
    fetchCharities(dispatch);
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
export const filterUser = async (searchTerm, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT({
      method: "get",
      url: `${domain}/admin/filterUser?userName=${searchTerm.userName}&phone=${searchTerm.phone}`,
      headers: {
        Authorization: `Bearer ${token} `
      }
    });

    if (res.data) {
      dispatch(getUsers(res.data));
    }
  } catch (err) {
    console.log(err);
  }
};

//checkpass
export const checkPass = async (token, pass) => {
  try {
    const res = await Axios({
      method: "post",
      url: `${domain}/auth/checkMe`,
      headers: {
        Authorization: `Bearer ${token} `
      },
      data: pass
    });
    if (res.data) {
      window.location.replace("/password/changePass");
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Thất bại", "Mật khẩu không đúng", "error");
  }
};

export const sigup = async (user) => {
  try {
    const result = await Axios({
      method: "post",
      url: `${domain}/auth/sigup`,
      data: user
    });

    if (result.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Kiểm tra email để đăng nhập !",
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        return window.location.replace("/");
      });
    }
  } catch (err) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Đăng ký thất bại",
      showConfirmButton: false,
      timer: 2000
    });
    console.log(err);
  }
};

export const deleteUser = async (token, id, dispatch, axiosJWT) => {
  try {
    const result = await axiosJWT({
      method: "get",
      url: `${domain}/admin/deleteUser/${id}`,
      headers: {
        Authorization: `Bearer ${token} `
      }
    });
    if (result.data) {
      Swal.fire("Đã xóa!", "Người dùng đã được xóa", "success");
      return fetchUsers(token, dispatch);
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Thất bại", "Có lỗi xãy ra", "error");
  }
};

export const addUser = async (token, user, dispatch, axiosJWT) => {
  try {
    const result = await axiosJWT({
      method: "post",
      url: `${domain}/admin/addUser`,
      headers: {
        Authorization: `Bearer ${token} `
      },
      data: user
    });

    if (result.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thêm người dùng thành công",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        fetchUsers(token, dispatch);
        window.location.replace("/admin/user");
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Thất bại", "Có lỗi xãy ra", "error");
  }
};

export const editUser = async (token, user, dispatch, axiosJWT) => {
  try {
    const result = await axiosJWT({
      method: "post",
      url: `${domain}/admin/editUser`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: user
    });
    if (result.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cập nhật người dùng thành công!",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        fetchUsers(token, dispatch);
        return window.location.replace("/admin/user");
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Thất bại", "Có lỗi xãy ra", "error");
  }
};

export const filterCharity = async (searchTerm, dispatch) => {
  try {
    const res = await Axios({
      url: `${domain}/admin/filterCharity?expectedMoney=${searchTerm.expectedMoney}&status=${searchTerm.status}`,
      method: "get"
    });

    if (res.data) {
      dispatch(getCharity(res.data));
    }
  } catch (err) {
    console.log(err);
  }
};
