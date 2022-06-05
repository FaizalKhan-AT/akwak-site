import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/akwa_logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-lg">
      <div className="container-fluid d-flex align-items-center justify-content-between mx-5">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} width="70" alt="All Kerala Welders Association" />
        </Link>
        <Link to="/Login" className="btn btn-login fw-bold py-2">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
