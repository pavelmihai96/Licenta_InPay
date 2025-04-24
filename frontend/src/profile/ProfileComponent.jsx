import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {request} from "../axios_helper";
import "./profile.css";
import { useAuth } from "../service/AuthContext.jsx";

const ProfileComponent = () => {
    const auth = useAuth();

    const [student, setStudent] = useState(null);
    const [teacher, setTeacher] = useState(null);

    const id = auth.user.userId;

    useEffect(() => {
        fetchProfile(id);
    }, [id]);

    const fetchProfile = async (id) => {
        try {
            let url = ``;
            if (auth.user.role === "STUDENT") {
                url = `/api/student/${id}`;
            } else if (auth.user.role === "TEACHER") {
                url = `/api/teacher/${id}`;
            }

            const response = await request("GET", url);

            if (auth.user.role === "STUDENT") {
                setStudent(response.data);
            } else if (auth.user.role === "TEACHER") {
                setTeacher(response.data);
            }

        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    return (
        <div className="profile-container">
            <h2 className="profile-heading">Profile</h2>
            {student && (
                <div className="profile-card">
                    <div className="profile-item"><span>Id:</span> {student.studentId}</div>
                    <div className="profile-item"><span>First Name:</span> {student.firstName}</div>
                    <div className="profile-item"><span>Last Name:</span> {student.lastName}</div>
                    <div className="profile-item"><span>Added on:</span> {new Date(student.createdAt).toDateString()}</div>
                    <div className="profile-item"><span>Role:</span> STUDENT</div>
                </div>
            )}
            {teacher && (
                <div className="profile-card">
                    <div className="profile-item"><span>Id:</span> {teacher.teacherId}</div>
                    <div className="profile-item"><span>First Name:</span> {teacher.firstName}</div>
                    <div className="profile-item"><span>Last Name:</span> {teacher.lastName}</div>
                    <div className="profile-item"><span>Added on:</span> {new Date(teacher.createdAt).toDateString()}</div>
                    <div className="profile-item"><span>Role:</span> TEACHER</div>
                </div>
            )}
        </div>
    );




}

export default ProfileComponent;

