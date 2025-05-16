import "./signup.css"

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../service/AuthService.jsx";
import { removeAuthenticationToken, request, setAuthenticationToken } from "../axios_helper";

const SignUpComponent = () => {
    const navigate = useNavigate();
    const role = "CONSUMER";

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (!username || !email || !password || !confirmPassword || !firstName || !lastName || !address) {
                alert("Please complete all fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter valid email");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }

            if (window.localStorage.getItem("auth_token") != null) {
                removeAuthenticationToken()
                console.log("removed")
            }

            request("POST", "/register", {
                username: username,
                email: email,
                password: password,
                role: role,
                createdAt: new Date().toISOString()
            })
                .then((response) => {
                    console.log("New user added!")
                    setAuthenticationToken(response.data.token)

                    //Add the new user also to Consumers table
                    request('POST', `api/consumer`, {
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        createdAt: new Date().toISOString()
                    })
                        .then((response) => {
                            console.log("New consumer added!")
                        })
                        .catch((error) => {
                                console.error("Error adding consumer:", error)
                        });
                })
                .catch((error) => {
                    console.error("Error adding user:", error)
                });

            navigate('/login');

        } catch (err) {
            console.log(err);
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <div className="register-page">
            <div className="signup-container">
                <h3>Sign Up</h3>
                <form className="form-grid" onSubmit={handleSignUp}>
                    <div className="form-column">
                        <label>Username</label>
                        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label>First Name</label>
                        <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                        <label>Last Name</label>
                        <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <label>Address</label>
                        <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />

                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </form>

                <button className="submit-button" type="submit" onClick={handleSignUp}>
                    Sign Up
                </button>

                <p className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpComponent;