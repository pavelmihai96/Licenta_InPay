import DataTable from "react-data-table-component";
import './listOfCourses.css';
import './createCourses.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../axios_helper";

const ListOfCoursesComponent = () => {
    
    // teacher id
    const { id } = useParams();

    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData(id);
    }, [id]);

    console.log(getAuthenticationToken());

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

    const handleAddCourse = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setName('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id);
        try {
            const response = await request('POST', `api/course/${id}`, {
                courseName: name,
                teacherId: id,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setIsDialogOpen(false);
            fetchTableData(id);
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    const fetchTableData = async (id) => {
        setLoading(true);

        try {
            const response = await request("GET", `/api/course/all/${id}`);

            setCourses(response.data);
            console.log("courses: " + courses);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserProfile = (courseId) => {
        navigate(`/list-students/${courseId}`)
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.courseId,
        },
        {
            name: "Name",
            selector: (row) => row.courseName,
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
            name: "See course",
            cell: (row) => (
                <button onClick={() => handleUserProfile(row.courseId)}>
                    See Course
                </button>
            ),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>List of Courses</h2>
                        <button onClick={handleAddCourse}>Add Course</button>
                    </div>

                    <DataTable
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

                <dialog open={isDialogOpen}>
                    <form onSubmit={handleSubmit}>
                        <h3>Create New Course</h3>
                        <label htmlFor="courseName">Course Name:</label>
                        <input
                            type="text"
                            id="courseName"
                            name="courseName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div>
                            <button type="button" onClick={handleCloseDialog}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
}

export default ListOfCoursesComponent;