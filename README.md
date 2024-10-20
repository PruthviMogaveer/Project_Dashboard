
**Project Management Dashboard**
This project is a Project Management Dashboard that allows an admin to manage employees and projects. 

**The admin can:
**
Log in to the dashboard.
Add, update, and delete employees.
Add, update, and delete projects.
Assign and unassign employees to/from specific projects.

**Key Features**

User Authentication:
Admin can log in to access the dashboard.
Only authenticated users can manage employees and projects.

Employee Management:
Admin can add new employees.
Admin can delete or update employee details.
List and display all employees in the system.

Project Management:
Admin can create new projects.
Admin can update project names and descriptions.
Admin can delete existing projects.

Employee Assignment:
Admin can assign or unassign employees to/from specific projects.
Immediately reflect changes to project-employee assignments.

**Technology Stack**
Frontend:
React.js with hooks for state management.
Tailwind CSS for responsive and modern UI design.

Backend:
Appwrite for user authentication and database management.

Routing:
React Router DOM for navigation and route protection.

**Setup and Installation**

Prerequisites:
Node.js and npm installed on your machine.
Appwrite instance for backend services.

Steps:
Clone the Repository:

git clone https://github.com/your-username/project-dashboard.git
cd project-dashboard

**Install Dependencies: **
Run the following command in the project root:

npm install

**
Configure Appwrite Backend:**

Set up Appwrite instance (or use an existing one).
Create necessary collections for employees and projects.
Ensure authentication services are properly configured.

**Update Environment Variables: **
In the .env file, add the necessary Appwrite credentials (project ID, endpoint, etc.):

REACT_APP_APPWRITE_ENDPOINT=<Appwrite endpoint>
REACT_APP_APPWRITE_PROJECT_ID=<Your project ID>
Run the Application: Start the development server:

npm start
Deploy to Vercel (Optional): F
ollow Vercel documentation to deploy the app:

Push code to GitHub.
Connect the repository to Vercel for automatic deployment.

**Usage**

Login:
The admin logs in with their Appwrite credentials.

Manage Employees:
View all employees.
Add, delete, or update employee details.

Manage Projects:
View all projects.
Add, delete, or update project details.

Assign Employees to Projects:
From the project details page, the admin can assign or remove employees.

**Project Structure**
bash
Copy code
├── src
│   ├── components
│   │   ├── Login.jsx
│   │   ├── Employees.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   └── Header.jsx
│   ├── appwrite
│   │   ├── auth_service.js
│   │   ├── employee_database_service.js
│   │   └── project_database_service.js
│   ├── App.js
│   └── index.js
└── README.md

**Error Handling**
Authentication Errors:

Invalid login credentials will show an error message.
Network Errors: Errors during data fetch, employee creation, or assignment will display a user-friendly error message.

Errors during data fetch, employee creation, or assignment will display a user-friendly error message.Live Demo
You can access the deployed project on Vercel at the following URL:

**Live Project Dashboard**
Admin Credentials:
Email: admin@gmail.com
Password: admin12345
Use these credentials to log in as an admin and access the functionality.
