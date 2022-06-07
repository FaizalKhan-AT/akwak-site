import React from "react";

function Registration() {
  return (
    <>
      <div className="container">
        <br />
        <h3 className="text-center fw-bold my-3">Member Registration</h3>
        <br />
        <div className="row w-100">
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Applicant Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="applicantname"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Address of the Applicant <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="applicantaddress"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Name of the institution<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="institutionname"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Aadhar card number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="aadharno"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="phonenumber"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Nominee / Relationship with the Applicant
              <span className="text-danger">*</span>
            </label>
            <div className="nominee-box">
              <input
                type="text"
                value=""
                name="nominee"
                className="form-control"
                onChange=""
              />
              <input
                type="text"
                value=""
                name="relationnominee"
                className="form-control"
                onChange=""
              />
            </div>
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Nature of Job <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="jobnature"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Blood Group <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="bloodgroup"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value=""
              name="dob"
              className="form-control"
              onChange=""
            />
          </div>
          <div className="col-md-12 my-3 mt-4 d-flex justify-content-center w-100">
            <button style={{ width: "40%" }} className="btn btn-login fw-bold">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
