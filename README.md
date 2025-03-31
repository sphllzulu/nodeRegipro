# Employee Management System

This is a full-stack Employee Management System with a React frontend and an Express.js backend. It allows users to view, add, edit, and delete employee records, providing a user-friendly interface for managing employee data efficiently.

## Screenshot
![Image](https://github.com/user-attachments/assets/9bae5331-2e4a-4e47-9a8c-e2d9f057c0b5)

## Deployed app link
https://noderegipro-2.onrender.com
Username:sysadmin@example.com
Password: SysAdmin123!


## Features

- Display a list of employees in a table format
- Search employees by ID
- Add new employees
- Edit existing employee information
- Delete employees
- Upload and display employee profile images
- Responsive design for various screen sizes
- User authentication (Login.jsx)
- Admin management (AddAdmin.jsx, RemoveAdminRights.jsx, AdminProfile.jsx)
- User activity tracking (Active.jsx, Removed.jsx)
- Navigation components (Navbar.jsx, BottomNavbarSmall.jsx)
- Image handling (FirebaseImage.jsx, Image.jsx)

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

### Development
- Concurrently for running multiple npm scripts simultaneously

## Setup and Installation

1. Clone the repository
 ```
git clone https://github.com/sphllzulu/nodeRegipro.git
 ```
3. 
4. Install dependencies for both frontend and backend:
   ```
   cd nodeRegipro && npm install
   cd ../backend && npm install
   ```
5. Set up Firebase and obtain the Admin SDK key (see Firebase Setup Details below)
6. Place the `firebaseAdminKey.json` file in the backend directory
7. Update the `databaseURL` and `storageBucket` in the server code with your Firebase project details
8. In the root directory, install Concurrently:
   ```
   npm install concurrently --save-dev
   ```
9. Add the following scripts to your root `package.json`:
   ```json
   "scripts": {
     "start": "concurrently \"npm run dev\" \"node backend/server\"",
     
   }
   ```
10. Start both the server and client with a single command:
   ```
   npm start
   ```

## Firebase Setup Details

To set up Firebase for this project:

1. Create a Firebase project:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard

2. Enable Firestore Database:
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database" and choose a starting mode (test mode or production mode)

3. Enable Storage:
   - In your Firebase project, go to "Storage"
   - Click "Get started" and follow the setup wizard

4. Obtain the Admin SDK key:
   - In your Firebase project, go to Project Settings > Service Accounts
   - Click on "Generate new private key"
   - This will download a JSON file containing your admin SDK credentials

5. Configure the backend:
   - Rename the downloaded JSON file to `firebaseAdminKey.json`
   - Place this file in your server directory
   - In your server code, update the following lines with your project details:
     ```javascript
     admin.initializeApp({
       credential: admin.credential.cert(serviceAccount),
       databaseURL: 'https://YOUR-PROJECT-ID.firebaseio.com',
       storageBucket: 'YOUR-PROJECT-ID.appspot.com' 
     });
     ```
   Replace `YOUR-PROJECT-ID` with your actual Firebase project ID.

6. Security Note:
   - Never commit `firebaseAdminKey.json` to version control
   - Add it to your `.gitignore` file to prevent accidental commits

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




