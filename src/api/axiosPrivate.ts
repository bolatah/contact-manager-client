import axios from "axios";
const baseUrl = `${process.env.REACT_APP_URL}`;

const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosPrivate;
