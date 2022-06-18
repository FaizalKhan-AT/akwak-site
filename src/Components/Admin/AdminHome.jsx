import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminCard from "./subComponents/AdminCard";
import { AuthContext, Firebasedb } from "../../Store/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { utils, writeFile } from "xlsx";
import Toast from "../Toast/Toast";

function AdminHome() {
  const [reg, setReg] = useState([]);
  const [error, setError] = useState("");
  const history = useNavigate();
  const { db } = useContext(Firebasedb);
  const { admin } = useContext(AuthContext);
  const regRef = collection(db, "registrations");
  useEffect(() => {
    // if (!admin) history("/admin/login");
    fetchData();
  }, []);
  const fetchData = () => {
    getDocs(regRef)
      .then((snap) => {
        setReg(
          snap.docs.map((post) => {
            return { ...post.data(), docid: post.id };
          })
        );
      })
      .catch((err) => setError(err.message));
  };
  const handleFilter = (key) => {
    let qu = query(regRef, where("status", "==", key));
    getDocs(qu)
      .then((snap) => {
        setReg(
          snap.docs.map((post) => {
            return { ...post.data(), docid: post.id };
          })
        );
      })
      .catch((err) => setError(err.message));
  };
  const handleXlGeneration = () => {
    let wb = utils.book_new();
    let ws = utils.json_to_sheet(reg);
    utils.book_append_sheet(wb, ws, "Registration Details");
    writeFile(wb, "Registrations.xlsx");
  };
  return (
    <>
      <Link
        to="/"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="position-fixed m-3 fa-solid fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title="Go home"
      ></Link>
      {error && <Toast msg={error} setMsg={setError} />}
      <div className="container">
        <div className="d-flex justify-content-center my-5 h2">Admin Panel</div>
        <div className="d-flex gap-4 justify-content-center">
          <button className="btn btn-filter" onClick={fetchData}>
            All
          </button>
          <button
            className="btn btn-filter"
            onClick={() => handleFilter("Pending")}
          >
            Pending
          </button>
          <button
            className="btn btn-filter"
            onClick={() => handleFilter("Completed")}
          >
            Completed
          </button>
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-between my-2">
            <Link to="/admin/new" className="btn btn-filter">
              Add new member
            </Link>
            <button
              className="btn btn-outline-success text-end"
              onClick={handleXlGeneration}
            >
              Generate Excel Sheet
            </button>
          </div>
          {reg.length > 0 ? (
            reg.map((val, idx) => {
              return <AdminCard key={idx} reg={val} fetchData={fetchData} />;
            })
          ) : (
            <h3 className="text-center my-3">No Registrations yet !</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminHome;
