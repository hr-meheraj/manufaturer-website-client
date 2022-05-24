import axios from 'axios';

const privateAxios = axios.create();

privateAxios.interceptors.request.use(
  function (config) {
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        'accessToken'
      )}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  function (response) {

    return response;
  },
  function (error) {
   
    return Promise.reject(error);
  }
);

export default privateAxios;
