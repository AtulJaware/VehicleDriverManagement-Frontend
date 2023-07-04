import React from "react";
import { useParams } from "react-router-dom";
import { ServiceCall } from "../../Services/RegisterServiceMethods";
import { LoginApiConstant } from "../../Constants/ApiConstant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";

const Register = () => {
  //value,name,handleOnChange(),hanleSubmit
  //react hook methods-useState() - define state of component
  //useEffect - called at the time of page loading and when there is change in state
  const params = useParams();
  console.log(params);

  // Define state using useState
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).max(30).required(),
  };

  const validate = () => {
    const errors = {}; //object type local variable
    const result = Joi.validate(user, schema, {
      abortEarly: false,
    });
    console.log(result);
    // alert(result.error.message);
    // setting error messages to error properties
    // ex: errors[username] = "username is required";
    // ex: errors[password] = "password is required";
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
        alert(item.message);
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  // define state
  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy user details to newUser obj
    const newUser = { ...user };

    //update newUser object
    newUser[event.target.name] = event.target.value;

    // update user obj with newUser obj details
    setUser(newUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call validate function
    // validate login details with schema
    setErrors(validate());

    if (errors) return;
    ServiceCall.userPostApi(LoginApiConstant.postRegister, user)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data);
        console.log(error.response.data);
      });
  };

  console.log(user);
  return (
    <div>
      <div className="w-50 mx-auto mt-3">
        <p className="display-6">Register yourself </p>
        <form
          onSubmit={handleSubmit}
          className="w-50 mx-auto border border-secondary rounded mt-4 p-2 shadow-lg p-3 mb-5 bg-body rounded"
        >
          <p className="text-center fs-4 bg-secondary text-white">Sign up</p>
          <div className="mb-3">
            <label htmlFor="email" className="form-label float-start">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              value={user.username}
              name="username"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label float-start">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={user.password}
              name="password"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
