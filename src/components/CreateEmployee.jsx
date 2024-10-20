import React, { useState } from 'react';
import employeeDatabaseService from '../appwrite/database_service/employee_database_service';

const CreateEmployee = ({ onClose, onEmployeeCreated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Loading state


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true 
        await employeeDatabaseService.createEmployee({ name, email });
        onEmployeeCreated();
        onClose();
        setLoading(false); // Set loading to false 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-xl font-bold mb-4">Create Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Employee Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded w-full"
                    >
                        {loading ? 'Creating...' : 'Create'}
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

export default CreateEmployee;
