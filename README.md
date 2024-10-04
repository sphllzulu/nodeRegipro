# Employee Management System

This is a full-stack Employee Management System with a React frontend and an Express.js backend. It allows users to view, add, edit, and delete employee records, providing a user-friendly interface for managing employee data efficiently.

## Features

- Display a list of employees in a table format
- Search employees by ID
- Add new employees
- Edit existing employee information
- Delete employees
- Upload and display employee profile images
- Responsive design for various screen sizes

## Technologies Used

### Frontend
- React
- axios for API calls
- styled-components for styling
- react-icons for icons

### Backend
- Express.js
- Firebase Admin SDK for database and storage
- Multer for handling file uploads
- CORS for enabling cross-origin requests

## Setup and Installation

### Frontend
1. Clone the repository
   ```
   git clone 
   ```
2. Navigate to the frontend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

### Backend
1. Navigate to the backend directory
2. Install dependencies:
   ```
   npm install express firebase-admin body-parser cors multer
   ```
3. Set up a Firebase project and download the admin SDK key
4. Place the Firebase admin key (firebaseAdminKey.json) in the backend directory
5. Start the server:
   ```
   node server.js
   ```

## API Endpoints

The backend server runs on `http://localhost:5000` with the following endpoints:

- GET `/employees`: Fetch all employees
- POST `/employee`: Add a new employee
- PUT `/employee/:id`: Update an employee
- DELETE `/employee/:id`: Delete an employee

## Backend Code Overview

```javascript
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// ... (rest of the backend code)

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

This backend uses Express.js and integrates with Firebase for data storage and file handling. It provides endpoints for CRUD operations on employee data and handles image uploads.

## Component Structure

- `Tbl`: Main component that renders the employee table and manages state
- `EmployeeRow`: Renders a single row in the employee table
- `EditEmployeeRow`: Renders an editable row for updating employee information
- `AddEmployeeForm`: Form for adding a new employee
- `Popup`: Reusable popup component for forms and confirmations
- `DeleteConfirmation`: Confirmation dialog for deleting an employee
- `EmployeeCount`: Displays the total number of employees

## Styling

The frontend application uses styled-components for styling, providing a clean and modern look. The styling is responsive and adapts to different screen sizes.

## Future Improvements

- Implement pagination for large datasets
- Add sorting functionality to table columns
- Implement more robust form validation
- Add user authentication and authorization
- Improve error handling and user feedback
- Implement server-side filtering and sorting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



