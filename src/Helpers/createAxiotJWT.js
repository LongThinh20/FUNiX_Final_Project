import { domain } from "../Config/config";
import Axios from "axios";
import jwt_decode from "jwt-decode";

const axiosJWT = Axios.create();

Axios.defaults.withCredentials = true;

const token = JSON.parse(localStorage.getItem("token"));

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

export const testtttt = async () => {
  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();

      const decodeToken = jwt_decode(token);

      if (decodeToken.exp < date.getTime() / 1000) {
        console.log("expToken");

        const res = await refreshToken();

        console.log("newToken", res);

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
};
