import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import LogIn from "./Pages/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LogIn/>}/>
      </Routes>
    </Router>
  );
}

export default App;
