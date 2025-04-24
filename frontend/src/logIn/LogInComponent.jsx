import "./login.css"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { removeAuthenticationToken, request, setAuthenticationToken } from "../axios_helper"
import {useAuth} from "../service/AuthContext.jsx";

const LogInComponent = () => {
  const userRef = useRef()
  const auth = useAuth();
  //   const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    if (email || password) {
      console.log("Debug - Email: " + email)
      console.log("Debug - Password: " + password)
    }
  }, [email, password])

  //for test
  const setAuthToken = () => {
    //test fara login, decomentati daca vreti sa faceti test fara login si comentati partea cu login
    //tokenu asta e valid pana in 21 aprilie
    setAuthenticationToken(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlkIjoxMywiZXhwIjoxNzQ1MjE4ODg2LCJpYXQiOjE3NDQ2MTQwODYsImVtYWlsIjoidGVzdCJ9.tP3zU4Sx2wqrBCpNLDoSpq3kdp7SGIfh235iilKk514"
    )
    console.log("test auth token set")
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (window.localStorage.getItem("auth_token") != null) {
      removeAuthenticationToken()
    }
    auth.login(email, password)
  }

  return (
    <div className="login-page">
      {/* for test */}
      <button onClick={setAuthToken}>Set Auth Token for test</button>
      <div className="login-container">
        <h3>Log In</h3>
        <form onSubmit={handleLogin}>
          <label>Email: comanmatei91gmail.com</label>
          <input type="text" name="email" ref={userRef} placeholder="Enter your email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password: 1234</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <button type="submit">Login</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
        <p>
          Forgot your password?
          <br />
          <span className="line">
            <Link to="/verify-email">Forgot password</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default LogInComponent

// enrollments/:id (student)
