import React, { useContext } from "react";
import { Registrations } from "../../Store/RegContexts";

function DeleteModal({ text, handleConfirm }) {
  const { id } = useContext(Registrations);
  return (
    <>
      <div
        className="modal fade"
        id="deleteModal"
        aria-hidden="true"
        tabIndex="1"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg py-3"
          style={{ maxWidth: "600px" }}
        >
          <div className="modal-content">
            <div className="modal-body d-flex flex-column gap-3 align-items-center">
              <p className="h5 fw-bold  mt-4 deactivate-heading">{text}</p>
              <span
                style={{ textAlign: "center" }}
                className="text-danger mt-1"
              >
                {/* <div className="deactivateAccount-desc">
                  You will no longer to access this account after deactivate
                  permanentely.
                </div> */}
              </span>
              <div className="mb-5 mt-4 d-flex gap-3">
                <button
                  className="btn btn-filter"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  NO
                </button>
                <button
                  className="btn btn-outline-danger "
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => handleConfirm(id)}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
