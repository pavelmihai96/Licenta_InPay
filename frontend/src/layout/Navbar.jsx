import {Link, useParams} from 'react-router-dom';
import './navbar.css';
import {useAuth} from "../service/AuthContext.jsx";

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">InPay</div>
            <ul className="navbar-links">
                {auth.isLoggedIn ? (
                    <>
                        <li><Link to="/profile" className="nav-button">Profile</Link></li>

                        {/* Show Courses only for TEACHER or STUDENT */}
                        {auth.user.role === "PROVIDER" && (
                            <li><Link to={`/provider-facilities/${auth.user.userId}`} className="nav-button">Your services</Link></li>
                        )}

                        {/* Show Enrollments only for STUDENT */}
                        {auth.user.role === "CONSUMER" && (
                            <li><Link to={`/consumer-facilities/${auth.user.userId}`} className="nav-button">Services</Link></li>
                        )}
                        {auth.user.role === "CONSUMER" && (
                            <li><Link to={`/consumer-subscriptions/${auth.user.userId}`} className="nav-button">Subscriptions</Link></li>
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