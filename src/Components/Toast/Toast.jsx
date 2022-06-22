import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext, Firebasedb } from "../../Store/FirebaseContext";

function Toast({ msg, setMsg }) {
  const { Auth } = useContext(Firebasedb);
  const { setUser } = useContext(AuthContext);
  return (
    <>
      <div
        style={{ bottom: "15px", zIndex: "1000", right: "15px" }}
        id="Toast"
        className="toast position-fixed show align-items-center text-white bg-danger border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{msg && msg}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => {
              signOut(Auth).then(() => setUser(null));
              setMsg("");
            }}
          ></button>
        </div>
      </div>
    </>
  );
}

export default Toast;
