import React, { useState } from "react";
import { Link } from "react-router-dom";

function SuperCard({ admin }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {" "}
      <div className="card reg my-3 py-3 px-2">
        <div className="d-flex justify-content-between align-items-center px-2">
          <h5 className="mb-0">{admin.username}</h5>
          <div className="d-flex gap-3 align-items-center">
            <button
              className="btn btn-filter"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Less" : "More"}
            </button>
            <button className="btn btn-outline-warning">Revoke</button>
            <button className="btn btn-outline-danger">Delete</button>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="card admin-card">
          <div className="card-body d-flex flex-column gap-2">
            <label>Username : {admin.username}</label>
            <label>
              Password :
              <span className="position-relative">
                <input
                  className="ms-3 admin-password-field shadow-none"
                  type={showPassword ? "text" : "password"}
                  value={admin.password}
                  readOnly
                />
              </span>
            </label>
            <label
              style={{ cursor: "pointer" }}
              className="d-flex gap-2 align-items-center"
            >
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
            <span className="d-flex justify-content-center mt-3">
              <Link to="/admin/edit" className="btn btn-outline-primary">
                Edit
              </Link>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default SuperCard;
