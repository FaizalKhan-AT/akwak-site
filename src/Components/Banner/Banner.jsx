import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <>
      <div className="banner position-relative">
        <div
          style={{ height: "100%" }}
          className="container banner-container gap-3 flex-column position-relative d-flex align-items-center justify-content-center text-light"
        >
          <h1 className="fw-bold">All Kinds of Welders Association - AKWA</h1>
          <h4>Official Member Registration Portal</h4>
          <Link to="/Login" className="btn btn-reg py-3 fw-bold">
            Continue to Registration
          </Link>
        </div>
        <div className="overlay position-absolute top-0 start-0 end-0 bottom-0"></div>
      </div>
    </>
  );
}

export default Banner;
