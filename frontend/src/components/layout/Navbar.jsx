import '../../style/navbar.css';
import { useAuth } from "../../service/AuthContext.jsx";
import TypographyComponent, { TypographyType } from "../commonComponents/Typography.tsx";
import LinkButton from "../commonComponents/IconButton.tsx";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

const Navbar = () => {
    const auth = useAuth();
    const [activeLink, setActiveLink] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const refreshFlag = sessionStorage.getItem("isRefreshed");
        const lastActiveLink = localStorage.getItem("activeLink");

        if (!refreshFlag) {
            sessionStorage.setItem("isRefreshed", "true");
        } else {
            setActiveLink(lastActiveLink);
        }
    }, [auth.isLoggedIn, localStorage.getItem("activeLink")]);

    const handleMenuToggle = () => setMenuOpen(prev => !prev);
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        localStorage.setItem("activeLink", linkName);
        //setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo-brand">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <img className="navbar-logo" src="/logo.png" alt="Logo" />
                    <TypographyComponent type={TypographyType.BigTitle} text={"InPay"} truncated={"true"} />
                </div>
                <button className="burger-icon" onClick={handleMenuToggle}>
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
                {auth.isLoggedIn ? (
                    <>
                        <div className="navbar-links-left-links">
                            <li><LinkButton to={`/consumer-facilities/${auth.user.userId}`} isactive={activeLink === "providers" ? "true" : undefined} onClick={() => handleLinkClick("providers")} className={activeLink === "providers" ? "active-link" : ""} role={"CONSUMER"} ariaLabel={'Providers'} icon={<ManageAccountsIcon />} iconPosition={"left"} /></li>
                            <li><LinkButton to={`/consumer-subscriptions/${auth.user.userId}`} isactive={activeLink === "subscriptions" ? "true" : undefined} onClick={() => handleLinkClick("subscriptions")} className={activeLink === "subscriptions" ? "active-link" : ""} role={"CONSUMER"} ariaLabel={'Subscriptions'} icon={<ListAltIcon />} iconPosition={"left"} /></li>
                            <li><LinkButton to={`/consumer-invoices/${auth.user.userId}`} isactive={activeLink === "invoices" ? "true" : undefined} onClick={() => handleLinkClick("invoices")} className={activeLink === "invoices" ? "active-link" : ""} role={"CONSUMER"} ariaLabel={'Invoices'} icon={<PaymentsIcon />} iconPosition={"left"} /></li>
                        </div>
                        <li><LinkButton to="/login" ariaLabel={'Log Out'} onClick={() => { auth.logout(); setMenuOpen(false); }} role={"TRUE"} icon={<LogoutIcon />} iconPosition={"right"} /></li>
                    </>
                ) : (
                    <>
                        <li><LinkButton to="/login" ariaLabel={'Log In'} role={"TRUE"} icon={<LoginIcon />} iconPosition={"left"} /></li>
                        <li><LinkButton to="/register" ariaLabel={'Sign Up'} role={"TRUE"} /></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
