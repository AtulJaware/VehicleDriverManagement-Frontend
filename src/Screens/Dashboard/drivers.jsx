import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DriverApiConstant } from "../../Constants/ApiConstant";
import { ServiceCall } from "../../Services/ServiceMethod";
import { StringConstant } from "../../Constants/StringConstant";
import DriversSearchTable from "../../components/DriversSearchTable";
import { Container, Button, Form, Row } from "react-bootstrap";

const Drivers = () => {
  let navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const searchInput = useRef();
  const searchAction = useRef();
  const [searchResult, setSearchResult] = useState([]);
  const [showDriverstable, setShowDriverstable] = useState(true);
  const [showSearchDriver, setShowSearchDriver] = useState(false);

  useEffect(() => {
    ServiceCall.getApi(DriverApiConstant.driverApi)
      .then((response) => {
        console.log(response);
        setDrivers(response.data);
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
      case "BY_NAME":
        findByName(searchInput.current.value);
        break;
      case "BY_Email":
        findByEmail(searchInput.current.value);
        break;
      case "BY_CONTACT":
        findByContactNumber(searchInput.current.value);
        break;
      case "BY_ID":
        findById(searchInput.current.value);
        break;
      default:
        alert("choose action to proceed");
    }
  };

  const handleDeleteBtm = (driverId) => {
    if (window.confirm(StringConstant.deleteAlert)) {
      ServiceCall.deleteApi(DriverApiConstant.deleteDriver(driverId))
        .then(() => {
          alert(StringConstant.driverDeleted + driverId);
          navigate("/drivers");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const findByName = (name) => {
    setSearchResult([]);
    const searchRes = [];

    drivers.map((mem) => {
      if (mem.name === name) searchRes.push(mem);
    });
    setSearchResult(searchRes);
    setShowDriverstable(false);
    setShowSearchDriver(true);
  };

  const findByEmail = (name) => {
    setSearchResult([]);
    const searchRes = [];
    drivers.map((mem) => {
      if (mem.email === name) searchRes.push(mem);
    });
    setSearchResult(searchRes);
    setShowDriverstable(false);
    setShowSearchDriver(true);
  };

  const findByContactNumber = (con) => {
    setSearchResult([]);
    const searchRes = [];
    drivers.map((mem) => {
      if (mem.contactNumber === con) searchRes.push(mem);
    });
    setSearchResult(searchRes);
    setShowDriverstable(false);
    setShowSearchDriver(true);
  };
  const findById = (driverId) => {
    setSearchResult([]);
    const searchRes = [];
    drivers.map((mem) => {
      if (mem.id == driverId) searchRes.push(mem);
    });
    setSearchResult(searchRes);
    setShowDriverstable(false);
    setShowSearchDriver(true);
  };
  return (
    <div className="mx-auto">
      <h3 className="mt-4">Driver's Data</h3>
      <Link to="/drivers/add" className="btn btn-primary float-end mb-2">
        Add New Driver
      </Link>
      <table className="table w-100 border border-secondary rounded mt-4 p-2 shadow p-3 mb-5 bg-body rounded">
        <thead>
          <tr className="colorTable">
            <th>Driver Id</th>
            <th>Driver Name</th>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((mem) => (
            <tr key={mem.id}>
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
                  <i className="bi bi-pencil-square me-3" type="button"></i>
                </Link>
                <i
                  class="bi bi-trash3"
                  type="button"
                  onClick={() => {
                    handleDeleteBtm(mem.id);
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
            <option>Search Driver By</option>
            <option value="BY_NAME">Name</option>
            <option value="BY_EMAIL">Email ID</option>
            <option value="BY_CONTACT">Contact Number</option>
            <option value="BY_ID">Driver Id</option>
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
      {showSearchDriver ? (
        <DriversSearchTable searchResult={searchResult} />
      ) : null}
    </div>
  );
};
export default Drivers;
