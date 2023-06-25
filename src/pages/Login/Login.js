import { Link, useNavigate } from "react-router-dom";
import { getAuthFb } from "../../services/firebase/firestore";
import "./Login.css";
import { useState } from "react";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false)
  
  let navigate = useNavigate()
  

  const handleChangeEmail = (e) => {
    setemail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await getAuthFb(email, password);
      if(userLogin) {
        navigate('/')
      }
    } catch (error) {
      setemail("")
      setpassword("")
      seterror(true)
    }
  };

  return (
    <>
    <div className="button-list">
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="/">
                <button className="btn btn-light btn-block mt-2">
                  <i className="fa-solid fa-arrow-left"></i> Return to home
                </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
    
    <div className="page">
      <div className="container-login">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">
            By logging in you agree to the ridiculously long terms that you
            didn't bother to read
          </div>
        </div>
        <div className="right">
          <div className="form">
            <label htmlFor="email">Email</label>
            <input onChange={handleChangeEmail} type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input onChange={handleChangePassword} type="password" id="password" />
            <p>
              <small>
                You do not have an account? <Link to="/register">Sign up</Link>
              </small>
            </p>
            <input onClick={handleLogin} type="submit" id="submit" value="Submit" />
            {error && <p className="text-danger">Wrong email or password</p>}
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}
