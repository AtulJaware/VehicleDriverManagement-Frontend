import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { VehicleApiConstant } from "../../Constants/ApiConstant";
import { VehicleServiceCall } from "../../Services/ServiceMethod";
import { StringConstant } from "../../Constants/StringConstant";
import VehiclesSearchTable from "../../components/VehiclesSearchTable";
import { Container, Button, Form, Row } from "react-bootstrap";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const searchInput = useRef();
  const searchAction = useRef();
  const [searchResult, setSearchResult] = useState([]);
  const [showVehiclestable, setShowVehiclestable] = useState(true);
  const [showSearchVehicle, setShowSearchVehicle] = useState(false);

  useEffect(() => {
    VehicleServiceCall.getApi(VehicleApiConstant.vehicleApi)
      .then((response) => {
        console.log(response);
        setVehicles(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePerformClick = () => {
    console.log(
      "perforam profile",
      searchInput.current.value,
      searchAction.current.value
    );
    switch (searchAction.current.value) {
      case "BY_REG":
        findByReg(searchInput.current.value);
        break;
      case "BY_MODEL":
        findByModel(searchInput.current.value);
        break;
      case "BY_TYPE":
        findByType(searchInput.current.value);
        break;
      case "BY_ID":
        findById(searchInput.current.value);
        break;
      // default:
      //     alert("choose action to proceed");
    }
  };

  const handleDelete = (vehicleId) => {
    if (window.confirm(StringConstant.deleteAlert)) {
      VehicleServiceCall.deleteApi(VehicleApiConstant.deleteVehicle(vehicleId))
        .then(() => {
          alert(StringConstant.vehicleDeleted + vehicleId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const findByReg = (name) => {
    setSearchResult([]);
    const searchRes = [];

    vehicles.map((vehicle) => {
      if (vehicle.registrationNumber == name) searchRes.push(vehicle);
    });
    setSearchResult(searchRes);
    setShowVehiclestable(false);
    setShowSearchVehicle(true);
  };

  const findByType = (name) => {
    setSearchResult([]);
    const searchRes = [];
    vehicles.map((vehicle) => {
      if (vehicle.fuelType == name) searchRes.push(vehicle);
    });
    setSearchResult(searchRes);
    setShowVehiclestable(false);
    setShowSearchVehicle(true);
  };

  const findByModel = (name) => {
    setSearchResult([]);
    const searchRes = [];
    vehicles.map((vehicle) => {
      if (vehicle.model == name) searchRes.push(vehicle);
    });
    setSearchResult(searchRes);
    setShowVehiclestable(false);
    setShowSearchVehicle(true);
  };

  const findById = (id) => {
    setSearchResult([]);
    const searchRes = [];
    vehicles.map((vehicle) => {
      if (vehicle.id == id) searchRes.push(vehicle);
    });
    setSearchResult(searchRes);
    setShowVehiclestable(false);
    setShowSearchVehicle(true);
  };
  return (
    <div
      className="w-75 mx-auto"
      display="flex"
      justify-content="center"
      align-items="center"
    >
      <h3 className="mt-4">Vehicle's Data</h3>
      <Link to="/vehicles/add" className="btn btn-primary float-end mb-2">
        Add New Vehicle
      </Link>
      <table className="table w-100 border border-secondary rounded mt-4 p-2 shadow p-3 mb-5 bg-body rounded">
        <thead>
          <tr className="colorTable">
            <th>Vehicle Id</th>
            <th>Registration Number</th>
            <th>Model</th>
            <th>Fuel Type</th>
            <th>Is Insured</th>
            <th>Is In Maintenance</th>
            <th>Colour</th>
            <th>Seating Capacity</th>
            <th>Engine Number</th>
            <th>Vehicle Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.registrationNumber}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.fuelType}</td>
              <td>{vehicle.isInsured}</td>
              <td>{vehicle.isInMaintenance}</td>
              <td>{vehicle.colour}</td>
              <td>{vehicle.seatingCapacity}</td>
              <td>{vehicle.engineNumber}</td>
              <td>{vehicle.vehicleType}</td>
              <td>
                <Link to={`/vehicles/update/${vehicle.id}`}>
                  <i className="bi bi-pencil-square me-3" type="button"></i>
                </Link>
                <i
                  class="bi bi-trash3"
                  type="button"
                  onClick={() => {
                    handleDelete(vehicle.id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Container>
        <Row className="mx-1">
          <Form.Select className="w-25 mx-0" inline ref={searchAction}>
            <option>Search Vehicle By</option>
            <option value="BY_REG">Registration No.</option>
            <option value="BY_MODEL">Model</option>
            <option value="BY_TYPE">Fuel Type</option>
            <option value="BY_ID">Vehicle ID</option>
          </Form.Select>
          &nbsp;&nbsp;
          <Form.Control
            type="text"
            placeholder="text here..."
            className="w-25"
            ref={searchInput}
          />
          &nbsp;&nbsp;
          <Button
            variant="success"
            className="w-25"
            onClick={handlePerformClick}
          >
            Search
          </Button>
        </Row>
      </Container>
      <br />
      {showSearchVehicle ? (
        <VehiclesSearchTable searchResult={searchResult} />
      ) : null}
    </div>
  );
};
export default Vehicles;
