import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '../axios_helper';
import './student.css';

const StudentGrades = () => {
    const { id, courseId } = useParams(); // Course ID from URL
    const [assignments, setAssignments] = useState([]);
    const [grades, setGrades] = useState({});
    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchStudentData();
    }, [courseId]);

    const fetchStudentData = async () => {
        try {
            setLoading(true);
            const studentRes = await request("GET", `/api/student/${id}`);
            setStudentInfo(studentRes.data);

            const assignmentsRes = await request("GET", `/api/assignment/all/${courseId}`);
            const assignmentList = assignmentsRes.data;
            setAssignments(assignmentList);

            const gradeMap = {};
            for (const assignment of assignmentList) {
                try {
                    const gradeRes = await request("GET", `/api/grade/${assignment.assignmentId}/${studentRes.data.studentId}`);
                    gradeMap[assignment.assignmentId] = gradeRes.data;
                } catch {
                    gradeMap[assignment.assignmentId] = null;
                }
            }
            setGrades(gradeMap);
        } catch (error) {
            console.error("Error loading student grade data", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Calculate the average score
    const calculateAverage = () => {
        const gradedScores = Object.values(grades)
            .filter(grade => grade !== null) // Only include graded assignments
            .map(grade => grade.score);

        if (gradedScores.length === 0) return null; // Return null if no assignments are graded

        const sum = gradedScores.reduce((acc, score) => acc + score, 0);
        return (sum / gradedScores.length).toFixed(2); // Round to 2 decimal places
    };

    return (
        <div className="grades-page">
            <div className="content-wrapper">
                <header className="page-header">
                    <h2>📚 My Grades</h2>
                    <button className="back-button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </header>

                {loading ? (
                    <p className="loading-message">Loading grades...</p>
                ) : (
                    <>
                        <section className="student-info">
                            <div className="student-header">
                                <h3 className="student-name">
                                    Student name: {studentInfo?.firstName} {studentInfo?.lastName} <h4>Average: {assignments.length > 0 && calculateAverage() ? calculateAverage() : 'No grades yet'}</h4>
                                </h3>
                            </div>
                        </section>

                        {assignments.length > 0 ? (
                            <table className="grades-table">
                                <thead>
                                <tr className="assignment-header">
                                    <th>Assignment</th>
                                    <th>Score</th>
                                    <th>Graded At</th>
                                </tr>
                                </thead>
                                <tbody>
                                {assignments.map((assignment) => {
                                    const grade = grades[assignment.assignmentId];
                                    return (
                                        <tr key={assignment.assignmentId} className="assignment-row">
                                            <td>{assignment.assignmentName}</td>
                                            <td>
                                                {grade ? grade.score : <span className="not-graded">Not graded</span>}
                                            </td>
                                            <td>{grade?.gradedAt ? formatDate(grade.gradedAt) : '-'}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-assignments">No assignments found for this course.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );



};

export default StudentGrades;
