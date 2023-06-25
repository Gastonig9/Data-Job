import { Link, useNavigate } from "react-router-dom";
import { contextJob } from "../../services/context/jobContext";
import { useAuthListener } from "../../services/firebase/firestore";
import { logOut } from "../../services/firebase/firestore";
import "./Navbar.css";
import { useContext } from "react";

export default function Navbar() {
  useAuthListener();
  const { user, isAuth } = useContext(contextJob);
  let navigate = useNavigate()

  const signOut = () => {
    logOut()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://i.ibb.co/ykXxwDv/logo.png" alt="Logo" />
        <h6 className="navbar-title">DataJob</h6>
      </div>

      {isAuth ? (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user"></i> {user.email}
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item item-drop" to="/">
                <i className="fa-solid fa-briefcase"></i> Opportunities
              </Link>
            </li>
            <li>
              <Link className="dropdown-item item-drop" to="/applications">
                <i className="fa-solid fa-list"></i> Your profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item item-drop" to="/postjob">
                <i className="fa-sharp fa-solid fa-address-card"></i> Post a job
              </Link>
            </li>
            <li>
              <p onClick={signOut} className="dropdown-item item-drop-p">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </p>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="navbar-login-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="navbar-logout-btn">Register</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
