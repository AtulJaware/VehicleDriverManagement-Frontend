import { LoginServiceCall } from "../../Services/ServiceMethod";
import { LoginApiConstant } from "../../Constants/ApiConstant";

// login action
export const loginAction = (login,callback) => (dispatch) => {
 LoginServiceCall.postApi(LoginApiConstant.postLogin,login)
    .then((res) => {
      console.log(res);
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      callback(true)
    })
    .catch((error) => {
      console.log(error.response);
      alert(error.response.data.message);
      dispatch({
        type: "ERR_RES",
        payload: error.response.data.message,
      });
      callback(false)
    });
};

// logout action
export const logoutAction = (username) => async (dispatch) => {
 const result = await LoginServiceCall.patchApi(LoginApiConstant.patchLogin(username))
  console.log(result);
  console.log(result.data);
  dispatch({
    type: "LOGOUT",
    payload: result.data,
  });
};
