import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import { contextJob } from "../../services/context/jobContext";
import { register } from "../../services/firebase/firestore";
import { useContext, useState } from "react";

export default function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false)
  const { setregister } = useContext(contextJob)
  
  let navigate = useNavigate()
  

  const handleChangeEmail = (e) => {
    setemail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleRegister = async (e) => {
    try {
        let newUser = await register(email, password)
        if(newUser) {
            setregister(true)
            navigate("/")
        }
    } catch (error) {
        seterror(error.message)
    }
  };

  return (
    <div className="page">
      <div className="container-login">
        <div className="left">
          <div className="login">Register</div>
          <div className="eula">
            By logging in you agree to the ridiculously long terms that you
            didn't bother to read
          </div>
        </div>
        <div className="right">
          <div className="form">
            <label htmlFor="email">Enter your email</label>
            <input onChange={handleChangeEmail} type="email" id="email" pattern="" />
            
            <label htmlFor="password">Password</label>
            <input onChange={handleChangePassword} type="password" id="password" />
            <p>
              <small>
               Do you already have an account? <Link to="/login">Sign in</Link>
              </small>
            </p>
            <input onClick={handleRegister} type="submit" id="submit" value="Submit" />
            {error && <p className="text-danger"><small>{error}</small></p>}
          </div>
        </div>
      </div>
    </div>
  );
}