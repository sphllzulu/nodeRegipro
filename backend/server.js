
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount =JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:process.env.DATABASE_URL,
  storageBucket:process.env.STORAGE_BUCKET 
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Set up multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Fetch employees
app.get('/employees', async (req, res) => {
  try {
    const employeesSnapshot = await db.collection('employees').get();
    const employees = employeesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send('Error fetching employees');
  }
});

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

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});