import { json } from "react-router-dom";
import conf from "../../conf/conf";
import { Client, Databases, ID } from 'appwrite';

export class ProjectDatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)

        this.databases = new Databases(this.client)
    }

    async getProjects() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID
            )
            return response.documents
        } catch (error) {
            console.log("Appwrite service :: getProjects :: error", error)
        }
    }

    async createProject({ name, description, employees }) {
        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                ID.unique(),
                { name, description, employees }
            )
        } catch (error) {
            console.log("Appwrite service :: createProject :: error", error)

        }
    }

    async deleteProject(projectId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                projectId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteProject :: error", error)

        }
    }
    // get the single project
    async getProject(projectId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                projectId
            )
        } catch (error) {
            console.log("Appwrite service :: getProject :: error", error)

        }
    }

    // Function to add employee to a project
    async addEmployeeToProject(projectId, employeeId) {
        try {
            const project = await this.getProject(projectId)

            if (!project.employees.includes(employeeId)) {
                const currentEmployees = project.employees ? project.employees.split(',') : [];
                const updatedEmployees = [...new Set([...currentEmployees, employeeId])]; // Ensure unique IDs
                const employeesString = updatedEmployees.join(',');
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseID,
                    conf.appwriteProjectsCollectionID,
                    projectId,
                    { employees: employeesString }
                )
            }
        } catch (error) {
            console.log("Appwrite service :: addEmployeeToProject :: error", error)

        }
    }

    //Remove employee from project
    async removeEmployeeFromProject(projectId, employeeId) {
        try {
            const project = await this.getProject(projectId)
            const currentEmployees = project.employees ? project.employees.split(',') : [];
            const updatedEmployees = currentEmployees.filter(empId => empId !== employeeId);
            const employeesString = updatedEmployees.join(',');
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                projectId,
                { employees: employeesString }
            )
        } catch (error) {
            console.log("Appwrite service :: removeEmployeeFromProject :: error", error)

        }
    }

    async updateProject(projectId, updatedData) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                projectId,
                updatedData
            )
        } catch (error) {
            console.log("Appwrite service :: update project :: error", error)
        }
    }
}

const projectDatabaseService = new ProjectDatabaseService();

export default projectDatabaseService