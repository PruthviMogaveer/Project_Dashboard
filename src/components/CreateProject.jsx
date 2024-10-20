import React, { useState } from 'react';
import projectDatabaseService from '../appwrite/database_service/project_database_service';


const CreateProject = ({ onClose, onProjectCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true 

        await projectDatabaseService.createProject({ name, description, employees: '' });
        onProjectCreated();
        onClose();
        setLoading(false); // Set loading to false 
    };

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-xl font-bold mb-4">Create Project</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        required
                    />
                    <textarea
                        placeholder="Project Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded w-full"
                    >
                        {loading ? 'Creating...' : 'Create Project'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-2 text-gray-600 w-full  hover:underline"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
