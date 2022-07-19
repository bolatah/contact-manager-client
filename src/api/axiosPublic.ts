import axios from "axios";

const baseUrl = `${process.env.REACT_APP_URL}`;

const axiosPublic = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

export default axiosPublic;
