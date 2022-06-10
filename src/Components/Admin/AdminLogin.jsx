import React, { useState } from "react";

function AdminLogin({ superAdmin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginDetails, setLoginDetails] = useState({});

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {};

  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="row w-100 justify-content-center">
          <div className="card login px-4 col-4">
            <div className="card-title h3 fw-bold gotham my-3 text-center">
              {superAdmin ? "Super Admin" : "Admin"} Login
            </div>
            {error && <span className="my-2 text-danger">{error}</span>}
            {success && <span className="my-2 text-success">{success}</span>}
            <div className="col-md-12 my-3 mt-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={loginDetails.email}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginDetails.password}
                  className="form-control"
                  onChange={handleChange}
                />
                <i
                  style={{ left: "92%", cursor: "pointer" }}
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } position-absolute cursor top-50 translate-middle`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <div className="col-md-12 mt-5 mb-4">
              <button
                className="btn btn-login w-100 fw-bold "
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
