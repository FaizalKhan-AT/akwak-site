import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminCard from "./subComponents/AdminCard";
import { Firebasedb } from "../../Store/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
function AdminHome() {
  const [reg, setReg] = useState([]);
  const { db } = useContext(Firebasedb);
  const regRef = collection(db, "registrations");
  useEffect(() => {
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
      .catch((err) => console.log(err.message));
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
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <Link
        to="/"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="position-fixed m-3 fa-solid fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title="Go home"
      ></Link>
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
          <Link to="/admin/new" className="btn btn-filter">
            Add new member
          </Link>
          {reg.length > 0 ? (
            reg.map((val, idx) => {
              return <AdminCard key={idx} reg={val} />;
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
