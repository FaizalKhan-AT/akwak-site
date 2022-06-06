import React, { useState } from "react";

function Login() {
  const [phoneNum, setPhoneNum] = useState("");
  const handleChange = (e) => {
    setPhoneNum(e.target.value);
  };
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center row w-100"
      >
        <div className="card login px-4 row col-md-6 col-sm-8 col-lg-4">
          <div className="card-title h3 fw-bold mt-3 text-center">Register</div>
          <div className="col-md-12 my-3 mt-2">
            <input
              type="tel"
              name="phoneNum"
              value={phoneNum}
              className="form-control"
              onChange={handleChange}
              placeholder="Enter 10 digit phone number "
            />
          </div>
          <div className="col-md-12 my-3 my-2 text-center">
            <div className="btn btn-login log fw-bold">Send OTP</div>
          </div>
          <div className="col-md-12 my-3 text-center mb-4 d-flex flex-column align-items-center">
            <p className="text-center">OR</p>
            <div className="btn py-2 btn-login google fw-bold d-flex align-items-center justify-content-center gap-3">
              <span className="fab fa-google fs-5"></span>
              Login with Google
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
