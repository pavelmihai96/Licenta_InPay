import DataTable from "react-data-table-component";
import "./dialog.css"
import "./column.css"

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../axios_helper";

const TeacherEnrollments = () => {

    // course id
    const { id } = useParams();

    const [students, setStudents] = useState([]);
    const [studentEmail, setStudentEmail] = useState('');

    const [assignment, setAssignment] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentMaxScore, setAssignmentMaxScore] = useState('');


    const [gradeHistories, setGradeHistories] = useState([]);

    const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
    const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] = useState(false);
    const [isSeeGradeHistoryOpen, setIsSeeGradeHistoryOpen] = useState(false);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    console.log(getAuthenticationToken());

    useEffect(() => {
        if (id) {
            fetchTableData(id);
            getAssignments(id);
        }
    }, [id]);

    useEffect(() => {
        if (students) {
            console.log(assignmentMaxScore);
        }
    }, [students]);

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

    const handleSeeGradeHistories = async (assignmentId, studentId) => {
        try {
            const response = await request("GET", `/api/grade-history/${assignmentId}/${studentId}`);
            setGradeHistories(response.data);
            setIsSeeGradeHistoryOpen(true);
        } catch (error) {
            console.error("Error fetching grade history:", error);
        }
    };

    const handleAddStudent = () => {
        setIsAddStudentDialogOpen(true);
    };

    const handleAddAssignment = () => {
        setIsAddAssignmentDialogOpen(true);
    };

    const handleCloseDialogs = () => {
        setIsAddStudentDialogOpen(false);
        setIsAddAssignmentDialogOpen(false);
        setIsSeeGradeHistoryOpen(false);

        setStudentEmail('');
        setAssignmentName('');
        setAssignmentMaxScore('');
    };

    const getStudent = async (studentEmail) => {
        try {
            const response = await request("GET", `/api/student/by/${studentEmail}`);

            return response.data.studentId
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const getAssignments = async (id) => {
        try {
            const response = await request("GET", `/api/assignment/all/${id}`);

            setAssignments(response.data)
            console.log("Assignments:")
            console.log(response.data)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const updateGrade = async (gradeId, newScore) => {
        try {
            const response = await request("PUT", `/api/grade/${gradeId}`, {
                score: newScore,
                updatedAt: new Date().toISOString(),
            });

            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.grades[gradeId]
                        ? {
                            ...student,
                            grades: {
                                ...student.grades,
                                [gradeId]: response.data
                            }
                        }
                        : student
                )
            );

            console.log("Assignments updated:", response.data);
        } catch (error) {
            console.error("Error updating grade:", error);
        }
    };

    const addToHistoryGrade = async (gradeId, oldScore, newScore) => {
        try {
            const response = await request("POST", `/api/grade-history`, {
                gradeId: gradeId,
                oldScore: oldScore,
                newScore: newScore,
                changedAt: new Date().toISOString(),
            });

            console.log("Grade history:", response.data);
        } catch (error) {
            console.error("Error updating grade:", error);
        }
    }

    const deleteEnrollment = async (enrollmentId) => {
        try {
            const response = await request("DELETE", `/api/enrollment/${enrollmentId}`)

            fetchTableData(id);
            console.log("Grade history:", response);
        } catch (error) {
            console.error("Error updating grade:", error);
        }
    }

    const getAssignment = async (assignmentId) => {
        try {
            const response = await request("GET", `/api/assignment/${assignmentId}`)

            console.log("getAssignment:", response.data.maxScore);

            return response.data.maxScore;
        } catch (error) {
            console.error("Error updating grade:", error);
        }
    }

    const handleGradeSubmit = async (studentId, assignmentId, score) => {
        try {
            if (score !== '' && score !== null) {
                const parsedScore = parseFloat(score);

                const maxScore = await getAssignment(assignmentId);
                if (parsedScore < 1 || parsedScore > maxScore) {
                    alert("The grade must be between 1 and " + maxScore);
                    return;
                }

                const existingGrade = students.find(student => student.studentId === studentId)?.grades?.[assignmentId];

                if (existingGrade) {
                    await updateGrade(existingGrade.gradeId, parsedScore);

                    await addToHistoryGrade(existingGrade.gradeId, existingGrade.score, parsedScore)

                    existingGrade.score = parsedScore;
                } else {
                    console.log("Creating new grade for student:", studentId, "and assignment:", assignmentId);

                    const response = await request("POST", '/api/grade', {
                        studentId: studentId,
                        assignmentId: assignmentId,
                        score: parsedScore,
                        gradedAt: new Date().toISOString(),
                    });

                    console.log("Grade created:", response.data);
                }
            }
        } catch (error) {
            console.error("Error submitting grade:", error);
        }
    };


    const fetchGradesForStudents = async (studentsList, assignmentsList) => {
        const updatedStudents = await Promise.all(
            studentsList.map(async (student) => {
                const grades = {};

                await Promise.all(assignmentsList.map(async (assignment) => {
                    try {
                        const response = await request("GET", `/api/grade/${assignment.assignmentId}/${student.studentId}`);
                        grades[assignment.assignmentId] = response.data;
                    } catch (error) {
                        console.error(`No grade found for student ${student.studentId} and assignment ${assignment.assignmentId}`);
                        grades[assignment.assignmentId] = null;
                    }
                }));

                return {
                    ...student,
                    grades: grades,
                };
            })
        );

        setStudents(updatedStudents);
    };

    const handleAddAssignmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request("POST", `/api/assignment`, {
                courseId: id,
                assignmentName: assignmentName,
                maxScore: assignmentMaxScore,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setIsAddAssignmentDialogOpen(false);
            await getAssignments(id);

            setAssignmentMaxScore('');
            setAssignmentName('');
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleAddStudentSubmit = async (e) => {
        e.preventDefault();

        const studentId = await getStudent(studentEmail);

        console.log(studentId)
        console.log(id)

        try {
            const response = await request('POST', 'api/enrollment', {
                studentId: studentId,
                courseId: id,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setIsAddStudentDialogOpen(false);
            fetchTableData(id);
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    const fetchTableData = async (id) => {
        setLoading(true);

        try {
            const enrollmentRes = await request("GET", `/api/enrollment/all/${id}`);
            const studentList = enrollmentRes.data.map((enrollment) => enrollment.student);

            const assignmentRes = await request("GET", `/api/assignment/all/${id}`);
            const assignmentList = assignmentRes.data;

            setAssignments(assignmentList);

            await fetchGradesForStudents(studentList, assignmentList);

        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            name: "Student name",
            selector: (row) => `${row.firstName} ${row.lastName}\n${formatDate(row.createdAt)}`,
            cell: (row) => (
                <div className="student-cell">
                    <div className="student-name"><strong>{row.firstName} {row.lastName}</strong></div>
                    <div className="student-date">{"Added: " + formatDate(row.createdAt)}</div>
                    <div className="student-date">{"Updated: " + formatDate(row.updatedAt)}</div>
                </div>
            )
        },
        ...(Array.isArray(assignments) && assignments.length > 0
            ? assignments.map((assignment) => ({
                name: (
                    <div className="assignment-header">
                        <strong>{assignment.assignmentName}</strong>
                        <div className="assignment-max-score">🎯 {assignment.maxScore}</div>
                    </div>
                ),
                cell: (row) => (
                    <div className="grade-cell">
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            max={assignment.maxScore}
                            defaultValue={row.grades?.[assignment.assignmentId]?.score || ''}
                            placeholder="-"
                            onInput={(e) => {
                                const value = e.target.value;
                                if (!/^\d*\.?\d{0,2}$/.test(value)) {
                                    e.target.value = value.slice(0, -1);
                                }
                            }}
                            onBlur={(e) =>
                                handleGradeSubmit(row.studentId, assignment.assignmentId, e.target.value)
                            }
                            className="grade-input"
                        />
                        <button
                            className="history-button"
                            title="View grade history"
                            onClick={() => handleSeeGradeHistories(assignment.assignmentId, row.studentId)}
                        >
                            🕓
                        </button>
                    </div>
                ),
                ignoreRowClick: true,
            })) : []),
        {
            name: "Remove student",
            selector: (row) => `${row.firstName} ${row.lastName}\n${formatDate(row.createdAt)}`,
            cell: (row) => (
                <button
                    className="remove-button"
                    onClick={() => deleteEnrollment(row.studentId)}
                    title="Remove student"
                >
                    ❌
                </button>
            )
        },
    ];

    const previousPage = () => {
        navigate(-1);
    }

    return (
        <div className="data-table">
            <div className="container">

                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>List of students</h2>
                        <button onClick={handleAddStudent}>Add students</button>
                        <button onClick={handleAddAssignment}>Add assignment</button>
                        <button onClick={previousPage}>Back</button>
                    </div>

                    <DataTable
                        columns={columns}
                        data={students}
                        progressPending={loading}
                        pagination
                        paginationPerPage={5}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                </div>

                {/* Dialog for adding students */}
                <dialog open={isAddStudentDialogOpen}>
                    <form onSubmit={handleAddStudentSubmit}>
                        <h3>Add new student</h3>
                        <label htmlFor="studentEmail">Student email:</label>
                        <input
                            type="text"
                            id="studentEmail"
                            name="studentEmail"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            required
                        />
                        <div>
                            <button type="button" onClick={handleCloseDialogs}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </dialog>

                {/* Dialog for adding assignments */}
                <dialog open={isAddAssignmentDialogOpen}>
                    <form onSubmit={handleAddAssignmentSubmit}>
                        <h3>Create new assignment</h3>
                        <label htmlFor="assignmentName">Assignment name:</label>
                        <input
                            type="text"
                            id="assignmentName"
                            name="assignmentName"
                            value={assignmentName}
                            onChange={(e) => setAssignmentName(e.target.value)}
                            required
                        />
                        <label htmlFor="assignmentScore">Assignment max score:</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            step="1"
                            id="assignmentScore"
                            name="assignmentScore"
                            value={assignmentMaxScore}
                            onChange={(e) => setAssignmentMaxScore(e.target.value)}
                            required
                        />
                        <div>
                            <button type="button" onClick={handleCloseDialogs}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </dialog>

                {/* Dialog pentru afișarea istoricului notelor */}
                <dialog open={isSeeGradeHistoryOpen} className="dialog-container">
                    <div>
                        <h3 className="dialog-title">Grade History</h3>

                        {gradeHistories.length > 0 ? (
                            <div className="grade-history-list">
                                {gradeHistories.map((history, index) => (
                                    <div key={index} className="grade-history-item">
                                        <div>
                                            <strong className="grade-history-scores">{history.oldScore} → {history.newScore}</strong>
                                            <div className="grade-history-date">
                                                {formatDate(history.changedAt)}
                                            </div>
                                        </div>
                                        <div className="grade-history-index">#{index + 1}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ textAlign: "center", color: "#888" }}>No history available for this grade.</p>
                        )}

                        <div className="close-button-container">
                            <button
                                onClick={() => setIsSeeGradeHistoryOpen(false)}
                                className="close-button"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    );
}

export default TeacherEnrollments;