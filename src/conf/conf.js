const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteProjectsCollectionID : String(import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID),
    appwriteEmployeesCollectionID : String(import.meta.env.VITE_APPWRITE_EMPLOYEES_COLLECTION_ID),
}

export default conf