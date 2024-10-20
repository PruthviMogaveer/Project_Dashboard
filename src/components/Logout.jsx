import React from 'react';
import authService from '../appwrite/auth_service';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Check if the user is authenticated before attempting logout
            if (await authService.isAuthenticated()) {
                await authService.logout();
                onLogout(); // Call onLogout to update state in App
                navigate('/login');
            }
        } catch (error) {
            console.log("Something went wrong during logout", error);
        }
    };

    return (
        <a className='text-gray-900 py-2 font-bold cursor-pointer group'
            onClick={handleLogout}>
            Logout
            <div className="bg-gray-900 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </a>
    );
};

export default Logout
