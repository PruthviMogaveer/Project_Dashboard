import React, { useEffect, useState } from 'react';
import projectDatabaseService from '../appwrite/database_service/project_database_service';
import CreateProject from './CreateProject';
import ProjectDetail from './ProjectDetail';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true); // Set loading to true while fetching
        const data = await projectDatabaseService.getProjects();
        setProjects(data);
        setLoading(false); // Set loading to false after fetching
    };

    const handleDelete = async (projectId) => {
        await projectDatabaseService.deleteProject(projectId);
        fetchProjects();
    };

    const handleAddEmployee = (project) => {
        setSelectedProject(project);
    };


    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <button
                className="bg-black text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowCreateProject(true)}
            >
                Create Project
            </button>
            {loading ? ( // Show loading indicator if loading is true
                <div className="flex justify-center items-center h-32">
                    <span className="text-gray-500">Loading projects...</span>
                </div>
            ) : (
                <ul className="space-y-4">
                    {projects.length > 0 ? (projects.map((project) => (
                        <li key={project.$id} className="flex max-sm:flex-col max-sm:space-y-2 justify-between items-center bg-white p-4 rounded shadow hover:scale-105 transition-all duration-500">
                            <span>{project.name}</span>
                            <div className='max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:space-y-2'>
                                <button
                                    className="bg-green-500 text-white px-3 py-1 max-sm:w-full rounded mr-2"
                                    onClick={() => handleAddEmployee(project)}
                                >
                                    Manage Employees
                                </button>
                                <button
                                    className="bg-red-500 text-white max-sm:w-full px-3 py-1 rounded"
                                    onClick={() => handleDelete(project.$id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))) : (<p>No projects available.</p>)}
                </ul>
            )}
            {showCreateProject && (
                <CreateProject onClose={() => setShowCreateProject(false)} onProjectCreated={fetchProjects} />
            )}
            {selectedProject && (
                <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} onProjectUpdated={fetchProjects} />
            )}
        </div>
    );
};

export default Projects;
