# To-Do List Backend API

The application provides a RESTful API implementation which connects to a To-Do List application developed using Node.js and Express.js and MongoDB Atlas. 
Assignment 8 part 1 https://docs.google.com/document/d/1k_VSp9RFDorCfwHiPEV3HvsVub80gNX7ZgLby_d0cgA/edit?usp=sharing
with screenshots of testing.

## Project Overview

The project creates backend APIs which enable users to control a To-Do List application for Assignment 8. The system allows users to perform complete task management operations which include task creation and task deletion and task retrieval and task modification together with the ability to filter tasks and search tasks and update task statuses.

## Features

- Users can create new tasks which include title and description and status and priority and due date and tags.
- Users can retrieve all tasks which include the option to filter tasks and sort tasks.
- Users can access task information through the unique ID assigned to each task.
- Users can change task details through the update process.
- Users can update task status through a separate process.
- Users can remove tasks from the system.
- Users can search tasks by title or description.
- Users can filter tasks based on their current status which includes pending and in-progress and completed states.
- Users can filter tasks based on their assigned priority levels which include low and medium and high.
- Users can sort tasks based on multiple selected fields.
- The system provides complete error management together with system validation for all operations.
- The system implements a RESTful API design which follows established best practice guidelines.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud Database)
- **ODM:** Mongoose
- **Environment Management:** dotenv
- **CORS:** cors middleware

## Project Structure

```
todo-list-backend/
├── controllers/
│   └── taskController.js       # Request handlers
├── models/
│   └── taskModel.js            # Mongoose schema and model
├── routes/
│   └── taskRoutes.js           # API route definitions
├── services/
│   └── taskService.js          # Business logic layer
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies
├── README.md                   # Project documentation
└── server.js                   # Main application entry point
```

## Installation

### Prerequisites

- You need to have Node.js installed which should be version 14 or a newer version.
- You need to install npm which is the Node Package Manager.
- You need to create a MongoDB Atlas account.

### Steps

1. Clone the repository
```bash
git clone 
cd todo-list-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
```

4. Start the server
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas.
2. Create a new cluster (Free M0 tier is sufficient).
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Set username and password
   - Grant "Atlas admin" privileges
4. Whitelist your IP address:
   - Go to Network Access
   - Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Get your connection string:
   - Go to Database
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `` with your database user password
   - Add database name after the cluster URL

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todolistapp?retryWrites=true&w=majority
```

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Get All Tasks
```http
GET /api/tasks
```

**The API accepts the following query parameters**
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description
- `sortBy` - Sort by field (createdAt, title, priority, dueDate)
- `order` - Sort order (asc, desc)

**Example:**
```http
GET /api/tasks?status=pending&priority=high&sortBy=dueDate&order=asc
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

#### 2. Get Task by ID
```http
GET /api/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6987503d5e8201e7b8b430d7",
    "title": "Complete Assignment 8 Part 1",
    "description": "Build backend APIs with Node.js, Express, and MongoDB",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-02-15T00:00:00.000Z",
    "tags": ["assignment", "backend", "mongodb"],
    "createdAt": "2026-02-07T14:46:21.208Z",
    "updatedAt": "2026-02-07T14:46:21.208Z"
  }
}
```

#### 3. Create Task
```http
POST /api/tasks
```

**Request Body:**
```json
{
  "title": "Complete Assignment 8 Part 1",
  "description": "Build backend APIs with Node.js, Express, and MongoDB",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-02-15",
  "tags": ["assignment", "backend", "mongodb"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {...}
}
```

#### 4. Update Task
```http
PUT /api/tasks/:id
```

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "completed",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {...}
}
```

#### 5. Update Task Status
```http
PATCH /api/tasks/:id/status
```

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task status updated successfully",
  "data": {...}
}
```

#### 6. Delete Task
```http
DELETE /api/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### 7. Search Tasks
```http
GET /api/tasks/search?q=assignment
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

## Testing

### Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension in VS Code
2. Create a new collection named "To-Do List API"
3. Import the following requests:

**Create Task:**
- Method: POST
- URL: `http://localhost:5000/api/tasks`
- Body: JSON (see Create Task endpoint above)

**Get All Tasks:**
- Method: GET
- URL: `http://localhost:5000/api/tasks`

**Get Task by ID:**
- Method: GET
- URL: `http://localhost:5000/api/tasks/{task_id}`

**Update Task:**
- Method: PUT
- URL: `http://localhost:5000/api/tasks/{task_id}`
- Body: JSON (see Update Task endpoint above)

**Update Status:**
- Method: PATCH
- URL: `http://localhost:5000/api/tasks/{task_id}/status`
- Body: `{"status": "completed"}`

**Delete Task:**
- Method: DELETE
- URL: `http://localhost:5000/api/tasks/{task_id}`

**Search Tasks:**
- Method: GET
- URL: `http://localhost:5000/api/tasks/search?q=assignment`

**Filter by Status:**
- Method: GET
- URL: `http://localhost:5000/api/tasks?status=pending`

## Error Handling

The API implements comprehensive error handling:

- **400 Bad Request** - Invalid input or validation errors
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server-side errors

Error Response Format:
```json
{
  "success": false,
  "message": "Error message here",
  "error": {...}
}
```

## Data Validation

The Task model includes the following validation rules:

- **title**: Required, max 200 characters
- **description**: Optional, max 1000 characters
- **status**: Must be one of: pending, in-progress, completed (default: pending)
- **priority**: Must be one of: low, medium, high (default: medium)
- **dueDate**: Optional, must be a valid date
- **tags**: Optional array of strings

## Challenges Faced and Solutions

### 1. MongoDB Atlas Connection Issues
**Challenge:** Initial authentication errors when connecting to MongoDB Atlas.

**Solution:** 
- Created a new database user with proper permissions
- Ensured IP address (0.0.0.0/0) was whitelisted in Network Access
- Used correct connection string format with database name

### 2. Code Organization
**Challenge:** Maintaining clean and maintainable code structure.

**Solution:** 
- Implemented Controller-Service-Routes architecture
- Separated business logic (service layer) from request handling (controller layer)
- Created reusable service methods for database operations

### 3. Error Handling
**Challenge:** Providing meaningful error messages for different scenarios.

**Solution:**
- Implemented centralized error handling middleware
- Added custom error status codes
- Included validation at both model and controller levels

### 4. Search Functionality
**Challenge:** Implementing efficient text search across multiple fields.

**Solution:**
- Created text index on title and description fields in MongoDB
- Used MongoDB's `$text` search operator for optimal performance

## Best Practices Implemented

- Asynchronous programming with async/await
- Environment variable configuration
- Modular code structure
- RESTful API design principles
- Proper HTTP status codes
- Input validation and sanitization
- Error handling middleware
- CORS configuration for frontend integration


## Author

Aliasgar Hussain
