import { User } from "../models/user";
import axios from "axios";

// import useAxiosPrivate from "../services/hooks/useAxiosprivate";

axios.defaults.withCredentials = true;

const apiBaseUrl = `${process.env.REACT_APP_API}/users`;

const privateHeaderOptions = {
  "access-token": `${localStorage.getItem("access-token")}`,
};

const publicHeaderOptions = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const publicInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: publicHeaderOptions,
  withCredentials: true,
});

const privateInstance = axios.create({
  headers: privateHeaderOptions,
  withCredentials: true,
});

export const UserService = () => {
  const saveUser = async (user: User): Promise<Response> => {
    return await publicInstance.post(`${apiBaseUrl}/register`, user);
  };

  const getUser = async (user): Promise<void> => {
    await publicInstance
      .post(`${apiBaseUrl}/login`, {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("access-token", `${response.data.accessToken}`);
      });
  };
  const getUserList = async (): Promise<Response> => {
    return await privateInstance.get(apiBaseUrl);
  };

  const deleteUserById = async (id: number): Promise<Response> => {
    return await privateInstance.delete(apiBaseUrl + "/" + id);
  };
  return {
    saveUser,
    getUser,
    getUserList,
    deleteUserById,
  };
};
