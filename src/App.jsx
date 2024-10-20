import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Projects from './components/Projects';
import Employees from './components/Employees';
import Login from './components/Login';
import authService from './appwrite/auth_service';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(null);

  const checkAuthentication = async () => {
    const authStatus = await authService.isAuthenticated(); // Check auth status
    setIsAuthenticatedUser(authStatus);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  // Pass this function to Login and Header to update authentication state immediately
  const handleLoginSuccess = () => {
    setIsAuthenticatedUser(true);
  };

  const handleLogout = () => {
    setIsAuthenticatedUser(false); // Update state on logout
  };

  if (isAuthenticatedUser === null) {
    // Return a loading screen while checking authentication status
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticatedUser && <Header onLogout={handleLogout} />}
        <main className="max-sm:px-5 px-16 py-6">
          <Routes>
            <Route path="/" element={isAuthenticatedUser ? <Navigate to="/projects" /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticatedUser ? <Navigate to="/projects" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
