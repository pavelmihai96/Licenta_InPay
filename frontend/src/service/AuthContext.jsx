import React, { createContext, useContext, useState, useEffect } from 'react';
import { removeAuthenticationToken, request, setAuthenticationToken } from "../axios_helper"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("loginInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("log from authcontext: " + JSON.stringify(storedUser));
        }
    }, []);


    const login = (email, password) => {
        request("POST", "/login", {
            email: email,
            password: password,
        })
            .then((response) => {
                setAuthenticationToken(response.data.token)

                localStorage.setItem("loginInfo", JSON.stringify(response.data))
                console.log("Login successfull")
                console.log("Auth token saved to local storage")

                const data = response.data;
                setUser(response.data);
                console.log(data);
                if (data.role === "TEACHER") {
                    navigate(`/courses/${data.userId}`)
                }
                else if (data.role === "STUDENT") {
                    navigate(`/enrollments/${data.userId}`)
                }

                //router.push("/dashboard") // or "/shop" depending on where you want to go
            })
            .catch((error) => {
                console.error("Login error:", error.response ? error.response.data : error.message)
            })
    };


    const logout = () => {
        localStorage.removeItem("loginInfo");
        setUser(null);
        navigate('/login');
    };

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth
export const useAuth = () => useContext(AuthContext);
