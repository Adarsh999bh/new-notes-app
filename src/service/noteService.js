import AxiosHelper from "../helper/axios";
const url = require("../config/local");

const getNotes = () => {
  const token = localStorage.getItem("token");
  let reqobj = {
    method: "get",
    url: url.baseURL + "/notes/getnote",
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};
const createNotes=(data)=>{
  const token = localStorage.getItem("token");
  let reqobj = {
    method: "post",
    url: url.baseURL + "/notes/create",
    headers: {
      authorization: `bearer ${token}`,
    },
    data:data
  };
  return AxiosHelper.post(reqobj)
  .then(response=>{
    return response;
  })
  .catch(err=>{
    return err;
  })
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getNotes, createNotes};