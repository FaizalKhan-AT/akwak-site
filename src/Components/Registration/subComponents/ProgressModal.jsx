import { useRef } from "react";

function ProgressModal({ closeRef, progress }) {
  return (
    <>
      <div
        id="progress-modal"
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered py-2">
          <div className="modal-content">
            <div style={{ borderBottom: "none" }} className="modal-header">
              <p className="mb-0 fw-bold">Uploading Details</p>
              <button
                ref={closeRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                hidden
              ></button>
            </div>
            <div className="modal-body py-2">
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressModal;
