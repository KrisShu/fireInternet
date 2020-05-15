import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL: "http://fd.sctsjkj.com:5081",
  timeout: 60000
});

axios.defaults.withCredentials=true

service.interceptors.request.use(
  function(config) {
    NProgress.start();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function(response) {
    NProgress.done();
    return Promise.resolve(response.data);
  },
  function(error) {
    NProgress.done();
    return  Promise.reject(error.response.data);
  }
);

export default service;
