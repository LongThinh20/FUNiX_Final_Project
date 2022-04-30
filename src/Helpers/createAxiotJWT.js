// import Axios from "axios";
// import jwt_decode from "jwt-decode";
// import { domain } from "../Config/config";

// const refreshToken = async () => {
//   try {
//     const res = await Axios.post(`${domain}/auth/resetToken`, {
//       withCredentials: true
//     });
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const createAxios = () => {
//   const axiosJWT = Axios.create();

//   Axios.interceptors.request.use(
//     async (config) => {
//       let date = new Date();
//       const decodeToken = jwt_decode(JSON.parse(token));

//       console.log(decodeToken);

//       if (decodeToken.exp < date.getTime() / 1000) {
//         const data = await refreshToken();

//         localStorage.setItem("token", JSON.stringify(data));

//         config.headers["Authorization"] = "Bearer " + data;
//       }
//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
//   );
// };
