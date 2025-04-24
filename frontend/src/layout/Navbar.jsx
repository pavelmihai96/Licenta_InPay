import {Link, useParams} from 'react-router-dom';
import './navbar.css';
import {useAuth} from "../service/AuthContext.jsx";

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">School Management System</div>
            <ul className="navbar-links">
                {auth.isLoggedIn ? (
                    <>
                        <li><Link to="/profile" className="nav-button">Profile</Link></li>

                        {/* Show Courses only for TEACHER or STUDENT */}
                        {auth.user.role === "TEACHER" && (
                            <li><Link to={`/courses/${auth.user.userId}`} className="nav-button">Courses</Link></li>
                        )}

                        {/* Show Enrollments only for STUDENT */}
                        {auth.user.role === "STUDENT" && (
                            <li><Link to={`/enrollments/${auth.user.userId}`} className="nav-button">Enrollments</Link></li>
                        )}

                        <li>
                            <button onClick={auth.logout} className="logout-button">Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/register">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;