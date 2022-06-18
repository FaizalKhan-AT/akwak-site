import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, Firebasedb } from "../../Store/FirebaseContext";
import Toast from "../Toast/Toast";
import SuperCard from "./subComponents/SuperCard";

function SuperAdminHome() {
  const history = useNavigate();
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
          if (data.superAdmin === true) {
            setSuperAdmin(data);
          } else history("/super-admin/login");
        });
      } else history("/super-admin/login");
    });
  };
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const { db, Auth } = useContext(Firebasedb);
  const { setSuperAdmin } = useContext(AuthContext);
  const docRef = collection(db, "admins");
  const handleLogout = () => {
    signOut(Auth)
      .then(() => setSuperAdmin(null))
      .then(() => isAuthenticated())
      .catch((err) => setError(err.message));
  };
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
      .catch((err) => setError(err.message));
  };
  return (
    <>
      {error && <Toast msg={error} setMsg={setError} />}
      <Link
        to="/"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="position-fixed m-3 back fa-solid fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title="Go home"
      ></Link>
      <div className="container">
        <div className="d-flex align-items-center justify-content-end w-100 pt-5">
          <button className="btn btn-filter" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="d-flex justify-content-center my-5 h2">
          Super Admin Panel
        </div>
        <div className="mt-5">
          <Link to="/super-admin/new" className="btn btn-filter">
            Add new Admin
          </Link>
          {admins.length > 0 ? (
            admins.map((val, idx) => {
              return <SuperCard key={idx} admin={val} fetchData={fetchData} />;
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
