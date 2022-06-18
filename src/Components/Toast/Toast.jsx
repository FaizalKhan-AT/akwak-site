import React from "react";

function Toast({ msg, setMsg }) {
  return (
    <>
      <div
        style={{ bottom: "15px", zIndex: "1000" }}
        id="Toast"
        className="toast position-fixed end-0  show align-items-center text-white bg-danger border-0"
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
            onClick={() => setMsg("")}
          ></button>
        </div>
      </div>
    </>
  );
}

export default Toast;
