

# Interview Experience Submission Platform

## Overview

This project is a **Interview Experience Submission Platform** where users can submit and view their interview experiences. The front-end is built with **ReactJS**, while the back-end uses **Node.js** with **MongoDB** for data storage. The platform allows users to manage their submissions, and authentication is implemented to ensure that users can only manage their own submissions.

## Features

- **Submission Creation**: Users can submit their interview experiences, including the company name, country, interview questions, etc.
- **Submission Retrieval**: Users can view all submissions and view their own submissions by clicking on the "View" button.
- **Authentication**: Implemented using JWT to secure access, ensuring that users can only access and manage their own submissions.
- **Error Handling**: User-friendly error messages for invalid inputs and server issues.
- **Pagination**: Supports pagination for retrieving large datasets efficiently.
- **Search Functionality** (Bonus): Allows users to search through the submissions based on company, country, or questions.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Libraries & Tools**:
  - Mongoose (for MongoDB object modeling)
  - bcryptjs (for password hashing)
  - React Router (for routing)
  - react-toastify (for toast notifications)
  - axios (for API requests)

## Project Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (v14+)
- MongoDB (or a MongoDB cloud service like MongoDB Atlas)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```
   git clone <repository-url>
   cd interview-experience-platform
   ```

2. **Backend Setup (Node.js and MongoDB)**

   Navigate to the `Backend` directory:

   ```
   cd Backend
   ```

   Install the required dependencies:

   ```
   npm install
   ```

   Set up environment variables by creating a `.env` file with the following:

   ```
   # For IPv6:
   DB_URL = use Your Mongodb Atlas
   JWT_SECRET = JCok8ibiRY
   # Port
   Port = 2000

   ```

   Run the backend server:

   ```
   npm start
   ```

3. **Frontend Setup (ReactJS)**

   Navigate to the `Frontend` directory:

   ```
   cd ../Frontend
   ```

   Install the required dependencies:

   ```
   npm install
   ```

   Run the React development server:

   ```
   npm start
   ```

4. Open your browser and visit `http://localhost:3000` to view the platform.

### API Endpoints

- **POST /submissions**: Create a new interview experience submission.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "country": "India",
      "company": "Google",
      "questions": ["Tell us about yourself", "What is your greatest strength?"],
      "userId": "user123"
    }
    ```
  - **Response**: 201 Created with submission details.

- **GET /submissions**: Retrieve all submissions (with optional pagination).
  - **Query Parameters**: 
    - `page` (optional): Page number for pagination (default: 1)
    - `limit` (optional): Number of submissions per page (default: 10)
  - **Response**: 
    ```json
    [
      {
        "_id": "submission123",
        "name": "John Doe",
        "country": "India",
        "company": "Google",
        "questions": ["Tell us about yourself", "What is your greatest strength?"],
        "userId": "user123",
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2025-01-02T00:00:00Z"
      }
    ]
    ```

- **GET /submissions/:id**: Retrieve a single submission by ID.
  - **Response**: Submission details of the requested ID.

- **POST /auth/login**: Authenticate user and generate a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

  - **Response**: JWT token to be used in subsequent requests for authentication.

### Database Schema (MongoDB)

#### User Schema:

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

#### Submission Schema:

```js
const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  company: { type: String, required: true },
  questions: { type: [String], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

### Authentication and Authorization

- **JWT Authentication**: A token is generated upon user login and must be included in the headers (`Authorization: Bearer <token>`) for accessing protected routes.
- **Authorization Middleware**: Ensures users can only manage their own submissions.

### Testing

- **Submission Creation**: Test the creation of a submission with both valid and invalid input.
- **Submission Retrieval**: Verify retrieval of all submissions with and without pagination.
- **User Authentication**: Test login with valid and invalid credentials.
- **Authorization**: Ensure that users can only retrieve or delete their own submissions.

### Bonus Features

- **Search**: Implement a search functionality that allows users to filter submissions by company name, country, or interview questions.
- **Pagination**: Efficient pagination for retrieving large datasets of submissions.

## Challenges Faced

- Implementing efficient search and pagination.
- Handling JWT token expiration and renewal.
- Designing user-friendly error messages.

## Conclusion

This platform successfully enables users to submit and view their interview experiences, with secure authentication and efficient data management. The features are easy to extend and can be enhanced with additional functionalities like search and analytics.

## License

MIT License


