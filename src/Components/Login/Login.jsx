import React, { useRef, useState, useContext } from "react";
import OtpModal from "../otpModal/OtpModal";
import { Firebasedb } from "../../Store/FirebaseContext";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Login() {
  const [phoneNum, setPhoneNum] = useState("");
  const [otp, setOtp] = useState();
  const otpRef = useRef(null);
  const loginBtnRef = useRef(null);
  const { Auth } = useContext(Firebasedb);
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    setPhoneNum(e.target.value);
  };
  const reCapta = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapta-form",
      {
        size: "invisible",
        callback: (response) => {},
      },
      Auth
    );
  };
  const handleSentOTP = () => {
    signInWithPhoneNumber(Auth, `+91 ${phoneNum}`, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleOtp = () => {
    reCapta();
    handleSentOTP();
    otpRef.current.click();
  };
  const handleGoogleLogin = () => {
    signInWithPopup(Auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <OtpModal setOtp={setOtp} otp={otp} phone={phoneNum} />
      <button
        ref={otpRef}
        data-bs-toggle="modal"
        data-bs-target="#otp-modal"
        hidden
      ></button>
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
              placeholder="Enter 10 digit phone number"
            />
          </div>
          <div className="col-md-12 my-3 my-2 text-center">
            <div
              id="login-btn"
              className="btn btn-login log fw-bold"
              ref={loginBtnRef}
              onClick={handleOtp}
            >
              Send OTP
            </div>
          </div>
          <div className="col-md-12 my-3 text-center mb-4 d-flex flex-column align-items-center">
            <p className="text-center">OR</p>
            <div
              onClick={handleGoogleLogin}
              className="btn py-2 btn-login google fw-bold d-flex align-items-center justify-content-center gap-3"
            >
              <span className="fab fa-google fs-5"></span>
              Login with Google
            </div>
          </div>
        </div>
      </div>
      <div id="recapta-form"></div>
    </>
  );
}

export default Login;
