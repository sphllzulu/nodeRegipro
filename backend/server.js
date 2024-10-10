



// // server.js
// const express = require('express');
// const admin = require('firebase-admin');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Initialize Firebase Admin SDK
// const serviceAccount = require('C');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://employeereg-bab7e.firebaseio.com',
//   storageBucket: 'employeereg-bab7e.appspot.com' 
// });

// const db = admin.firestore();
// const bucket = admin.storage().bucket();

// // Set up multer for handling file uploads
// const upload = multer({ storage: multer.memoryStorage() });

// // Fetch employees
// app.get('/employees', async (req, res) => {
//   try {
//     const employeesSnapshot = await db.collection('employees').get();
//     const employees = employeesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.status(200).send(employees);
//   } catch (error) {
//     res.status(500).send('Error fetching employees');
//   }
// });

// // Add employee
// app.post('/employee', upload.single('image'), async (req, res) => {
//   try {
//     const employeeData = JSON.parse(req.body.employeeData);
//     let imageUrl = '';

//     if (req.file) {
//       const fileName = `${Date.now()}_${req.file.originalname}`;
//       const file = bucket.file(fileName);
//       await file.save(req.file.buffer, { contentType: req.file.mimetype });
//       imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//     }

//     employeeData.image = imageUrl;
//     const docRef = await db.collection('employees').add(employeeData);
//     res.status(201).send({ id: docRef.id, ...employeeData });
//   } catch (error) {
//     console.error('Error adding employee:', error);
//     res.status(500).send('Error adding employee');
//   }
// });

// // Update employee
// app.put('/employee/:id', upload.single('image'), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = JSON.parse(req.body.employeeData);
    
//     if (req.file) {
//       const fileName = `${Date.now()}_${req.file.originalname}`;
//       const file = bucket.file(fileName);
//       await file.save(req.file.buffer, { contentType: req.file.mimetype });
//       updatedData.image = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//     }

//     await db.collection('employees').doc(id).update(updatedData);
//     res.status(200).send({ id, ...updatedData });
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     res.status(500).send('Error updating employee');
//   }
// });

// // Delete employee
// app.delete('/employee/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await db.collection('employees').doc(id).get();
//     const data = doc.data();

//     if (data && data.image) {
//       const fileName = path.basename(data.image);
//       await bucket.file(fileName).delete();
//     }

//     await db.collection('employees').doc(id).delete();
//     res.status(200).send('Employee deleted successfully');
//   } catch (error) {
//     console.error('Error deleting employee:', error);
//     res.status(500).send('Error deleting employee');
//   }
// });

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');



const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseAdminKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://employeeregistration-2e7ae.firebaseio.com',
  storageBucket: 'employeeregistration-2e7ae.appspot.com' 
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Set up multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Function to initialize admin collection
async function initializeAdminCollection() {
  const adminRef = db.collection('admins');
  const snapshot = await adminRef.get();

  if (snapshot.empty) {
    console.log('No admins found. Creating initial admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await adminRef.add({
      username: 'admin',
      password: hashedPassword,
      name: 'System',
      surname: 'Admin',
      age: 30,
      idNumber: 'ADMIN001',
      role: 'sysadmin',
      photo: '' 
    });
    console.log('Initial admin user created.');
  } else {
    console.log('Admin collection already initialized.');
  }
}

// Call the initialization function when the server starts
initializeAdminCollection().catch(console.error);

//Fetch employees
app.get('/employees', async (req, res) => {
  try {
    const employeesSnapshot = await db.collection('employees').get();
    const employees = employeesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Error fetching employees');
  }
});

// app.get('/test', (req, res) => {
//   res.status(200).send('Test route working');
// });

// Add employee
app.post('/employee', upload.single('image'), async (req, res) => {
  try {
    const employeeData = JSON.parse(req.body.employeeData);
    let imageUrl = '';

    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      await file.save(req.file.buffer, { contentType: req.file.mimetype });
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    employeeData.image = imageUrl;
    const docRef = await db.collection('employees').add(employeeData);
    res.status(201).send({ id: docRef.id, ...employeeData });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).send('Error adding employee');
  }
});

// Update employee
app.put('/employee/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = JSON.parse(req.body.employeeData);
    
    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      await file.save(req.file.buffer, { contentType: req.file.mimetype });
      updatedData.image = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    await db.collection('employees').doc(id).update(updatedData);
    res.status(200).send({ id, ...updatedData });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Error updating employee');
  }
});

// Delete employee
app.delete('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('employees').doc(id).get();
    const data = doc.data();

    if (data && data.image) {
      const fileName = path.basename(data.image);
      await bucket.file(fileName).delete();
    }

    await db.collection('employees').doc(id).delete();
    res.status(200).send('Employee deleted successfully');
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send('Error deleting employee');
  }
});



