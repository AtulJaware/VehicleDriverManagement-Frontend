import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VehicleServiceCall } from "../../Services/ServiceMethod";
import { VehicleApiConstant } from "../../Constants/ApiConstant";

const UpdateVehicle = () => {
  const params = useParams();
  let navigate = useNavigate();
  console.log(params);

  // define state
  const [vehicle, setVehicle] = useState({
    id: "",
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

  //useEffect(callback function,[condition] )
  // get existing vehicle details using id and update vehicle state obj
  useEffect(() => {
    VehicleServiceCall.getApi(VehicleApiConstant.getVehicle(params.id)).then(
      (response) => setVehicle(response.data)
    );
  }, []);

  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy vehicle details to newVehicle obj
    const newVehicle = { ...vehicle };

    //newVehicle.id =10;
    //newVehicle["id"] = 10;
    //update newVehicle object
    newVehicle[event.target.name] = event.target.value;

    // update vehicle obj with newVehicle obj details
    setVehicle(newVehicle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    VehicleServiceCall.putApi(VehicleApiConstant.putVehicle(params.id), vehicle)
      .then(() => {
        navigate("/vehicles");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="w-50 mx-auto mt-3">
        <p className="display-6">Update Vehicle</p>
        <form className="border p-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="useId" className="form-label float-start">
              Vehicle ID
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              value={vehicle.id}
              name="id"
              onChange={handleChange}
              disabled
            />
          </div>
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
          </div>
          <div className="mb-3">
            <label htmlFor="isInsured" className="form-label float-start">
              Is Insured ?
            </label>
            <input
              type="text"
              className="form-control"
              id="isInsured"
              name="isInsured"
              value={vehicle.isInsured}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isInMaintenance" className="form-label float-start">
              isInMaintenance ?
            </label>
            <input
              type="text"
              className="form-control"
              id="isInMaintenance"
              name="isInMaintenance"
              value={vehicle.isInMaintenance}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="colour" className="form-label float-start">
              colour
            </label>
            <input
              type="text"
              className="form-control"
              id="colour"
              value={vehicle.colour}
              name="colour"
              onChange={handleChange}
            />
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
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicle;
