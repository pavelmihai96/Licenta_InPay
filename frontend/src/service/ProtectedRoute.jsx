import { useAuth } from './AuthContext';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const auth = useAuth();

    if (auth.isLoggedIn === undefined) {
        return null; // Render nothing until `isLoggedIn` is defined
    }

    if (!!auth.isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
