import axios from "axios";
import Cookies from "js-cookie";

export const request = axios.create({ baseURL: "http://localhost:3000" });

request.interceptors.request.use(
  (config) => {
    const token = Cookies.get("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
