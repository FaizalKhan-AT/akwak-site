import React from "react";
import { Link } from "react-router-dom";
import AdminCard from "./subComponents/AdminCard";

function AdminHome() {
  return (
    <>
      <Link
        to="/"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="position-fixed m-3 fa-solid fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title="Go home"
      ></Link>
      <div className="container">
        <div className="d-flex justify-content-center my-5 h2">Admin Panel</div>
        <div className="d-flex gap-4 justify-content-center">
          <button className="btn btn-filter">All</button>
          <button className="btn btn-filter">Pending</button>
          <button className="btn btn-filter">Completed</button>
        </div>
        <div className="mt-5">
          <Link to="/admin/new" className="btn btn-filter">
            Add new member
          </Link>
          {[...Array(10)].map((val, idx) => {
            return (
              <AdminCard
                key={idx}
                reg={{
                  username: `applicant-name-${idx}`,
                  status: `${idx % 2 ? "Pending" : "Completed"}`,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminHome;
