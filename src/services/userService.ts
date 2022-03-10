import { User } from "../models/user";
import axios from "axios";
const apiBaseUrl = `${process.env.REACT_APP_API}/users`;

const privateHeaderOptions = {
  "access-token": `${localStorage.getItem("access-token")}`,
  //"refresh-token": `${localStorage.getItem("refresh-token")}`,
};

const publicHeaderOptions = {
  "content-type": "application/json",
  Accept: "application/json",
};

// const headerOptions = {
//   ...privateHeaderOptions,
//   ...publicHeaderOptions,
// } as any;

const publicInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: publicHeaderOptions,
});

const privateInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: privateHeaderOptions,
  withCredentials: true,
});

const refreshToken = async () => {
  const res = await privateInstance.post(`${apiBaseUrl}/refresh`, {
    withCredentials: true,
  });
  localStorage.setItem("access-token", `${res.data.accessToken}`);
  //localStorage.setItem("refreshToken", `${res.data.refreshToken}`);
  return res.data.accessToken;
};

// privateInstance.interceptors.request.use(
//   (config) => {
//     if (!config.headers["access-token"]) {
//       config.headers["access-token"] = localStorage.getItem(`${accessToken}`);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

privateInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = refreshToken();
      console.log(newAccessToken);
      prevRequest.headers["access-token"] = `${newAccessToken}`;
      return privateInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);
// return () => {
//   privateInstance.interceptors.response.eject(responseIntercept)
// }

export class UserService {
  saveUser = async (user: User): Promise<Response> => {
    return await publicInstance.post(`${apiBaseUrl}/register`, user);
  };

  getUser = async (user): Promise<void> => {
    await publicInstance
      .post(`${apiBaseUrl}/login`, {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("access-token", `${response.data.accessToken}`);
        //localStorage.setItem("refresh-token", `${response.data.refreshToken}`);
      });
  };

  getUserList = async (): Promise<Response> => {
    return await privateInstance.get(apiBaseUrl);
  };

  deleteUserById = async (id: number): Promise<Response> => {
    return await privateInstance.delete(apiBaseUrl + "/" + id);
  };
}
