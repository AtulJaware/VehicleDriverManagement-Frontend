import React from "react";
import { useParams } from "react-router-dom";
import { ServiceCall } from "../../Services/ServiceMethod";
import { DriverApiConstant } from "../../Constants/ApiConstant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import { StringConstant } from "../../Constants/StringConstant";

const AddDriver = () => {
  const params = useParams();
  console.log(params);

  // Define state using useState
  let navigate = useNavigate();

  // define state
  const [mem, setMem] = useState({
    id: "1",
    name: "",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    alternateContactNumber: "",
    drivingLicenseNumber: "",
    drivingLicenseExpiryDate: "",
    email: "",
    alternateEmail: "",
    emergencyContactPerson: "",
    emergencyContactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const schema = {
    id: Joi.required(),
    name: Joi.string().required(),
    dateOfBirth: Joi.date().iso().required(),
    address: Joi.string().required(),
    contactNumber: Joi.number().integer().required(),
    alternateContactNumber: Joi.number().integer().required(),
    drivingLicenseNumber: Joi.string().required(),
    drivingLicenseExpiryDate: Joi.date().iso().required(),
    email: Joi.string().required(),
    alternateEmail: Joi.string().required(),
    emergencyContactPerson: Joi.string().required(),
    emergencyContactNumber: Joi.string().required(),
  };

  const validate = () => {
    const errors = {}; //object type local variable
    const result = Joi.validate(mem, schema, {
      abortEarly: false,
    });
    console.log(result);
    // setting error messages to error properties
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy mem details to newMem obj
    const newMem = { ...mem };

    newMem[event.target.name] = event.target.value;

    // update mem obj with newMem obj details
    setMem(newMem);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call validate function
    // validate member details with schema
    setErrors(validate());
    if (errors) return;

    ServiceCall.postApi(DriverApiConstant.postDriver, mem)
      .then(() => {
        alert(StringConstant.driverAdded);
        navigate("/drivers");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="w-50 mx-auto mt-3">
        <p className="display-6 border border-primary rounded mt-4 p-2 shadow p-3 mb-5 bg-body rounded">
          Add New Driver
        </p>
        <form
          className="border border-secondary rounded mt-4 p-2 shadow p-3 mb-5 bg-body rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label float-start">
              Driver Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={mem.name}
              name="name"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.name}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label float-start">
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={mem.dateOfBirth}
              name="dateOfBirth"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">{errors.dateOfBirth}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label float-start">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={mem.address}
              name="address"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.address}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label float-start">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              value={mem.contactNumber}
              name="contactNumber"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">{errors.contactNumber}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="alternateContactNumber"
              className="form-label float-start"
            >
              Alternate Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="alternateContactNumber"
              value={mem.alternateContactNumber}
              name="alternateContactNumber"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">
                {errors.alternateContactNumber}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="drivingLicenseNumber"
              className="form-label float-start"
            >
              Driving License Number
            </label>
            <input
              type="text"
              className="form-control"
              id="drivingLicenseNumber"
              value={mem.drivingLicenseNumber}
              name="drivingLicenseNumber"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">
                {errors.drivingLicenseNumber}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="drivingLicenseExpiryDate"
              className="form-label float-start"
            >
              Driving License ExpiryDate
            </label>
            <input
              type="date"
              className="form-control"
              id="drivingLicenseExpiryDate"
              value={mem.drivingLicenseExpiryDate}
              name="drivingLicenseExpiryDate"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">
                {errors.drivingLicenseExpiryDate}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label float-start">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={mem.d_no}
              name="email"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="alternateEmail" className="form-label float-start">
              Alternate Email
            </label>
            <input
              type="email"
              className="form-control"
              id="alternateEmail"
              value={mem.alternateEmail}
              name="alternateEmail"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">{errors.alternateEmail}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="emergencyContactPerson"
              className="form-label float-start"
            >
              Emergency Contact Person
            </label>
            <input
              type="text"
              className="form-control"
              id="emergencyContactPerson"
              value={mem.emergencyContactPerson}
              name="emergencyContactPerson"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">
                {errors.emergencyContactPerson}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="emergencyContactNumber"
              className="form-label float-start"
            >
              Emergency Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="emergencyContactNumber"
              value={mem.emergencyContactNumber}
              name="emergencyContactNumber"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">
                {errors.emergencyContactNumber}
              </small>
            )}
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddDriver;
