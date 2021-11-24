
import axios from "axios";

const post = (requestObject) => {
  return axios({
    method: requestObject.method,
    url: requestObject.url,
    headers: requestObject.headers,
    data: requestObject.data,
  });
};

const get = (requestObject) => {
  return axios({
    method: requestObject.method,
    url: requestObject.url,
    headers: requestObject.headers
  });
};
const del = (requestObject) => {
  return axios({
    method: requestObject.method,
    url: requestObject.url,
    headers: requestObject.headers,
    data:requestObject.data
  });
};
const update = (requestObject) => {
  return axios({
    method: requestObject.method,
    url: requestObject.url,
    headers: requestObject.headers,
    data:requestObject.data
  });
};


export default { post,get,del,update};
