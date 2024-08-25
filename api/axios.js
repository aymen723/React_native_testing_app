import axios from "axios";

const options = {
  method: "GET",
  hostname: "https://api.freeapi.app/api/v1",
  port: null,
  path: null,
};

const axiosInstance = axios.create({
  baseURL: options.hostname,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers you need
  },
});

export default axiosInstance;
