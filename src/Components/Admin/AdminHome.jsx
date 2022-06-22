import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminCard from "./subComponents/AdminCard";
import { AuthContext, Firebasedb } from "../../Store/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { utils, writeFile } from "xlsx";
import Toast from "../Toast/Toast";
import { onAuthStateChanged, signOut } from "firebase/auth";

function AdminHome() {
  const [reg, setReg] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const history = useNavigate();
  const { db, Auth } = useContext(Firebasedb);
  const { setAdmin } = useContext(AuthContext);
  const regRef = collection(db, "registrations");
  useEffect(() => {
    fetchData();
    isAuthenticated();
  }, []);
  const isAuthenticated = () => {
    onAuthStateChanged(Auth, (person) => {
      if (person) {
        const docRef = collection(db, "admins");
        const qu = query(docRef, where("uid", "==", person.uid));
        getDocs(qu).then((snap) => {
          const [data] = snap.docs.map((doc) => doc.data());
          if (data.superAdmin === false) {
            setAdmin(person);
          } else history("/admin/login");
        });
      } else history("/admin/login");
    });
  };
  const handleLogout = () => {
    signOut(Auth)
      .then(() => setAdmin(null))
      .then(() => isAuthenticated())
      .catch((err) => setError(err.message));
  };
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
  const handleSearch = () => {
    let qu = query(
      regRef,
      where("idCardNo", ">=", search),
      where("idCardNo", "<=", search + "\uf8ff")
    );
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
  return (
    <>
      <Link
        to="/"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          zIndex: 100,
        }}
        className="position-fixed m-3 back fa-solid fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title="Go home"
      ></Link>
      {error && <Toast msg={error} setMsg={setError} />}

      <div className="container">
        <div className="d-flex align-items-center justify-content-end w-100 pt-5">
          <button className="btn btn-filter" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="d-flex justify-content-center my-5 h2">Admin Panel</div>
        <div className="row w-100 my-3 mb-5 justify-content-center">
          <div className="d-flex gap-2 col-lg-6 col-md-6 col-sm-10 align-items-center justify-content-center">
            <input
              type="search"
              className="form-control"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter akwa id no for search"
            />
            <button
              className="btn btn-filter fa-solid fa-search fs-5 py-2"
              onClick={handleSearch}
            ></button>
          </div>
        </div>
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
            <Link to="/admin/new" className="adm-desk btn btn-filter">
              Add new member
            </Link>
            <Link
              to="/admin/new"
              className="fs-3 py-3 adm-mob btn btn-filter fa-solid fa-user-plus d-flex justify-content-center align-items-center"
            ></Link>
            <button
              className="btn adm-desk btn-outline-success text-end"
              onClick={handleXlGeneration}
            >
              Generate Excel Sheet
            </button>
            <button
              className="btn adm-mob fa-solid fa-file-excel fs-3 btn-outline-success text-end"
              onClick={handleXlGeneration}
            ></button>
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
