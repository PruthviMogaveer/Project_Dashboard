import React, { useEffect, useState } from 'react';
import employeeDatabaseService from '../appwrite/database_service/employee_database_service';
import CreateEmployee from './CreateEmployee';
import UpdateEmployee from './UpdateEmployee';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [showCreateEmployee, setShowCreateEmployee] = useState(false);
    const [showUpdateEmployee, setShowUpdateEmployee] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await employeeDatabaseService.getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await employeeDatabaseService.deleteEmployee(employeeId);
                setEmployees((prev) => prev.filter(employee => employee.$id !== employeeId));
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };

    const handleUpdate = (employee) => {
        setCurrentEmployee(employee);
        setShowUpdateEmployee(true);
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
                                    <div>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                            onClick={() => handleUpdate(employee)} // Open update form
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleDelete(employee.$id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
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

            {showUpdateEmployee && currentEmployee && (
                <UpdateEmployee
                    employee={currentEmployee}
                    onClose={() => setShowUpdateEmployee(false)}
                    onEmployeeUpdated={fetchEmployees}
                />
            )}
        </div>
    );
};

export default Employees;
