import { deleteDoc, doc } from "firebase/firestore";
import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Firebasedb } from "../../../Store/FirebaseContext";
import { Registrations } from "../../../Store/RegContexts";
import DeleteModal from "../../DeleteModal/DeleteModal";
import Toast from "../../Toast/Toast";

function AdminCard({ reg, fetchData }) {
  const { setDetails, setId } = useContext(Registrations);
  const delRef = useRef();
  const [error, setError] = useState("");
  const { db } = useContext(Firebasedb);
  const handleDelete = (id) => {
    const docRef = doc(db, "registrations", id);
    deleteDoc(docRef)
      .then(() => {
        setError("Registration deleted successfully");
        fetchData();
      })
      .catch((err) => setError(err.message));
  };
  const handleConfirm = (id) => {
    handleDelete(id);
  };
  return (
    <>
      <DeleteModal
        handleConfirm={handleConfirm}
        text="Permanently Delete this Registration"
      />
      {error && <Toast msg={error} setMsg={setError} />}

      <div className="card reg my-3 py-3 px-2">
        <div className="d-flex justify-content-between align-items-center px-2">
          <h5 className="mb-0 adm-name">
            {reg.applicantName}
            <br />
            {new Date().getTime() > new Date(reg.dateofIdExp).getTime() && (
              <span className="text-danger fs-6">Expired</span>
            )}
          </h5>
          <div className="d-flex gap-3 align-items-center">
            <p
              className={`mb-0 adm-desk ${
                reg.status === "Completed" ? "text-success" : "text-danger"
              }`}
            >
              {reg.status}
            </p>
            <p
              title={reg.status === "Completed" ? "Completed" : "Pending"}
              className={`mb-0 adm-mob fa-solid fs-4 ${
                reg.status === "Completed"
                  ? "text-success fa-check"
                  : "text-danger fa-times"
              }`}
            ></p>
            {/* {reg.status === "Completed" && (
              <button className="btn btn-outline-dark fa-regular fa-file-pdf fs-4"></button>
            )} */}
            <Link
              to="/admin/edit"
              className="btn adm-desk btn-outline-primary"
              onClick={() => setDetails(reg)}
            >
              Edit
            </Link>
            <button
              className="btn adm-desk btn-outline-danger"
              onClick={() => delRef.current.click()}
            >
              Delete
            </button>
            <Link
              to="/admin/edit"
              className="btn adm-mob btn-outline-primary fa-solid fa-pen-to-square fs-5"
              onClick={() => setDetails(reg)}
            ></Link>
            <button
              className="btn adm-mob btn-outline-danger fa-solid fa-trash fs-5"
              onClick={() => delRef.current.click()}
            ></button>
            <button
              ref={delRef}
              hidden
              onClick={() => setId(reg.docid)}
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCard;
