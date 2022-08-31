import axios, { AxiosRequestConfig } from "axios";

/**
 * tushare行情接口
 */
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_TUSHARE_API,
  timeout: 5000,
});

http.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    // const token = window.sessionStorage.getItem('token')
    // if (token) {
    //   config.headers.token = token
    // }
    return config;
  },
  (error) => {
    return Promise.reject();
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
    Promise.reject();
  },
  (error) => {
    return Promise.reject();
  }
);

export default http;
