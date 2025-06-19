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

    const login = async (email, password) => {
        try {
            const response = await request("POST", "/login", {
                email: email,
                password: password,
            });

            setAuthenticationToken(response.data.token);
            localStorage.setItem("loginInfo", JSON.stringify(response.data));
            localStorage.setItem("activeLink", "providers");
            setRole(response.data.role);

            const data = response.data;
            setUser(data);

            if (data.role === "CONSUMER") {
                navigate(`/consumer-facilities/${data.userId}`);
            } else if (data.role === "ADMIN") {
                navigate(`/provider-facilities/${data.userId}`);
            }

            return null;
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Login failed";
            console.error("Login error:", errorMsg);
            return errorMsg;
        }
    };



    const logout = () => {
        localStorage.removeItem("loginInfo");
        localStorage.removeItem("activeLink");
        setUser(null);
        setRole('');
        navigate('/login');
    };

    const isLoggedIn = !!user;

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <AuthContext.Provider value={{ role, user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
