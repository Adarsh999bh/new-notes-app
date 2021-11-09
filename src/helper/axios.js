import axios from "axios";

const post = (requestObject) => {
  return axios({
    method: requestObject.method,
    url: requestObject.url,
    headers: requestObject.headers,
    data: requestObject.data,
  });
};

export default {post};

// 1. scss
// 2. fragments 
// 3. hooks
// 4. link in router
// 5. jest and enzyme