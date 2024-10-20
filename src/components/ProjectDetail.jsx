import React, { useEffect, useState } from 'react';
import employeeDatabaseService from '../appwrite/database_service/employee_database_service';
import projectDatabaseService from '../appwrite/database_service/project_database_service';

const ProjectDetail = ({ project, onClose, onProjectUpdated }) => {
    const [employees, setEmployees] = useState([]);
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [isUpdating, setIsUpdating] = useState(false); // State to track if an operation is in progress


    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true)
        const allEmployees = await employeeDatabaseService.getEmployees();
        const currentEmployeeIds = project.employees ? project.employees.split(',') : []; // Split employee IDs
        setEmployees(allEmployees.filter(emp => currentEmployeeIds.includes(emp.$id)));
        setAvailableEmployees(allEmployees.filter(emp => !currentEmployeeIds.includes(emp.$id)));
        setLoading(false)
    };

    const handleAddEmployee = async (employeeId) => {
        setIsUpdating(true); // Set updating state to true

        setLoading(true)
        await projectDatabaseService.addEmployeeToProject(project.$id, employeeId);
        onProjectUpdated();
        // Immediately update the state to reflect the changes
        setEmployees(prev => [...prev, { $id: employeeId, name: availableEmployees.find(emp => emp.$id === employeeId).name }]);
        setAvailableEmployees(prev => prev.filter(emp => emp.$id !== employeeId));
        setLoading(false)
        setIsUpdating(false); // Reset updating state
    };

    const handleRemoveEmployee = async (employeeId) => {
        setIsUpdating(true); // Set updating state to true

        setLoading(true)
        await projectDatabaseService.removeEmployeeFromProject(project.$id, employeeId);
        onProjectUpdated();
        // Immediately update the state to reflect the changes
        setEmployees(prev => prev.filter(emp => emp.$id !== employeeId));
        setAvailableEmployees(prev => [...prev, { $id: employeeId, name: employees.find(emp => emp.$id === employeeId).name }]);
        setLoading(false)
        setIsUpdating(false); // Reset updating state
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-xl font-bold mb-4">{project.name}</h2>
                <p className="mb-4">{project.description}</p>
                {loading ? ( // Show loading indicator if loading is true
                    <div className="flex justify-center items-center h-32">
                        <span className="text-gray-500">Loading employees...</span>
                    </div>
                ) : (<>
                    <h3 className="font-semibold mb-2">Employees:</h3>
                    <ul className="space-y-2 mb-4">
                        {employees.map(emp => (
                            <li key={emp.$id} className="flex justify-between items-center">
                                <span>{emp.name}</span>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleRemoveEmployee(emp.$id)}
                                    disabled={isUpdating} // Disable button if updating
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="font-semibold mb-2">Add Employee:</h3>
                    <ul className="space-y-2 mb-4">
                        {availableEmployees.map(emp => (
                            <li key={emp.$id} className="flex justify-between items-center">
                                <span>{emp.name}</span>
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleAddEmployee(emp.$id)}
                                    disabled={isUpdating} // Disable button if updating
                                >
                                    Add
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-300 px-4 py-2 rounded w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProjectDetail;
