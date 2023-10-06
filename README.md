Task Manager API

This is a RESTful API for managing tasks. Users can create, read, update, and delete tasks. Each task has a title, description, status, and due date. Users can sign up, log in, and manage their own tasks.

## Table of Contents

- Getting Started
  - Prerequisites
  - Installation
  - Environment Variables
- Usage
  - Authentication
  - Routes
- Database
- Task Model
- Middleware
- Scheduled Emails

Getting Started

Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-manager-api.git
   cd task-manager-api
   
2. Install dependencies:

  npm install
  
3. Environment Variables

Create a .env file in the root directory with the following environment variables:

    PORT = 3000;
    MONGODB_URL = mongodb+srv://abhinav:abhinav123@cluster0.gzzg1lh.mongodb.net/
    JWT_SECRET_KEY = abhi123

Usage

    Authentication
      Users can sign up by sending a POST request to /users/signup.
      Users can log in by sending a POST request to /users/login. This will provide an authentication token.
    Routes
      /tasks:
        GET: Get all tasks for the authenticated user.
        POST: Create a new task for the authenticated user.
      /tasks/:id:
        GET: Get a task by ID for the authenticated user.
        PATCH: Update a task by ID for the authenticated user.
        DELETE: Delete a task by ID for the authenticated user.
Database

    The application uses MongoDB as the database. User data and tasks are stored in separate collections.

Task Model

    The task model has the following properties:      
      title (String, required): The title of the task.
      description (String): The description of the task.
      status (String, enum: 'in progress', 'completed', 'not started', default: 'not started'): The status of the task.
      dueDate (Date, required): The due date of the task.
      owner (ObjectId, reference to User): The user who created the task. 
      
Middleware

    Authentication middleware is used to protect routes that require authentication.
    Request logging middleware logs incoming requests to access.log.
    
Scheduled Emails

    Email reminders are sent to users when a task's due date is near.



