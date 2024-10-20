import React from 'react';
import authService from '../appwrite/auth_service';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            onLogout(); // Update authentication state in App
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <button
            type="button"
            className='text-gray-900 py-2 font-bold cursor-pointer group focus:outline-none'
            onClick={handleLogout}
        >
            Logout
            <div className="bg-gray-900 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </button>
    );
};

export default Logout;
