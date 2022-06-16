import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Firebasedb } from "../../Store/FirebaseContext";
import SuperCard from "./subComponents/SuperCard";

function SuperAdminHome() {
  useEffect(() => {
    fetchData();
  }, []);
  const [admins, setAdmins] = useState([]);
  const { db } = useContext(Firebasedb);
  const docRef = collection(db, "admins");
  const fetchData = () => {
    let qu = query(docRef, where("superAdmin", "==", false));
    getDocs(qu)
      .then((snap) => {
        setAdmins(
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
        <div className="d-flex justify-content-center my-5 h2">
          Super Admin Panel
        </div>
        <div className="mt-5">
          <Link to="/super-admin/new" className="btn btn-filter">
            Add new Admin
          </Link>
          {admins.length > 0 ? (
            admins.map((val, idx) => {
              return <SuperCard key={idx} admin={val} />;
            })
          ) : (
            <h3 className="text-center my-3">No Admins yet !</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default SuperAdminHome;
