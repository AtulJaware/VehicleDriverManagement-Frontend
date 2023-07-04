//class component
import React, { Component } from "react";
import "./home.css";
import homeImg from "../../Utilities/home.png";
import { Link } from "react-router-dom";
class Home extends Component {
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
                    "Manage your vehicle fleet and driver information with ease
                    using our intuitive and efficient application powered by
                    Java Spring and React."
                  </p>
                  <Link to="/login">
                    <button className="login_btn">Login</button>
                  </Link>
                  &nbsp;
                  <Link to="/register">
                    <button className="register_btn">Register Now</button>
                  </Link>
                </div>
                <div className="image">
                  <img src={homeImg} />
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

export default Home;
