import conf from "../../conf/conf";
import { Client, Databases } from 'appwrite';

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
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID
            )
        } catch (error) {
            console.log("Appwrite service :: getProjects :: error", error)
        }
    }

    async createProject({ name, desc, employees }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                { name, desc, employees }
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
            const project = this.getProject(projectId)
            const updatedEmployees = [...project.employees, employeeId];
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                projectId,
                { employees: updatedEmployees }
            )
        } catch (error) {
            console.log("Appwrite service :: addEmployeeToProject :: error", error)

        }
    }

    //Remove employee from project
    async removeEmployeeFromProject(projectId, employeeId) {
        try {
            const project = this.getProject(projectId)
            const updatedEmployees = project.employees.filter(empId => empId !== employeeId);
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProjectsCollectionID,
                projectId,
                { employees: updatedEmployees }
            )
        } catch (error) {
            console.log("Appwrite service :: removeEmployeeFromProject :: error", error)

        }
    }
}

const projectDatabaseService = new ProjectDatabaseService();

export default projectDatabaseService