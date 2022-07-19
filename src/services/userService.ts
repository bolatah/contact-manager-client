import { IUser } from "../interfaces/user";
import axios, { AxiosResponse } from "axios";
import axiosPublic from "../api/axiosPublic";
//mport useAxiosPrivate from "hooks/useAxiosPrivate";
import axiosPrivate from "api/axiosPrivate";
const usersUrl = `${process.env.REACT_APP_URL}/users`;

const SaveUser = async (user: IUser): Promise<AxiosResponse> => {
  return await axiosPublic.post(`${usersUrl}/register`, user);
};

const LoginUser = async (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return await axiosPublic.post(`${usersUrl}/login`, {
    username,
    password,
    withCredentials: true,
  });
};

const HandleRefreshToken = async (): Promise<AxiosResponse> => {
  return await axios.get(`${usersUrl}/refresh`, { withCredentials: true });
};

const LogoutUser = async (): Promise<AxiosResponse> => {
  return await axiosPrivate.delete(`${usersUrl}/logout`, {});
};

const GetUserList = async (): Promise<AxiosResponse> => {
  return await axiosPrivate.get(usersUrl);
};

const DeleteUserById = async (id: number): Promise<AxiosResponse> => {
  return await axiosPrivate.delete(usersUrl + "/" + id);
};
const HandleTest = async (): Promise<AxiosResponse> => {
  return await axiosPublic.post(`${usersUrl}/test`);
};

const userService = {
  SaveUser,
  LoginUser,
  HandleRefreshToken,
  LogoutUser,
  GetUserList,
  DeleteUserById,
  HandleTest,
};
export default userService;
