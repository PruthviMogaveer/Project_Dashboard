import conf from "../conf/conf";
import { Client, Account } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)

        this.account = new Account(this.client)
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    async isAuthenticated() {
        try {
            const session = await this.account.get();
            return true
        } catch (error) {
            console.log("Appwrite service :: isAuthenticated :: error", error);
            return false
        }
    }
}

const authService = new AuthService();

export default authService