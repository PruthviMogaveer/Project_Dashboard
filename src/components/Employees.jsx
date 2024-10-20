import React, { useEffect, useState } from 'react';
import employeeDatabaseService from '../appwrite/database_service/employee_database_service';
import CreateEmployee from './CreateEmployee';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [showCreateEmployee, setShowCreateEmployee] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true); // Set loading to true while fetching
        try {
            const data = await employeeDatabaseService.getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
            // Optionally, handle the error state (e.g., show a message)
        } finally {
            setLoading(false); // Always set loading to false
        }
    };

    const handleDelete = async (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await employeeDatabaseService.deleteEmployee(employeeId);
                setEmployees((prev) => prev.filter(employee => employee.$id !== employeeId)); // Update state optimally
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <button
                className="bg-black text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowCreateEmployee(true)}
            >
                Create Employee
            </button>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="text-gray-500">Loading employees...</span>
                </div>
            ) : (
                <>
                    {employees.length > 0 ? (
                        <ul className="space-y-4">
                            {employees.map((employee) => (
                                <li key={employee.$id} className="flex justify-between items-center bg-white p-4 rounded shadow hover:scale-105 transition-all duration-500">
                                    <span>{employee.name}</span>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(employee.$id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No employees available.</p>
                    )}
                </>
            )}

            {showCreateEmployee && (
                <CreateEmployee
                    onClose={() => setShowCreateEmployee(false)}
                    onEmployeeCreated={fetchEmployees}
                />
            )}
        </div>
    );
};

export default Employees;