// New admin-related endpoints

// Fetch all admins
app.get('/admins', async (req, res) => {
  try {
    const adminsSnapshot = await db.collection('admins').get();
    const admins = adminsSnapshot.docs.map((doc) => {
      const data = doc.data();
      delete data.password; // Don't send password to client
      return { id: doc.id, ...data };
    });
    res.status(200).send(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).send('Error fetching admins');
  }
});



// Add new admin
app.post('/admin', async (req, res) => {
  try {
    const { username, password, name, surname, age, idNumber, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminData = {
      username,
      password: hashedPassword,
      name,
      surname,
      age,
      idNumber,
      role: role || 'admin', // Default to 'admin' if not specified
      photo: '' // You can handle photo upload separately
    };
    const docRef = await db.collection('admins').add(adminData);
    const responseData = { ...adminData, id: docRef.id };
    delete responseData.password; 
    res.status(201).send(responseData);
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).send('Error adding admin');
  }
});

// Remove admin rights
// app.put('/admin/:id/remove-rights', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const adminRef = db.collection('admins').doc(id);
//     const doc = await adminRef.get();
    
//     if (!doc.exists) {
//       res.status(404).send('Admin not found');
//       return;
//     }

//     if (doc.data().role === 'sysadmin') {
//       res.status(403).send('Cannot remove rights from system admin');
//       return;
//     }

//     // Update the admin's role to 'user' in Firestore
//     await adminRef.update({ role: 'user' });

//     // Remove the user from Firebase Authentication
//     const uid = doc.data().uid; 
//     if (uid) {
//       await admin.auth().deleteUser(uid);
//     }

//     res.status(200).send('Admin rights removed successfully and user removed from authentication');
//   } catch (error) {
//     console.error('Error removing admin rights:', error);
//     res.status(500).send('Error removing admin rights');
//   }
// });
 

// Remove admin rights
app.put('/admin/:id/remove-rights', async (req, res) => {
  try {
    const { id } = req.params;
    const adminRef = db.collection('admins').doc(id);
    const doc = await adminRef.get();

    if (!doc.exists) {
      return res.status(404).send('Admin not found');
    }

    const adminData = doc.data();

    // Prevent removing rights from system admin
    if (adminData.role === 'sysadmin') {
      return res.status(403).send('Cannot remove rights from system admin');
    }

    // Update role in Firestore to 'user'
    await adminRef.update({ role: 'user' });

    // Remove the user from Firebase Authentication if UID exists
    const uid = adminData.uid;
    if (uid) {
      await admin.auth().deleteUser(uid);
      console.log(`User with UID: ${uid} has been deleted from Firebase Auth.`);
    }

    res.status(200).send('Admin rights removed successfully and user removed from authentication');
  } catch (error) {
    console.error('Error removing admin rights:', error);
    res.status(500).send('Error removing admin rights');
  }
});


// app.put('/admin/:id/remove-rights', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const adminRef = db.collection('admins').doc(id);
//     const doc = await adminRef.get();
    
//     if (!doc.exists) {
//       res.status(404).send('Admin not found');
//       return;
//     }

//     if (doc.data().role === 'sysadmin') {
//       res.status(403).send('Cannot remove rights from system admin');
//       return;
//     }

//     await adminRef.update({ role: 'user' });
//     res.status(200).send('Admin rights removed successfully');
//   } catch (error) {
//     console.error('Error removing admin rights:', error);
//     res.status(500).send('Error removing admin rights');
//   }
// });

// Get admin profile



app.get('/admin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('admins').doc(id).get();
    
    if (!doc.exists) {
      res.status(404).send('Admin not found');
    } else {
      const data = doc.data();
      delete data.password; 
      res.status(200).send({ id: doc.id, ...data });
    }
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).send('Error fetching admin profile');
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// const express = require('express');
// const admin = require('firebase-admin');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const bcrypt = require('bcrypt');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Initialize Firebase Admin SDK
// const serviceAccount = require('./firebaseAdminKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://employeereg-bab7e.firebaseio.com',
//   storageBucket: 'employeereg-bab7e.appspot.com' 
// });

// const db = admin.firestore();
// const bucket = admin.storage().bucket();

// // Set up multer for handling file uploads
// const upload = multer({ storage: multer.memoryStorage() });

// // Function to initialize admin collection
// async function initializeAdminCollection() {
//   const adminRef = db.collection('admins');
//   const snapshot = await adminRef.get();

