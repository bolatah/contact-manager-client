import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

// const baseURL = 'http://127.0.0.1:8000'

const apiBaseUrl = `${process.env.REACT_APP_API}/contacts`;

const headerOptions = {
  "Content-type": "application/json",
  Accept: "application/json",
  "access-token": `${window.localStorage.getItem("access-token")}`,
  "refresh-token": `${window.localStorage.getItem("refresh-token")}`,
  "x-access-token-expiration": `${window.localStorage.getItem(
    "x-access-token-expiration"
  )}`,
};

let authTokens = localStorage.getItem("access-token")
  ? JSON.parse(localStorage.getItem("access-token"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  // headers:{Authorization: `Bearer ${authTokens?.access}`}
  headerOptions,
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    // req.headers.Authorization = `Bearer ${authTokens?.access}`
  }

  const user = jwt_decode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/api/token/refresh/`, {
    refresh: authTokens.refresh,
  });

  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
