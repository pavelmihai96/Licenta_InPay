import "./signup.css"

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../service/AuthService.jsx";
import { removeAuthenticationToken, request, setAuthenticationToken } from "../axios_helper";

const SignUpComponent = () => {
    let id = 0;
    let role_registered = "";
    const userRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        console.log(role);
    }, [role])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (!username || !email || !password || !confirmPassword || !firstName || !lastName) {
                alert("Please complete all fields");
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

                    id = response.data.userId;
                    role_registered = response.data.role;
                    console.log("id: " + id)
                    console.log("role registered: " + role_registered);

                    if (role_registered === "TEACHER") {
                        request('POST', `api/teacher/${id}`, {
                            userId: id,
                            firstName: firstName,
                            lastName: lastName,
                            createdAt: new Date().toISOString()
                        })
                            .then((response) => {
                                console.log("New teacher added!")
                            })
                            .catch((error) => {
                                console.error("Error adding user:", error)
                            });
                    } else {
                        request('POST', `api/student/${id}`, {
                            userId: id,
                            firstName: firstName,
                            lastName: lastName,
                            createdAt: new Date().toISOString()
                        })
                            .then((response) => {
                                console.log("New student added!")
                            })
                            .catch((error) => {
                                console.error("Error adding user:", error)
                            });
                    }

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
                <h3>Sign up</h3>
                <form>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>First name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <label>Confirm password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    <label>Role:</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label>Teacher</label>
                        <input
                            style={{width:'50%'}}
                            type="radio"
                            name="role"
                            onChange={(e) => setRole(e.target.value)}
                            value={"TEACHER"}
                        />
                        <label>Student</label>
                        <input
                            style={{width:'50%'}}
                            type="radio"
                            name="role"
                            onChange={(e) => setRole(e.target.value)}
                            value={"STUDENT"}
                        />
                    </div>
                    <button type="submit" onClick={handleSignUp}>Sign up</button>
                </form>
                <p>
                    Already have an account?<br />
                    <span className="line">
                        <Link to="/login">Log in</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignUpComponent;