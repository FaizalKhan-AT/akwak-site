import { deleteUser } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Firebasedb } from "../../../Store/FirebaseContext";
import { Registrations } from "../../../Store/RegContexts";
import DeleteModal from "../../DeleteModal/DeleteModal";
import Toast from "../../Toast/Toast";

function SuperCard({ admin, fetchData }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setId } = useContext(Registrations);
  const { db } = useContext(Firebasedb);
  const [error, setError] = useState("");
  const [Doc, setDoc] = useState();
  const handleDelete = (id) => {
    const docRef = collection(db, "admins");
    let qu = query(docRef, where("uid", "==", id));
    getDocs(qu)
      .then((snap) => {
        setDoc(
          snap.docs.map((post) => {
            return { ...post.data(), docid: post.id };
          })
        );
      })
      .then(() => {
        if (Object.keys(Doc).length > 0) {
          let docid = Doc[0].docid;
          const ref = doc(db, "admins", docid);
          // deleteUser(uid).then((user) => console.log(user));
          deleteDoc(ref)
            .then(() => {
              setError("Admin deleted successfully");
              fetchData();
            })
            .catch((err) => setError(err.message));
        }
      })
      .catch((err) => setError(err.message));
  };
  const handleConfirm = (id) => {
    handleDelete(id);
  };
  return (
    <>
      <DeleteModal
        text="Are you sure to delete this admin"
        handleConfirm={handleConfirm}
      />
      {error && <Toast msg={error} setMsg={setError} />}
      <div className="card reg my-3 py-3 px-2">
        <div className="d-flex justify-content-between align-items-center px-2">
          <h5 className="mb-0">{admin.username}</h5>
          <div className="d-flex gap-3 align-items-center">
            <button
              className="btn btn-filter adm-desk"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Less" : "More"}
            </button>
            <button
              className={`btn btn-filter adm-mob fa-solid ${
                showDetails ? "fa-caret-down" : "fa-caret-up"
              }`}
              onClick={() => setShowDetails(!showDetails)}
            ></button>
            <button
              className="btn adm-desk btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => setId(admin.uid)}
            >
              Delete
            </button>
            <button
              className="btn adm-mob btn-outline-danger fa-solid fa-trash fs-5"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => setId(admin.uid)}
            ></button>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="card admin-card">
          <div className="card-body d-flex flex-column gap-2">
            <label>Email : {admin.email}</label>
            <label>
              Password :
              <span className="position-relative">
                <input
                  className="ms-3 admin-password-field shadow-none"
                  type={showPassword ? "text" : "password"}
                  value={admin.password}
                  readOnly
                />
              </span>
            </label>
            <label
              style={{ cursor: "pointer" }}
              className="d-flex gap-2 align-items-center"
            >
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default SuperCard;
