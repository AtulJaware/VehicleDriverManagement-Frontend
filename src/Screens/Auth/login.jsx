import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../AppState/Actions/loginactions";
import Joi from "joi-browser";
import { StringConstant } from "../../Constants/StringConstant";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errRes, setErrRes] = useState("");

  // Define schema to validate email and password
  const schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(5).max(30).required(),
  };

  // Validate
  const validate = () => {
    const errors = {}; //object type local variable
    const result = Joi.validate(login, schema, {
      abortEarly: false,
    });
    console.log(result);
    // setting error messages to error properties
    // ex: errors[username] = "username is required";
    // ex: errors[password] = "password is required";
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  // connect store to get login and errMsg info

  const lgn = useSelector((state) => state.login);

  //setErrRes(useSelector((state) => state.login.errMsg));

  const handleChange = (event) => {
    const newLogin = { ...login };
    newLogin[event.target.name] = event.target.value;
    setLogin(newLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call validate function
    // validate login details with schema
    setErrors(validate());

    if (errors) return;

    // dispatch login action to rest api
    dispatch(
      loginAction(login, (status) => {
        if (status) {
          setTimeout(() => {
            if (lgn.login.loggedIn) {
              navigate("/user/home");
              alert(StringConstant.successMessage);
            } else {
              console.log("*********" + lgn.errMsg);
              setErrRes(lgn.errMsg);
            }
          }, 100);
        }
      })
    );
    // Based on loggedIn state redirect user to home or any other page
  };
  console.log(login);

  return (
    <div className="w-25 mx-auto mt-4">
      <p className="display-6">Login</p>
      {errRes && <p className="alert alert-danger">{errRes}</p>}
      <form
        onSubmit={handleSubmit}
        className="border border-secondary rounded mt-4 p-2 shadow p-3 mb-5 bg-body rounded"
      >
        <p className="text-center fs-4 bg-secondary text-white">Login</p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            name="username"
            value={login.username}
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
          {errors && <small className="text-danger">{errors.password}</small>}
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </div>
        <br></br>
        <div className="input__group">
          <Link to="/register">Don't have an Account? Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
