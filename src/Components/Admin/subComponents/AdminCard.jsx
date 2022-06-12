import { deleteDoc, doc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Firebasedb } from "../../../Store/FirebaseContext";
import { Registrations } from "../../../Store/RegContexts";

function AdminCard({ reg }) {
  const { setDetails } = useContext(Registrations);
  const { db } = useContext(Firebasedb);
  const handleDelete = (id) => {
    const docRef = doc(db, "registrations", id);
    deleteDoc(docRef)
      .then(() => {
        alert("doc deleted");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <div className="card reg my-3 py-3 px-2">
        <div className="d-flex justify-content-between align-items-center px-2">
          <h5 className="mb-0">{reg.applicantName}</h5>
          <div className="d-flex gap-3 align-items-center">
            <p
              className={`mb-0 ${
                reg.status === "Completed" ? "text-success" : "text-danger"
              }`}
            >
              {reg.status}
            </p>
            {reg.status === "Completed" && (
              <button className="btn btn-outline-dark fa-regular fa-file-pdf fs-4"></button>
            )}
            <Link
              to="/admin/edit"
              className="btn btn-outline-primary"
              onClick={() => setDetails(reg)}
            >
              Edit
            </Link>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(reg.docid)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCard;
