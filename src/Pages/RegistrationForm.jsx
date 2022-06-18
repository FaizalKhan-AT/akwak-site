import React from "react";
import { useContext } from "react";
import Registration from "../Components/Registration/Registration";
import { AuthContext } from "../Store/FirebaseContext";
import { Navigate } from "react-router-dom";

function RegistrationForm() {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  return <Registration />;
}

export default RegistrationForm;
