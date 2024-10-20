import React, { useEffect, useState } from 'react';
import employeeDatabaseService from '../appwrite/database_service/employee_database_service';
import projectDatabaseService from '../appwrite/database_service/project_database_service';

const ProjectDetail = ({ project, onClose, onProjectUpdated }) => {
    const [employees, setEmployees] = useState([]);
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // State to track if in edit mode
    const [updatedName, setUpdatedName] = useState(project.name); // State for updated project name
    const [updatedDescription, setUpdatedDescription] = useState(project.description); // State for updated project description
    const [error, setError] = useState(''); // Error state

    useEffect(() => {
        fetchEmployees();
        setUpdatedName(project.name); // Initialize updated name
        setUpdatedDescription(project.description); // Initialize updated description
    }, [project]);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(''); // Clear previous error message
        try {
            const allEmployees = await employeeDatabaseService.getEmployees();
            const currentEmployeeIds = project.employees ? project.employees.split(',') : [];

            setEmployees(allEmployees.filter(emp => currentEmployeeIds.includes(emp.$id)));
            setAvailableEmployees(allEmployees.filter(emp => !currentEmployeeIds.includes(emp.$id)));
        } catch (error) {
            setError('Failed to load employees. Please try again.');
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = async (employeeId) => {
        if (isUpdating) return; // Prevent multiple updates at the same time

        setIsUpdating(true);
        setError(''); // Clear previous error message
        try {
            await projectDatabaseService.addEmployeeToProject(project.$id, employeeId);
            onProjectUpdated();
            updateEmployeeLists(employeeId, true); // Update state immediately
        } catch (error) {
            setError('Failed to add employee. Please try again.');
            console.error("Error adding employee:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRemoveEmployee = async (employeeId) => {
        if (isUpdating) return; // Prevent multiple updates at the same time

        setIsUpdating(true);
        setError(''); // Clear previous error message
        try {
            await projectDatabaseService.removeEmployeeFromProject(project.$id, employeeId);
            onProjectUpdated();
            updateEmployeeLists(employeeId, false); // Update state immediately
        } catch (error) {
            setError('Failed to remove employee. Please try again.');
            console.error("Error removing employee:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const updateEmployeeLists = (employeeId, isAdding) => {
        if (isAdding) {
            setEmployees(prev => [...prev, { $id: employeeId, name: availableEmployees.find(emp => emp.$id === employeeId).name }]);
            setAvailableEmployees(prev => prev.filter(emp => emp.$id !== employeeId));
        } else {
            setEmployees(prev => prev.filter(emp => emp.$id !== employeeId));
            setAvailableEmployees(prev => [...prev, { $id: employeeId, name: employees.find(emp => emp.$id === employeeId).name }]);
        }
    };

    const handleUpdateProject = async () => {
        setIsUpdating(true);
        setError(''); // Clear previous error message
        try {
            const updatedProject = await projectDatabaseService.updateProject(project.$id, { name: updatedName, description: updatedDescription });
            
            // Update the local project data to reflect changes immediately
            project.name = updatedProject.name;
            project.description = updatedProject.description;
    
            // Call the callback to notify parent component (if necessary)
            onProjectUpdated(); 
            
            // Exit edit mode
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update project. Please try again.');
            console.error("Error updating project:", error);
        } finally {
            setIsUpdating(false);
        }
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                {isEditing ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                            required
                        />
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                            required
                        />
                        <button
                            onClick={handleUpdateProject}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            disabled={isUpdating} // Disable button if updating
                        >
                            {isUpdating ? 'Updating...' : 'Update Project'}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)} // Exit edit mode
                            className="mt-2 bg-gray-300 px-4 py-2 rounded w-full"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4">{project.name}</h2>
                        <p className="mb-4">{project.description}</p>
                        <button
                            onClick={() => setIsEditing(true)} // Enter edit mode
                            className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
                        >
                            Edit Project
                        </button>
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <span className="text-gray-500">Loading employees...</span>
                            </div>
                        ) : (
                            <>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
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
