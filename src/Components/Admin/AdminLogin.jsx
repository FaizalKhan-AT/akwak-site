import React, { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext, Firebasedb } from "../../Store/FirebaseContext";
import Toast from "../Toast/Toast";

function AdminLogin({ superAdmin, supernew }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState({});
  const { db, Auth } = useContext(Firebasedb);
  const { setAdmin, setSuperAdmin } = useContext(AuthContext);
  const history = useNavigate();
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    if (supernew) {
      registerAdmin();
    } else {
      loginAdmin();
    }
  };
  const registerAdmin = () => {
    createUserWithEmailAndPassword(
      Auth,
      loginDetails.email,
      loginDetails.password
    )
      .then((user) => {
        setAdmin(user.user);
        toFireStore({ ...loginDetails, superAdmin: false, uid: user.user.uid });
      })
      .catch((err) => setError(err.message));
  };
  const toFireStore = (data) => {
    addDoc(collection(db, "admins"), data)
      .then(() => {
        history("/super-admin");
      })
      .catch((err) => setError(err.message));
  };
  const loginAdmin = () => {
    signInWithEmailAndPassword(Auth, loginDetails.email, loginDetails.password)
      .then((user) => {
        console.log(user);
        if (superAdmin) {
          const qry = query(
            collection(db, "admins"),
            where("uid", "==", user.user.uid)
          );
          getDocs(qry).then((res) => {
            let [data] = res.docs.map((r) => r.data());
            if (data.superAdmin === true) {
              setSuperAdmin(user.user);
              history("/super-admin");
            } else {
              setError("Super Admin doesn't exists. try another account");
              return;
            }
          });
        } else {
          setAdmin(user.user);
          history("/admin");
        }
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      {error && <Toast msg={error} setMsg={setError} />}
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="row w-100 justify-content-center">
          <div className="card login px-4 col-md-7 col-lg-4 col-sm-8">
            <div className="card-title h3 fw-bold gotham my-3 text-center">
              {superAdmin
                ? "Super Admin Login"
                : supernew
                ? "Add new Admin"
                : "Admin Login"}
            </div>
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
            {supernew && (
              <div className="col-md-12 my-3 mt-2">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={loginDetails.username}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            )}
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
                {supernew ? "Add admin" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
