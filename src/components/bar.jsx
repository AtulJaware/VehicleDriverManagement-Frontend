import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppConstant } from "../Constants/AppConstant";

const Bar = () => {
  const login = useSelector((state) => state.login.login);
  var yes = true;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <b>{AppConstant.AppName}</b>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {login.loggedIn ? (
              <li className="nav-item">
                <NavLink to="/user/home" className="nav-link">
                  Home
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
              </li>
            )}
            {login.loggedIn === yes && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/drivers">
                  Drivers
                </NavLink>
              </li>
            )}
            {login.loggedIn === yes && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/vehicles">
                  Vehicles
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {login.loggedIn === yes && (
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  <i className="bi bi-power"></i> <br></br>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Bar;
