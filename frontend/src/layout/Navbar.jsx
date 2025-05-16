import {Link, useParams} from 'react-router-dom';
import './navbar.css';
import {useAuth} from "../service/AuthContext.jsx";
import TypographyComponent, {TypographyType} from "../components/commonComponents/Typography.tsx";
import LinkButton from "../components/commonComponents/IconButton.tsx";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-logo-brand">
                <img className="navbar-logo" src="/logo.png" alt="Logo" />
                <TypographyComponent type={TypographyType.BigTitle} text={"In Pay"} truncated={true}/>
            </div>

            <TypographyComponent type={TypographyType.CardTitle} text={auth.isLoggedIn && auth.user.role}/>
            <ul className="navbar-links">
                {auth.isLoggedIn ? (
                    <>
                        <li><LinkButton href="/profile" ariaLabel={'Profile'} icon={<AccountBoxIcon/>} iconPosition={"left"}/></li>

                        {/* PROVIDER ROLE */}
                        {auth.user.role === "PROVIDER" && (
                            <li><Link to={`/provider-facilities/${auth.user.userId}`} className="nav-button">Facilities</Link></li>
                            // <IconButton icon={"/logo.png"} onClick={}></IconButton>
                        )}
                        {auth.user.role === "PROVIDER" && (
                            <li><Link to={`/provider-consumers-onP/${auth.user.userId}`} className="nav-button">Consumers</Link></li>
                        )}

                        {/* CONSUMER ROLE */}
                        {auth.user.role === "CONSUMER" && (
                            <li><Link to={`/consumer-facilities/${auth.user.userId}`} className="nav-button">Facilities</Link></li>
                        )}
                        {auth.user.role === "CONSUMER" && (
                            <li><Link to={`/consumer-subscriptions/${auth.user.userId}`} className="nav-button">Subscriptions</Link></li>
                        )}
                        {auth.user.role === "CONSUMER" && (
                            <li><Link to={`/consumer-invoices/${auth.user.userId}`} className="nav-button">Invoices</Link></li>
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