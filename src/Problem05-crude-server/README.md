# ExpressJS Backend Server with TypeScript

This project is a simple backend server built with ExpressJS and TypeScript. It provides a set of CRUD (Create, Read, Update, Delete) interfaces to interact with a resource. The server is connected to a SQLite database for data persistence.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **TypeScript** (`npm install -g typescript`)
- **MongoDB** (for database)

## Installation

Clone the repository:

```bash
git clone https://github.com/huuloc2026/BuiHuuLoc-CodeChallenge-99tech
cd src
cd Problem05-crude-server
```

Run Docker Compose

```bash
Docker Compose Up - D
```

Run Project

```bash
Npm run dev
```

## API Endpoints

| Method | URL             | Description                                          |
| ------ | --------------- | ---------------------------------------------------- |
| GET    | `/users/health` | Health check endpoint                                |
| POST   | `/users`        | Create a new user                                    |
| GET    | `/users`        | List all users (with pagination: `?page=1&limit=10`) |
| GET    | `/users/:id`    | Get user details                                     |
| PUT    | `/users/:id`    | Update user details                                  |
| DELETE | `/users/:id`    | Delete a user                                        |

## Testing with Postman or cURL

### Create a User

```bash
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com", "password": "123456"}'
```

### List Users

```bash
curl http://localhost:3000/users
```

### Get User Details

```bash
curl http://localhost:3000/users/{userId}
```

### Update User

```bash
curl -X PUT http://localhost:3000/users/{userId} \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Name"}'
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/users/{userId}
```

## API Request Examples

### Get all users (No filter)

```http
GET /users?page=1&limit=10
```

### Get users with `gender=male`

```http
GET /users?page=1&limit=10&gender=male
```

## Final Response Example

```json
{
  "status": "success",
  "message": "Filtered users retrieved successfully",
  "data": {
    "users": [
      {
        "id": "65abcd1234efg567hij890",
        "name": "John Doe",
        "email": "john@example.com",
        "gender": "male",
        "createdAt": "2025-02-12T12:00:00.000Z"
      }
    ],
    "pagination": {
      "totalUsers": 50,
      "totalPages": 5,
      "currentPage": 1,
      "limitPerPage": 10
    }
  }
}
```
