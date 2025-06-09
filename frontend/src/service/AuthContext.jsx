import React, { createContext, useContext, useState, useEffect } from 'react';
import { removeAuthenticationToken, request, setAuthenticationToken } from "../axios_helper"
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/layout/LoadingSpinner.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("loginInfo");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const token = parsedUser.token;

            // Example token validation logic
            if (isTokenValid(token)) {
                setUser(parsedUser);
                setRole(parsedUser.role);
            } else {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const isTokenValid = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
            return payload.exp * 1000 > Date.now(); // Check expiration
        } catch (error) {
            console.error("Invalid token:", error);
            return false;
        }
    };

    const login = (email, password) => {
        request("POST", "/login", {
            email: email,
            password: password,
        })
            .then((response) => {
                setAuthenticationToken(response.data.token)

                localStorage.setItem("loginInfo", JSON.stringify(response.data))
                setRole(response.data.role)
                console.log("Login successfull")
                console.log("Auth token saved to local storage")

                const data = response.data;
                setUser(response.data);
                console.log(data);
                if (data.role === "CONSUMER") {
                    navigate(`/consumer-facilities/${data.userId}`)
                }
                else if (data.role === "ADMIN") {
                    navigate(`/provider-facilities/${data.userId}`)
                }

            })
            .catch((error) => {
                console.error("Login error:", error.response ? error.response.data : error.message)
            })
    };


    const logout = () => {
        localStorage.removeItem("loginInfo");
        setUser(null);
        setRole('');
        navigate('/login');
    };

    const isLoggedIn = !!user;

    if (loading) {
        return <LoadingSpinner/>; // Replace with a spinner or your loading component
    }

    return (
        <AuthContext.Provider value={{ role, user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
