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

const deleteNotes=(data)=>{
  const token = localStorage.getItem("token");
  let reqobj = {
    method: "delete",
    url: url.baseURL + "/notes/delete",
    headers: {
      authorization: `bearer ${token}`,
    },
    data:data
  };
  return AxiosHelper.del(reqobj)
  .then(response=>{
    return response;
  })
  .catch(err=>{
    return err;
  })
}

const updateNotes=(data)=>{
  const token = localStorage.getItem("token");
  let reqobj = {
    method: "put",
    url: url.baseURL + "/notes/update",
    headers: {
      authorization: `bearer ${token}`,
    },
    data:data
  };
  return AxiosHelper.update(reqobj)
  .then(response=>{
    return response;
  })
  .catch(err=>{
    return err;
  })
}


const setImage=(data)=>{
  const token = localStorage.getItem("token");
  let reqobj = {
    method: "post",
    url: "http://localhost:4000/notes/upload-image",
    headers: {
      authorization: `bearer ${token}`,
    },
    data:data
  };
  return AxiosHelper.post(reqobj)
  .then(response=>{
    console.log(response,"in then");
    return response;
  })
  .catch(err=>{
    console.log(err,"in err");
    throw err;
  })
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getNotes, createNotes,deleteNotes,updateNotes,setImage};