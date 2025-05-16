import { useAuth } from './AuthContext';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const auth = useAuth();

    return auth.isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
