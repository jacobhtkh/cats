import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});

AxiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
