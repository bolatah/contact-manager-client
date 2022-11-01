import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const baseUrl = `${process.env.REACT_APP_URL}`;

const useAxiosPrivate = () => {
  const userContext = useContext(UserContext);
  const axiosPrivate = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${userContext.userState.accessToken}`,
    },
    withCredentials: true,
  });
  return axiosPrivate;
};

export default useAxiosPrivate;
