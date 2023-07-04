import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../AppState/Actions/loginactions";

const Logout = () => {
  const lgn = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log(lgn.login.username);
  dispatch(logoutAction(lgn.login.username));

  return (
    <div>
      <h1>
        Logged out successfully! click <Link to="/login">here</Link> to login
      </h1>
    </div>
  );
};

export default Logout;
