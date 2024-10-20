import React, { useState, useCallback } from 'react';
import authService from "../appwrite/auth_service"
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = useCallback((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        } else if (!password) {
            setErrorMessage('Password is required');
            return;
        }

        setErrorMessage('');
        try {
            await authService.login({ email, password });
            onLoginSuccess();
            navigate('/projects');
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            console.error("Login error:", error); // Log the error for debugging
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-auto lg:w-1/4">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        errorMessage={errorMessage}
                    />
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