//   if (snapshot.empty) {
//     console.log('No admins found. Creating initial admin user...');
//     const hashedPassword = await bcrypt.hash('admin123', 10);
//     await adminRef.add({
//       username: 'admin',
//       password: hashedPassword,
//       name: 'System',
//       surname: 'Admin',
//       age: 30,
//       idNumber: 'ADMIN001',
//       role: 'sysadmin',
//       photo: '' 
//     });
//     console.log('Initial admin user created.');
//   } else {
//     console.log('Admin collection already initialized.');
//   }
// }

// // Call the initialization function when the server starts
// initializeAdminCollection().catch(console.error);

// //Fetch employees
// app.get('/employees', async (req, res) => {
//   try {
//     const employeesSnapshot = await db.collection('employees').get();
//     const employees = employeesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.status(200).send(employees);
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     res.status(500).send('Error fetching employees');
//   }
// });

// // app.get('/test', (req, res) => {
// //   res.status(200).send('Test route working');
// // });

// // Add employee
// app.post('/employee', upload.single('image'), async (req, res) => {
//   try {
//     const employeeData = JSON.parse(req.body.employeeData);
//     let imageUrl = '';

//     if (req.file) {
//       const fileName = `${Date.now()}_${req.file.originalname}`;
//       const file = bucket.file(fileName);
//       await file.save(req.file.buffer, { contentType: req.file.mimetype });
//       imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//     }

//     employeeData.image = imageUrl;
//     const docRef = await db.collection('employees').add(employeeData);
//     res.status(201).send({ id: docRef.id, ...employeeData });
//   } catch (error) {
//     console.error('Error adding employee:', error);
//     res.status(500).send('Error adding employee');
//   }
// });

// // Update employee
// app.put('/employee/:id', upload.single('image'), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = JSON.parse(req.body.employeeData);
    
//     if (req.file) {
//       const fileName = `${Date.now()}_${req.file.originalname}`;
//       const file = bucket.file(fileName);
//       await file.save(req.file.buffer, { contentType: req.file.mimetype });
//       updatedData.image = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//     }

//     await db.collection('employees').doc(id).update(updatedData);
//     res.status(200).send({ id, ...updatedData });
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     res.status(500).send('Error updating employee');
//   }
// });

// // Delete employee
// app.delete('/employee/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await db.collection('employees').doc(id).get();
//     const data = doc.data();

//     if (data && data.image) {
//       const fileName = path.basename(data.image);
//       await bucket.file(fileName).delete();
//     }

//     await db.collection('employees').doc(id).delete();
//     res.status(200).send('Employee deleted successfully');
//   } catch (error) {
//     console.error('Error deleting employee:', error);
//     res.status(500).send('Error deleting employee');
//   }
// });



// // New admin-related endpoints

// // Fetch all admins
// app.get('/admins', async (req, res) => {
//   try {
//     const adminsSnapshot = await db.collection('admins').get();
//     const admins = adminsSnapshot.docs.map((doc) => {
//       const data = doc.data();
//       delete data.password; // Don't send password to client
//       return { id: doc.id, ...data };
//     });
//     res.status(200).send(admins);
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     res.status(500).send('Error fetching admins');
//   }
// });

// // Add new admin
// app.post('/admin', async (req, res) => {
//   try {
//     const { username, password, name, surname, age, idNumber, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const adminData = {
//       username,
//       password: hashedPassword,
//       name,
//       surname,
//       age,
//       idNumber,
//       role: role || 'admin', // Default to 'admin' if not specified
//       photo: '' // You can handle photo upload separately
//     };
//     const docRef = await db.collection('admins').add(adminData);
//     const responseData = { ...adminData, id: docRef.id };
//     delete responseData.password; // Don't send password back to client
//     res.status(201).send(responseData);
//   } catch (error) {
//     console.error('Error adding admin:', error);
//     res.status(500).send('Error adding admin');
//   }
// });

// // Remove admin rights
// app.put('/admin/:id/remove-rights', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const adminRef = db.collection('admins').doc(id);
//     const doc = await adminRef.get();
    
//     if (!doc.exists) {
//       res.status(404).send('Admin not found');
//       return;
//     }

//     if (doc.data().role === 'sysadmin') {
//       res.status(403).send('Cannot remove rights from system admin');
//       return;
//     }

//     await adminRef.update({ role: 'user' });
//     res.status(200).send('Admin rights removed successfully');
//   } catch (error) {
//     console.error('Error removing admin rights:', error);
//     res.status(500).send('Error removing admin rights');
//   }
// });

// // Get admin profile
// app.get('/admin/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await db.collection('admins').doc(id).get();
    
//     if (!doc.exists) {
//       res.status(404).send('Admin not found');
//     } else {
//       const data = doc.data();
//       delete data.password; 
//       res.status(200).send({ id: doc.id, ...data });
//     }
//   } catch (error) {
//     console.error('Error fetching admin profile:', error);
//     res.status(500).send('Error fetching admin profile');
//   }
// });

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });