import Axios from "axios";
import * as ActionTypes from "./actionTypes";

//get charity
export const fetchCharity = () => (dispatch) => {
  return Axios({
    method: "get",
    url: "http://localhost:3001/123"
  })
    .then((res) => dispatch(getCharity(res.data)))
    .catch((err) => console.log(err));
};

export const getCharity = (charity) => {
  return {
    type: ActionTypes.GET_CHARITY,
    payload: charity
  };
};

//delete

export const deleteCharity = (id) => (dispatch) => {
  return Axios({
    method: "DELETE",
    url: `http://localhost:3001/admin/delete123?charityId=${id}`
  })
    .then(() => {
      dispatch(fetchCharity());
    })
    .catch((err) => console.log(err));
};

//add
export const addCharity = (charity) => (dispatch) => {
  return Axios({
    method: "POST",
    url: "http://localhost:3001/admin/123",
    data: charity
  })
    .then(() => dispatch(fetchCharity()))
    .catch((err) => console.log(err));
};

//get charity
export const fetchOrganization = () => (dispatch) => {
  return Axios({
    method: "get",
    url: "http://localhost:3001/organization"
  })
    .then((res) => {
      dispatch(getOrganization(res.data));
    })
    .catch((err) => console.log(err));
};

export const getOrganization = (organization) => {
  return {
    type: ActionTypes.GET_ORGANIZATION,
    payload: organization
  };
};

//post editCharity

export const editCharity = (charity) => (dispatch) => {
  return Axios({
    method: "POST",
    url: "http://localhost:3001/admin/editCharity",
    data: charity
  })
    .then(() => dispatch(fetchCharity()))
    .catch((err) => console.log(err));
};
