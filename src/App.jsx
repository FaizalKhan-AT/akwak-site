import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import RegistrationForm from "./Pages/RegistrationForm";
import AdminPanel from "./Pages/AdminPanel";
import AdminLogin from "./Pages/AdminLogin";
import AdminEditReg from "./Pages/AdminEditReg";
import AdminNewReg from "./Pages/AdminNewReg";
import SuperAdminLogin from "./Pages/SuperAdminLogin";
import SuperAdminPanel from "./Pages/SuperAdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/edit" element={<AdminEditReg />} />
        <Route path="/admin/new" element={<AdminNewReg />} />
        <Route path="/super-admin" element={<SuperAdminPanel />} />
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
