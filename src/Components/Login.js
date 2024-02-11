import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
export default function Login(props) {
    let navigate = useNavigate();
    const [Email, setEmail] = useState("") ; 
    const [Password, setPassword] = useState(""); 
    const host = "http://localhost:5000/" ; 
    const OnChange = (e)=> {
        const { id, value } = e.target;
    if (id === 'InputEmail1') {
       setEmail(value);
    } else if (id === 'InputPassword1') {
        setPassword(value);
    } 
    }
    const log = async (e)=>{
          e.preventDefault() ; 
        try {   const response = await fetch(`${host}api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
               
              },
            body: JSON.stringify({"email":Email ,"password":Password}), // body data type must match "Content-Type" header
          });
          const data = await response.json();
            console.log(data); 
            if(data.sucess){
               localStorage.setItem('token',data.authtoken);
               props.showAlert("You are logged in ","success"); 
               navigate("/");
               
            }
            else{     props.showAlert("Invalid Credentials","danger"); 
              
            }
            
           } catch (error) {
            
           }
           setEmail("");
           setPassword(""); 
          
    }
  return (
    <div className="container ">
      <form onSubmit = { log}>
        <div className="form-group my-3">
          <label htmlFor="InputEmail1">Email address</label>
          <input 
             value = {Email}
             onChange = { OnChange}
            type="email"
            className="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">Password</label>
          <input
          value = {Password}
           onChange = { OnChange}
            type="password"
            className="form-control"
            id="InputPassword1"
            placeholder="Password" 
            minLength = { 5}
            required 

          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
