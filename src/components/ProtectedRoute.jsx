import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../appwrite/auth_service';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await authService.isAuthenticated();
            setIsAuthenticatedUser(authStatus);
        };

        checkAuth();
    }, []);

    if (isAuthenticatedUser === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticatedUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute