import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Registraion from "../Components/Registration/Registration";
import { AuthContext } from "../Store/FirebaseContext";
function AdminNewReg() {
  return <Registraion add />;
}

export default AdminNewReg;
