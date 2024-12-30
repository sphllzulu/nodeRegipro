const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:process.env.DATABASE_URL,
  storageBucket:process.env.STORAGE_BUCKET,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Set up multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

//Fetch employees
app.get("/employees", async (req, res) => {
  try {
    const employeesSnapshot = await db.collection("employees").get();
    const employees = employeesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("Error fetching employees");
  }
});

// app.get('/test', (req, res) => {
//   res.status(200).send('Test route working');
// });

// Add employee
app.post("/employee", upload.single("image"), async (req, res) => {
  try {
    const employeeData = JSON.parse(req.body.employeeData);
    let imageUrl = "";

    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      await file.save(req.file.buffer, { contentType: req.file.mimetype });
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    employeeData.image = imageUrl;
    const docRef = await db.collection("employees").add(employeeData);
    res.status(201).send({ id: docRef.id, ...employeeData });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).send("Error adding employee");
  }
});

// Update employee
app.put("/employee/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = JSON.parse(req.body.employeeData);

    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      await file.save(req.file.buffer, { contentType: req.file.mimetype });
      updatedData.image = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    await db.collection("employees").doc(id).update(updatedData);
    res.status(200).send({ id, ...updatedData });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Error updating employee");
  }
});

// Delete employee
app.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("employees").doc(id).get();
    const data = doc.data();

    if (data && data.image) {
      const fileName = path.basename(data.image);
      await bucket.file(fileName).delete();
    }

    await db.collection("employees").doc(id).delete();
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Error deleting employee");
  }
});

//admin info
// Fetch admins
app.get("/admins", async (req, res) => {
  try {
    const adminsSnapshot = await db.collection("admins").get();
    const admins = adminsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).send("Error fetching admins");
  }
});

// Add admin
app.post("/admin", async (req, res) => {
  try {
    const {
      username,
      email,
      name,
      surname,
      age,
      idNumber,
      firebaseUid,
      profilePictureUrl,
    } = req.body;

    const adminData = {
      username,
      email,
      name,
      surname,
      age,
      idNumber,
      role: "admin",
      firebaseUid,
      profilePictureUrl,
    };

    const docRef = await db.collection("admins").add(adminData);
    res.status(201).send({ id: docRef.id, ...adminData });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).send("Error adding admin");
  }
});


app.put("/admin/:id/remove-rights", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch admin document from Firestore
    const adminDoc = await db.collection("admins").doc(id).get();
    if (!adminDoc.exists) {
      return res.status(404).send("Admin not found");
    }

    const adminData = adminDoc.data();
    
    // Disable the user in Firebase Authentication
    await admin.auth().updateUser(adminData.firebaseUid, { disabled: true });

    // Update the role in Firestore
    await db.collection("admins").doc(id).update({
      role: "user",
      isDisabled: true, // Optional: If you have an isDisabled flag
    });

    res.status(200).send("Admin rights removed and user disabled successfully");
  } catch (error) {
    console.error("Error removing admin rights:", error);
    res.status(500).send("Error removing admin rights");
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
