import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpModal({ phone }) {
  const [otp, setOtp] = useState("");
  const closeRef = useRef(null);
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const history = useNavigate();
  const confirmOtp = () => {
    closeRef.current.click();
    history("/registration");
  };
  return (
    <>
      <div
        id="otp-modal"
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered py-2">
          <div className="modal-content">
            <div style={{ borderBottom: "none" }} className="modal-header">
              <p className="modal-title fs-5 fw-bold">
                An otp has been sent to this number {phone}
              </p>
              <button
                ref={closeRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="px-4 d-flex flex-column align-items-center gap-3">
                <input
                  type="tel"
                  name="otp"
                  value={otp}
                  className="form-control col-md-4"
                  onChange={handleChange}
                  placeholder="Enter the OTP"
                />
                <button className="btn btn-login" onClick={confirmOtp}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpModal;
