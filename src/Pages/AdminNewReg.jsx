import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Registraion from "../Components/Registration/Registration";
import { AuthContext } from "../Store/FirebaseContext";
function AdminNewReg() {
  const { admin } = useContext(AuthContext);
  if (!admin) return <Navigate to="/admin/" />;
  return <Registraion add />;
}

export default AdminNewReg;
