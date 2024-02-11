import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [Name, setName] = useState("");
  const host = "http://localhost:5000/";
  const OnChange = (e) => {
    const { id, value } = e.target;
    if (id === "InputEmail1") {
      setEmail(value);
    } else if (id === "InputPassword1") {
      setPassword(value);
    } else if (id === "InputName1") {
      setName(value);
    }else if (id === "cInputPassword1") {
      setcPassword(value);
    }
  };
  const log = async (e) => {
    e.preventDefault(); 
    if(Password===cPassword){
    try {
      const response = await fetch(`${host}api/auth/signup`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: Name, email: Email, password: Password }), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      console.log(data);
      if (data.sucess) {
        localStorage.setItem("token", data.authtoken);
        navigate("/");
        props.showAlert("You have succesfully Signed Up  ","success"); 
      } else {
        props.showAlert("Signup Failed","danger"); 
      }
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {}}
    else{ 
      props.showAlert("Password and confirm password are not same","danger"); 
    
      setPassword("");
      setcPassword("");
    }
  };
  return (
    <div className="container">
      <form onSubmit={log}>
        <div className="form-group">
          <label htmlFor="InputName1">Name</label>
          <input
            value={Name}
            onChange={OnChange}
            type="text"
            className="form-control"
            id="InputName1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            minLength = { 3}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputEmail1">Email address</label>
          <input
            value={Email}
            onChange={OnChange}
            type="email"
            className="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">Password</label>
          <input
            value={Password}
            onChange={OnChange}
            type="password"
            className="form-control"
            id="InputPassword1"
            placeholder="Password"
            minLength = { 5}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="cInputPassword1">Confirm Password</label>
          <input
            value={cPassword}
            onChange={OnChange}
            type="password"
            className="form-control"
            id="cInputPassword1"
            placeholder="Confirm Password"
            minLength = { 5}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}
