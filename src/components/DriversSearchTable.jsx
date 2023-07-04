import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { StringConstant } from "../Constants/StringConstant";
import { DriverApiConstant } from "../Constants/ApiConstant";
import { ServiceCall } from "../Services/ServiceMethod";

const DriversSearchTable = ({ searchResult }) => {
  const handleDeleteBtm = (driverId) => {
    if (window.confirm(StringConstant.deleteAlert)) {
      ServiceCall.deleteApi(DriverApiConstant.deleteDriver(driverId))
        .then(() => {
          alert(StringConstant.driverDeleted + driverId);
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
        <h4>Driver Not found</h4>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Driver Id</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Alternate Number</th>
              <th>Driving License Number</th>
              <th>Driving License ExpiryDate</th>
              <th>Email</th>
              <th>Alternate Email</th>
              <th>Emergency Contact Person</th>
              <th>Emergency Contact Number</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {searchResult &&
              searchResult.map((mem) => {
                return (
                  <tr>
                    <td>{mem.id}</td>
                    <td>{mem.name}</td>
                    <td>{mem.dateOfBirth}</td>
                    <td>{mem.address}</td>
                    <td>{mem.contactNumber}</td>
                    <td>{mem.alternateContactNumber}</td>
                    <td>{mem.drivingLicenseNumber}</td>
                    <td>{mem.drivingLicenseExpiryDate}</td>
                    <td>{mem.email}</td>
                    <td>{mem.alternateEmail}</td>
                    <td>{mem.emergencyContactPerson}</td>
                    <td>{mem.emergencyContactNumber}</td>
                    <td>
                      <Link to={`/drivers/update/${mem.id}`}>
                        <Button variant="success">Edit</Button>
                      </Link>
                      &nbsp;&nbsp;
                      <Button
                        variant="success"
                        onClick={() => {
                          handleDeleteBtm(mem.id);
                        }}
                      >
                        Delete
                      </Button>
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

export default DriversSearchTable;
