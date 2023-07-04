import axios from "axios";
import { StringConstant } from "../Constants/StringConstant";
export const REQUEST_METHODS = {
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};

export const ServiceCall = {
  getApi: (url) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },

  deleteApi: (url) => {
    return new Promise(function (resolve, reject) {
      axios
        .delete(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
  postApi: (url, mem) => {
    return new Promise(function (resolve, reject) {

      axios
        .post(url, mem)
        .then((response) => {
          alert(StringConstant.memberAdded + response.data.memId);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
  putApi: (url ,mem) => {
    return new Promise(function (resolve, reject) {
  axios
      .put(url, mem)
      .then((response) => {
        resolve(response);
        alert(StringConstant.memberUpdated + response.data.memId);
      })
      .catch((error) => reject(error));
  });
}};

export const VehicleServiceCall = {
  getApi: (url) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
  postApi: (url, vehicle) => {
    return new Promise(function (resolve, reject) {

      axios
        .post(url, vehicle)
        .then((response) => {
          alert(StringConstant.vehicleAdded + response.data.id);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },

  putApi: (url, vehicle) => {
    return new Promise(function (resolve, reject) {
      axios
        .put(url, vehicle)
        .then((response) => {
          resolve(response);
          alert(StringConstant.vehicleUpdated + response.data.id);
        })
        .catch((error) => reject(error));
    });
  },
  deleteApi: (url) => {
    return new Promise(function (resolve, reject) {
      axios
        .delete(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
};
export const LoginServiceCall = {
 postApi: (url,login) => {
  return new Promise(function (resolve, reject) {
    axios
    .post(url,login)
    .then((response) => {
     
      resolve(response);
    })
    .catch ((error) => reject(error));
  });
 },
 patchApi: (url,username) => {
  return new Promise(function (reslove, reject){
    axios
    .patch(url,username)
    .then((response) =>{
      alert(StringConstant.logoutMsg);
      reslove(response);
    })

.catch ((error) => reject(error));
  });
 },
};
