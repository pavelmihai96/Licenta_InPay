import DataTable from "react-data-table-component";
import './listOfCourses.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { request } from "../axios_helper";

const EnrolledCourses = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTableData(id);
    }, [id]);

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('en-US', options).format(formattedDate);
    }

    const fetchTableData = async (id) => {
        setLoading(true);

        try {
            const student = await request("GET", `http://localhost:8080/api/student/${id}`);
            const studentId = student.data.studentId;
            const response = await request("GET", `http://localhost:8080/api/enrollment/student/${studentId}`);

            setCourses(response.data);
            console.log(response.data);
        } catch (err) {
            console.error("Eroare:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUserProfile = async (courseId) => {
        setLoading(true);

        try {
            navigate(`/enrollments/${id}/${courseId}`);
        } catch (err) {
            console.error("Eroare:", err);
        } finally {
            setLoading(false);
        }
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.course.courseId,
        },
        {
            name: "Name",
            selector: (row) => row.course.courseName,
        },
        {
            name: "CreatedAt",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "UpdatedAt",
            selector: (row) => formatDate(row.updatedAt),
        },
        {
            name: "See grades",
            cell: (row) => (
                <button onClick={() => handleUserProfile(row.course.courseId)}>
                    See Grades
                </button>
            ),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <DataTable
                        title="Your enrolled courses"
                        columns={columns}
                        data={courses}
                        progressPending={loading}
                        pagination
                        paginationPerPage={5}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                </div>
            </div>
        </div>
    )
}

export default EnrolledCourses;