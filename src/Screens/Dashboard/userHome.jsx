//class component
import React, { Component } from "react";
import "./home.css";
import vehiclesImg from "../../Utilities/vehicle.png";
import { Link } from "react-router-dom";
class UserHome extends Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <>
        <div>
          <div className="landing-page">
            <div className="content">
              <div className="container">
                <div className="info">
                  <h1>Vehicle Driver Management App</h1>
                  <p>
                    "With our user-friendly interface, you can easily onboard
                    and manage vehicles of any type and maintain driver details,
                    ensuring efficient tracking, maintenance, and organization
                    of your transportation resources."
                  </p>
                  <br></br>
                  <p>
                    "Experience seamless control over vehicle registration,
                    insurance, maintenance, and driver profiles, empowering you
                    to optimize resource allocation and deliver exceptional
                    service."
                  </p>
                  <Link to="/drivers">
                    <button className="login_btn">My Drivers</button>
                  </Link>
                  &nbsp;
                  <Link to="/vehicles">
                    <button className="register_btn">My Vehicles</button>
                  </Link>
                </div>
                <div className="image">
                  <img src={vehiclesImg} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="container">
            &copy; Copyright{" "}
            <strong>
              <span>Vehicle Driver Management App</span>
            </strong>
            . All Rights Reserved
          </div>
        </footer>
      </>
    );
  }
}

export default UserHome;
