import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { StringConstant } from "../Constants/StringConstant";
import { VehicleApiConstant } from "../Constants/ApiConstant";
import { ServiceCall } from "../Services/ServiceMethod";

const VehiclesSearchTable = ({ searchResult }) => {
  const handleDelete = (id) => {
    if (window.confirm(StringConstant.deleteAlert)) {
      ServiceCall.deleteApi(VehicleApiConstant.deleteVehicle(id))
        .then(() => {
          alert(StringConstant.vehicleDeleted + id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h3>Search Result</h3>
      {searchResult.length === 0 ? (
        <h4>Vehicle Not found</h4>
      ) : (
        <Table>
          <thead>
            <tr>
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
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {searchResult &&
              searchResult.map((vehicle) => {
                return (
                  <tr>
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
                      <Link to={`/user/update/${vehicle.id}`}>
                        <i
                          className="bi bi-pencil-square me-3"
                          type="button"
                        ></i>
                      </Link>
                      <i
                        className="bi bi-trash3"
                        type="button"
                        onClick={() => {
                          handleDelete(vehicle.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default VehiclesSearchTable;
