import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import RegistrationForm from "./Pages/RegistrationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/registration" element={<RegistrationForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
