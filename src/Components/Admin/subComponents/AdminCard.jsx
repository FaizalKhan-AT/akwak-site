import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminCard({ reg }) {
  return (
    <>
      <div className="card reg my-3 py-3 px-2">
        <div className="d-flex justify-content-between align-items-center px-2">
          <h5 className="mb-0">{reg.username}</h5>
          <div className="d-flex gap-3 align-items-center">
            <p
              className={`mb-0 ${
                reg.status === "Completed" ? "text-success" : "text-danger"
              }`}
            >
              {reg.status}
            </p>
            {reg.status === "Completed" && (
              <button className="btn btn-outline-dark fa-regular fa-file-pdf fs-4"></button>
            )}
            <Link to="/admin/edit" className="btn btn-outline-primary">
              Edit
            </Link>
            <button className="btn btn-outline-danger">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCard;
