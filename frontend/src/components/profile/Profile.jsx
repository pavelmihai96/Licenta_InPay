import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {request} from "../../axios_helper.js";
import "../../style/profile.css";
import { useAuth } from "../../service/AuthContext.jsx";

const Profile = () => {
    const auth = useAuth();

    const [name, setName] = useState('');

    const id = auth.user.userId;

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setName(auth.user.username);
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    return (
        <div className="profile-container">
            <h2 className="profile-heading">{name}</h2>
        </div>
    );




}

export default Profile;

