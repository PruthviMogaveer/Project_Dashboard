import React, { useState } from 'react';
import employeeDatabaseService from '../appwrite/database_service/employee_database_service';

const UpdateEmployee = ({ employee, onClose, onEmployeeUpdated }) => {
    const [name, setName] = useState(employee.name);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await employeeDatabaseService.updateEmployee(employee.$id, { name });
            onEmployeeUpdated(); // Refresh the employee list
            onClose(); // Close the update form
        } catch (error) {
            console.error("Error updating employee:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-xl font-bold mb-4">Update Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded w-full"
                    >
                        {loading ? 'Updating...' : 'Update Employee'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-2 text-gray-600 w-full hover:underline"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployee;
