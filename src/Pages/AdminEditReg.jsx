import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Registration from "../Components/Registration/Registration";
import { AuthContext } from "../Store/FirebaseContext";

function AdminEditReg() {
  const { admin } = useContext(AuthContext);
  if (!admin) return <Navigate to="/admin/" />;
  return <Registration admin />;
}

export default AdminEditReg;
