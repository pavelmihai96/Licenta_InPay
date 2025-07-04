import "./login.css"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { removeAuthenticationToken, request, setAuthenticationToken } from "../../../axios_helper.js"
import {useAuth} from "../../../service/AuthContext.jsx";

const LogIn = () => {
  const userRef = useRef()
  const auth = useAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
  }, [email, password])

  const handleLogin = async (e) => {
    e.preventDefault();
    if (window.localStorage.getItem("auth_token") != null) {
      removeAuthenticationToken();
    }

    const loginresponse = await auth.login(email, password);
    console.log("loginresponse", loginresponse); // should show error if any

    if (loginresponse) {
      setErrorMessage(loginresponse);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };


  return (
      <div className="login-page">
        <div className="login-container">
          <h3>Log In</h3>
          <div>
            {errorMessage && (
                <div className="dialog-error">{errorMessage}</div>
            )}
          </div>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input
                type="text"
                name="email"
                ref={userRef}
                placeholder="Enter your email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">Login</button>
          </form>
          <p className="login-footer">
            Need an Account?
            <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
          </p>
        </div>
      </div>
  );



}

export default LogIn