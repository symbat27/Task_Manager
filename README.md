1. Project Overview

This project is a Task Manager Web Application developed as a final project for the course Advanced Databases (NoSQL). The system allows users to manage projects and tasks, track task status, and monitor project progress. MongoDB is used as the primary NoSQL database, while the backend exposes a RESTful API and the frontend provides a simple web interface.

The main goal of the project is to demonstrate:
advanced MongoDB data modeling,
CRUD operations,
aggregation pipelines,
indexes and performance optimization,
integration between frontend and backend.

2. System Architecture

The system follows a client–server architecture:

Frontend:
Implemented using HTML, CSS, and JavaScript.
It sends HTTP requests to the backend using the fetch API and displays the received data to the user.

Backend:
Implemented using Node.js and Express.
It exposes REST API endpoints and handles business logic.

Database:
MongoDB is used as the NoSQL database to store users, projects, and tasks.

Data flow:
User interacts with the frontend.
Frontend sends HTTP requests to the backend.
Backend processes requests and queries MongoDB.
MongoDB returns data to the backend.
Backend sends responses back to the frontend.

3. Database Schema Description
Collections: users, projects, tasks

Relations
tasks.projectId → projects._id (referenced)
tasks.assigneeId → users._id (referenced)
tasks.comments → embedded documents

This design avoids data duplication and supports scalability.

4. MongoDB Queries
CRUD, Advanced update, Aggregation 

5. API Documentation
Users
GET /users — retrieve all users

Projects
POST /projects — create a project
GET /projects — retrieve all projects
DELETE /projects/:id — delete a project

Tasks
POST /tasks — create a task
GET /tasks?projectId= — retrieve tasks by project
PATCH /tasks/:id/status — update task status
DELETE /tasks/:id — delete a task

Aggregation
GET /projects/:id/progress — returns task statistics by status

6. Indexing and Optimization Strategy
To optimize query performance, a compound index is used:
db.tasks.createIndex({ projectId: 1, status: 1 })

7. Contribution of Each Student

This project was completed individually.

Student: Symbat Zhuman
Contribution:

database design and data modeling
MongoDB queries and aggregations
backend development
frontend development
documentation and report preparation