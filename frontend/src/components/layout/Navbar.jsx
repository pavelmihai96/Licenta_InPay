import {Link, useParams} from 'react-router-dom';
import '../../style/navbar.css';
import {useAuth} from "../../service/AuthContext.jsx";
import TypographyComponent, {TypographyType} from "../commonComponents/Typography.tsx";
import LinkButton from "../commonComponents/IconButton.tsx";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-logo-brand">
                <img className="navbar-logo" src="/logo.png" alt="Logo" />
                <TypographyComponent type={TypographyType.BigTitle} text={"InPay"} truncated={true}/>
            </div>

            {/*<TypographyComponent type={TypographyType.CardTitle} text={auth.isLoggedIn && auth.role}/>*/}
            <ul className="navbar-links">
                {auth.isLoggedIn ? (
                    <>
                        <li><LinkButton to={`/provider-facilities/${auth.user.userId}`} role={"FALSE"} ariaLabel={'Facilities'} icon={<DashboardIcon/>} iconPosition={"left"}/></li>
                        <li><LinkButton to={`/provider-consumers-onP/${auth.user.userId}`} role={"FALSE"} ariaLabel={'Consumers'} icon={<AccountBoxIcon/>} iconPosition={"left"}/></li>
                        <li><LinkButton to={"/profile"} ariaLabel={'Profile'} role={"FALSE"} icon={<AccountBoxIcon/>} iconPosition={"left"}/></li>
                        <li><LinkButton to={`/consumer-facilities/${auth.user.userId}`} role={"CONSUMER"} ariaLabel={'Providers'} icon={<ManageAccountsIcon/>} iconPosition={"left"}/></li>
                        <li><LinkButton to={`/consumer-subscriptions/${auth.user.userId}`} role={"CONSUMER"} ariaLabel={'Subscriptions'} icon={<ListAltIcon/>} iconPosition={"left"}/></li>
                        <li><LinkButton to={`/consumer-invoices/${auth.user.userId}`} role={"CONSUMER"} ariaLabel={'Invoices'} icon={<PaymentsIcon/>} iconPosition={"left"}/></li>

                        <li><LinkButton to="/login" ariaLabel={'Log Out'} onClick={auth.logout} role={"TRUE"} icon={<LogoutIcon/>} iconPosition={"right"}/></li>
                    </>
                ) : (
                    <>
                        <li><LinkButton to="/login" ariaLabel={'Log In'} role={"TRUE"} icon={<LoginIcon/>} iconPosition={"left"}/></li>
                        <li><LinkButton to="/register" ariaLabel={'Sign Up'} role={"TRUE"} /></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;