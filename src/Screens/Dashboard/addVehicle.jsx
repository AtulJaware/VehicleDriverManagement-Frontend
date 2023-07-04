import React from "react";
import { useParams } from "react-router-dom";
import { VehicleServiceCall } from "../../Services/ServiceMethod";
import { VehicleApiConstant } from "../../Constants/ApiConstant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";

const AddVehicle = () => {
  //value,name,handleOnChange(),hanleSubmit
  //react hook methods-useState() - define state of component
  //useEffect - called at the time of page loading and when there is change in state
  const params = useParams();
  console.log(params);
  // Define state using useState
  let navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    registrationNumber: "",
    model: "",
    fuelType: "",
    isInsured: "",
    isInMaintenance: "",
    colour: "",
    seatingCapacity: "",
    engineNumber: "",
    vehicleType: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    registrationNumber: Joi.string().required(),
    model: Joi.string().required(),
    fuelType: Joi.string().required(),
    isInsured: Joi.string().required(),
    isInMaintenance: Joi.string().required(),
    colour: Joi.string().required(),
    seatingCapacity: Joi.number().integer().required(),
    engineNumber: Joi.string().required(),
    vehicleType: Joi.string().required(),
  };

  const validate = () => {
    const errors = {}; //object type local variable
    const result = Joi.validate(vehicle, schema, {
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

  // define state
  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy vehicle details to newVehicle obj
    const newVehicle = { ...vehicle };

    //update newvehicle object
    newVehicle[event.target.name] = event.target.value;

    // update vehicle obj with newVehicle obj details
    setVehicle(newVehicle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call validate function
    // validate login details with schema
    setErrors(validate());

    if (errors) return;
    VehicleServiceCall.postApi(VehicleApiConstant.postVehicle, vehicle)
      .then(() => {
        navigate("/vehicles");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(vehicle);
  return (
    <div>
      <div className="w-50 mx-auto mt-3">
        <p className="display-6 border border-primary rounded mt-4 p-2 shadow p-3 mb-5 bg-body rounded">
          Add New Vehicle
        </p>
        <form
          onSubmit={handleSubmit}
          className="border border-secondary rounded mt-4 p-2 shadow p-3 mb-5 bg-body rounded"
        >
          <p className="text-center fs-4 bg-secondary text-white">
            Add New Vehicle
          </p>
          <div className="mb-3">
            <label
              htmlFor="registrationNumber"
              className="form-label float-start"
            >
              Registration Number
            </label>
            <input
              type="text"
              className="form-control"
              id="registrationNumber"
              value={vehicle.registrationNumber}
              name="registrationNumber"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">{errors.registrationNumber}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="model" className="form-label float-start">
              Model
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              value={vehicle.model}
              name="model"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.model}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="fuelType" className="form-label float-start">
              Fuel Type
            </label>
            <input
              type="text"
              className="form-control"
              id="fuelType"
              value={vehicle.fuelType}
              name="fuelType"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.fuelType}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="isInsured" className="form-label float-start">
              Is Insured ?
            </label>
            <select
              type="text"
              className="form-control"
              aria-label="Default select example"
              id="isInsured"
              name="isInsured"
              value={vehicle.isInsured}
              onChange={handleChange}
            >
              <option></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors && (
              <small className="text-danger">{errors.isInsured}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="isInMaintenance" className="form-label float-start">
              Is In Maintenance ?
            </label>
            <select
              type="text"
              className="form-control"
              aria-label="Default select example"
              id="isInMaintenance"
              name="isInMaintenance"
              value={vehicle.isInMaintenance}
              onChange={handleChange}
            >
              <option></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors && (
              <small className="text-danger">{errors.isInMaintenance}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="colour" className="form-label float-start">
              Colour
            </label>
            <input
              type="text"
              className="form-control"
              id="colour"
              value={vehicle.colour}
              name="colour"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.colour}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="seatingCapacity" className="form-label float-start">
              Seating Capacity
            </label>
            <input
              type="text"
              className="form-control"
              id="seatingCapacity"
              value={vehicle.seatingCapacity}
              name="seatingCapacity"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">{errors.seatingCapacity}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="engineNumber" className="form-label float-start">
              Engine Number
            </label>
            <input
              type="text"
              className="form-control"
              id="seatingCapacity"
              value={vehicle.engineNumber}
              name="engineNumber"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">{errors.engineNumber}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleType" className="form-label float-start">
              Vehicle Type
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleType"
              value={vehicle.vehicleType}
              name="vehicleType"
              onChange={handleChange}
            />
            {errors && (
              <small className="text-danger">{errors.vehicleType}</small>
            )}
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddVehicle;
