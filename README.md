# Task Manager API (Express App)

Written by Jake Bradford for Queensland University of Technology, IFN666 Web and Mobile Application Development.

## Purpose

The **Task Manager API** is a backend service built using **Express.js** that enables users to manage tasks, authenticate users, and organize tasks into categories. It supports creating, updating, deleting, and retrieving tasks, as well as managing user authentication. This API is designed to provide a secure and efficient backend for a task management application.

## API Endpoints

### **User Management**
- `POST /api/register` – Register a new user.
- `POST /api/login` – Login an existing user.

### **Task Management**
- `GET /api/tasks` – Retrieve all tasks for the logged-in user. Admins can view all tasks in the system.
- `POST /api/tasks` – Create a new task.

For the following endpoints, access to a task is restricted to the task's author and admin users:
- `GET /api/tasks/:id` – Retrieve a specific task by ID.
- `PUT /api/tasks/:id` – Update a task by ID.
- `DELETE /api/tasks/:id` – Delete a task by ID.

### **Task Categories**
- `GET /api/categories` – Retrieve all task categories.
- `POST /api/categories` – Create a new category.
- `PUT /api/categories/:id` – Update a task category by ID.
- `DELETE /api/categories/:id` – Delete a category by ID.

## How to Contribute
We welcome contributions to the development of the Task Manager API. Here's how you can contribute:

1. **Fork** the repository and clone it to your local machine.
2. **Create a new branch** for your feature or bug fix.
3. Make your changes and **commit** them with clear, descriptive commit messages.
4. **Push** your changes to your forked repository.
5. Submit a **Pull Request (PR)** to the main repository.

Please ensure that your contributions follow the existing code style, include appropriate tests, and are well-documented.

## Features
- **User Authentication:** Allows users to register, log in, and authenticate using JWT tokens.
- **Task Management:** Supports CRUD operations (Create, Read, Update, Delete) for tasks.
- **Task Categorization:** Tasks can be organized into categories.
- **Rate Limiting:** Protects the API from abuse by limiting the number of requests.
- **Error Handling:** Provides clear error messages for invalid requests.

## Dependencies

The **Task Manager API** has the following dependencies, listed in the `package.json` file:

- **express**: The web framework used to handle HTTP requests and routing.
- **mongoose**: MongoDB Object Data Modeling (ODM) library used to interact with the database.
- **bcryptjs**: For hashing and verifying user passwords during authentication.
- **jsonwebtoken**: For creating and validating JWT tokens for user authentication.
- **dotenv**: For managing environment variables securely.
- **express-rate-limit**: For rate-limiting incoming requests to prevent abuse.

To install these dependencies, you can simply run `npm install` in the root directory of the project.

## Application Architecture

The **Task Manager API** follows a **RESTful architecture** with the following structure:

- **Express.js** handles HTTP requests, routes, and middleware to control the flow of data.
- **MongoDB** is used as the database for storing user and task information, accessed through **Mongoose**.
- **JWT Authentication** is used to secure API endpoints. Users must log in to receive a JWT token, which is required to access protected routes.
- The API includes rate limiting through **express-rate-limit** to protect against brute-force attacks or excessive use.
- The application is divided into modules, such as **controllers** for managing business logic, **models** for interacting with the database, and **middleware** for tasks like authentication and error handling.

### Folder Structure:
```
/controllers     # Controller files handling business logic for user and task management
/models          # Mongoose models for the user, tasks, and categories
/routes          # API route definitions for user and task endpoints
/middleware      # Middlewares for authentication, error handling, and validation
/utils           # Helper-functions that are not middleware nor belong elsewhere
```

## How to Report Issues

To report an issue with the **Task Manager API**, follow these steps:

1. **Check the Issues page** on GitHub to see if the issue has already been reported.
2. If it hasn't been reported, create a new issue with the following information:
   - **Description of the issue**.
   - **Steps to reproduce** the issue.
   - **Expected behavior** and **actual behavior**.
   - Any relevant **error logs** or **screenshot**.
3. We will review your issue and respond as soon as possible.
