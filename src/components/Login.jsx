import React, { useState } from 'react';
import authService from "../appwrite/auth_service"
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email format
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        setErrorMessage('');
        try {
            const session = await authService.login({ email, password });

            // Call onLoginSuccess to update the authentication state
            onLoginSuccess();
            navigate('/projects');
        } catch (error) {
            console.log("something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-auto lg:w-1/4">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:border-gray-400"
                            required
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:border-gray-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
