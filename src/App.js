import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Assuming Navbar is defined in a separate file
import Home from "./Components/Home"; // Assuming Home component is defined in a separate file
import About from "./Components/About";
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import NoteState from "./Context/Notes/NotesState";
import {useState} from "react" ; 
export default function App() {
   const [alert, setAlert] = useState(null) ; 
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2000);
}

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert = {alert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert = {showAlert}/>} /> 
          <Route exact path="/Home" element={<Home showAlert = {showAlert}/>} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Login" element={<Login showAlert = {showAlert}/>} />
          <Route exact path="/Signup" element={<Signup showAlert = {showAlert}/>} />
        </Routes>
      </Router>
    </NoteState>
  );
}
