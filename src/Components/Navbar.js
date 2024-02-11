import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link
            className="navbar-brand mx-2 my-2 bg-primary "
            to="/"
            style={{ color: "Black" }}
          >
            CloudNote
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/" ? "active" : ""
                  } ${location.pathname === "/Home" ? "active" : ""}`}
                  aria-current="page"
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                
                <Link to="/Login" type="button" className="btn btn-light mx-2 ">
                  Login
                </Link>
                <Link to="/Signup" type="button" className="btn btn-light mx-2">
            
                  SignUp
                </Link>
              
              </>
            ) : (
              <button
                type="button"
                className="btn btn-light mx-2"
                onClick={logout}
              >
              
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
