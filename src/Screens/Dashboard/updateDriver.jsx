import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceCall } from "../../Services/ServiceMethod";
import { DriverApiConstant } from "../../Constants/ApiConstant";
import { StringConstant } from "../../Constants/StringConstant";

const UpdateDriver = () => {
  const params = useParams();
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();
  console.log(params);

  // define state
  const [mem, setMem] = useState({
    id: "",
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

  //useEffect(callback function,[condition] )
  // get existing mem details using id and update mem state obj
  useEffect(() => {
    ServiceCall.getApi(DriverApiConstant.getDriver(params.id))
      .then((response) => setMem(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy mem details to newEmp obj
    const newMem = { ...mem };

    //newmem.id =10;
    //newmem["id"] = 10;
    //update newMem object
    newMem[event.target.name] = event.target.value;

    // update mem obj with newMem obj details
    setMem(newMem);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ServiceCall.putApi(DriverApiConstant.putDriver(params.id), mem)
      .then(() => {
        alert(StringConstant.driverUpdated);
        navigate("/drivers");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="w-50 mx-auto mt-3">
        <p className="display-6">Update Driver</p>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDriver;
