import React from "react";
import { Link } from "react-router-dom";
import SuperCard from "./subComponents/SuperCard";

function SuperAdminHome() {
  return (
    <>
      <Link
        to="/"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="position-fixed m-3 fa-solid fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title="Go home"
      ></Link>
      <div className="container">
        <div className="d-flex justify-content-center my-5 h2">
          Super Admin Panel
        </div>
        <div className="mt-5">
          <Link to="/super-admin/new" className="btn btn-filter">
            Add new Admin
          </Link>
          {[...Array(5)].map((_, idx) => {
            return (
              <SuperCard
                key={idx}
                admin={{
                  username: `admin ${idx}`,
                  password: `passowrd-${idx}`,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SuperAdminHome;
