import axiosHelper from '../helper/axios';
const url = require('../config/local');

const register = (data) => {
    let reqObj = {
      method: "post",
      url: url.baseURL+"/user",
      headers: {
        "Content-type": "application/json",
      },
      data: data,
    };
    return axiosHelper.post(reqObj)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  };

const login = (data) => {
    let reqObj = {
      method: "post",
      url: url.baseURL+"/user/login",
      headers: {
        "Content-type": "application/json",
      },
      data: data,
    };
    return axiosHelper.post(reqObj)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  };

  const forgetPassword = (data) => {
    let reqobj = {
      method: "post",
      url: url.baseURL+"/user/forgot",
      headers: {
        "Content-type": "application/json",
      },
      data: data,
    };
    return axiosHelper.post(reqobj)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  };

  export default {register,login,forgetPassword}