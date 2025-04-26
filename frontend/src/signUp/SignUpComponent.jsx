import "./signup.css"

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../service/AuthService.jsx";
import { removeAuthenticationToken, request, setAuthenticationToken } from "../axios_helper";

const SignUpComponent = () => {
    let id = 0;
    let role_registered = "";
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [serviceArea, setServiceArea] = useState("");

    useEffect(() => {
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (!role){
                alert("Please select a role.");
                return;
            }

            if (!username || !email || !password || !confirmPassword ) {
                alert("Please complete all fields.");
                return;
            }

            if (role === "CONSUMER" && (!firstName || !lastName || !address)){
                alert("Please complete all fields for consumer role.")
                return;
            }
            if (role === "PROVIDER" && (!companyName)){
                alert("Please complete all fields for provider role.")
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

                    if (role_registered === "CONSUMER") {
                        request('POST', `api/consumer`, {
                            userId: id,
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
                    } else {
                        request('POST', `api/provider`, {
                            userId: id,
                            companyName: companyName,
                            serviceArea: serviceArea,
                            createdAt: new Date().toISOString()
                        })
                            .then((response) => {
                                console.log("New provider added!")
                            })
                            .catch((error) => {
                                console.error("Error adding provider:", error)
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
                <h3>Sign Up</h3>
                <form className="form-grid" onSubmit={handleSignUp}>
                    <div className="form-column">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="form-column">
                        <div className="tab-buttons">
                            <button
                                type="button"
                                className={role === 'CONSUMER' ? 'active' : ''}
                                onClick={() => setRole('CONSUMER')}
                            >
                                Consumer
                            </button>
                            <button
                                type="button"
                                className={role === 'PROVIDER' ? 'active' : ''}
                                onClick={() => setRole('PROVIDER')}
                            >
                                Provider
                            </button>
                        </div>

                        {role === 'CONSUMER' && (
                            <>
                                <label>First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                                <label>Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                                <label>Address</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </>
                        )}

                        {role === 'PROVIDER' && (
                            <>
                                <label>Company Name</label>
                                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

                                <label>Service Area</label>
                                <input type="text" value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} />
                            </>
                        )}
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