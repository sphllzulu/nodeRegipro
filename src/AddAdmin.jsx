// import React, { useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import Navbar from './Navbar';
// import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import {auth,storage} from './firebase'


// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   max-width: 400px;
//   margin: 5% auto;
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 8px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   background-color: black;
//   color: white;
//   padding: 10px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// // const AddAdmin = () => {
// //   const [newAdmin, setNewAdmin] = useState({
// //     username: '',
// //     password: '',
// //     name: '',
// //     surname: '',
// //     age: '',
// //     idNumber: '',
// //     role: 'admin'
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewAdmin(prev => ({ ...prev, [name]: value }));
// //   };

  
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('http://localhost:5000/admin', newAdmin);
// //       alert('Admin added successfully');
// //       setNewAdmin({
// //         username: '',
// //         password: '',
// //         name: '',
// //         surname: '',
// //         age: '',
// //         idNumber: '',
// //         role: 'admin'
// //       });
// //     } catch (error) {
// //       console.error('Error adding admin:', error);
// //       alert('Failed to add admin');
// //     }
// //   };


// const AddAdmin = () => {
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [newAdmin, setNewAdmin] = useState({
//     username: '',
//     email: '',
//     password: '',
//     name: '',
//     surname: '',
//     age: '',
//     idNumber: '',
//     role: 'admin'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewAdmin(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setProfilePicture(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Create Firebase user
//       const userCredential = await createUserWithEmailAndPassword(auth, newAdmin.email, newAdmin.password);
//       const user = userCredential.user;
  
//       let profilePictureUrl = '';
//       if (profilePicture) {
//         // Upload profile picture to Firebase Storage
//         const storageRef = ref(storage, `admin_profiles/${user.uid}`);
//         await uploadBytes(storageRef, profilePicture);
//         profilePictureUrl = await getDownloadURL(storageRef);
//       }
  
//       // Update the user's profile
//       await updateProfile(user, {
//         displayName: newAdmin.username,
//         photoURL: profilePictureUrl
//       });
  
//       // Add admin to your backend
//       const adminData = {
//         ...newAdmin,
//         firebaseUid: user.uid,
//         profilePictureUrl
//       };
//       await axios.post('http://localhost:5000/admin', adminData);
  
//       alert('Admin added successfully');
//       setNewAdmin({
//         username: '',
//         email: '',
//         password: '',
//         name: '',
//         surname:'',
//         age: '',
//         idNumber: '',
//         role: 'admin'
//       });
//       setProfilePicture(null);
//     } catch (error) {
//       console.error('Error adding admin:', error);
//       alert('Failed to add admin: ' + error.message);
//     }
//   };

//   return (
//     <div>
//         <Navbar/>
//     <Form onSubmit={handleSubmit}>
//       <h2>Add New Admin</h2>
//       <Input
//         type="text"
//         name="username"
//         value={newAdmin.username}
//         onChange={handleChange}
//         placeholder="Username"
//         required
//       />
//       <Input
//           type="email"
//           name="email"
//           value={newAdmin.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//       <Input
//         type="password"
//         name="password"
//         value={newAdmin.password}
//         onChange={handleChange}
//         placeholder="Password"
//         required
//       />
//       <Input
//         type="text"
//         name="name"
//         value={newAdmin.name}
//         onChange={handleChange}
//         placeholder="Name"
//         required
//       />
//       <Input
//         type="text"
//         name="surname"
//         value={newAdmin.surname}
//         onChange={handleChange}
//         placeholder="Surname"
//         required
//       />
//       <Input
//         type="number"
//         name="age"
//         value={newAdmin.age}
//         onChange={handleChange}
//         placeholder="Age"
//         required
//       />
//       <Input
//         type="text"
//         name="idNumber"
//         value={newAdmin.idNumber}
//         onChange={handleChange}
//         placeholder="ID Number"
//         required
//       />
//       <Input
//   type="file"
//   accept="image/*"
//   onChange={handleFileChange}
// />
//       <Button type="submit">Add Admin</Button>
//     </Form>
//     </div>
//   );
// };

// export default AddAdmin;

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from './Navbar';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from './firebase';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 5% auto;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const AddAdmin = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    age: '',
    idNumber: '',
    role: 'admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, newAdmin.email, newAdmin.password);
      const user = userCredential.user;
  
      let profilePictureUrl = '';
      if (profilePicture) {
        // Upload profile picture to Firebase Storage
        const storageRef = ref(storage, `admin_profiles/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);
        profilePictureUrl = await getDownloadURL(storageRef);
      }
  
      // Update the user's profile
      await updateProfile(user, {
        displayName: newAdmin.username,
        photoURL: profilePictureUrl
      });
  
      // Add admin to your backend
      const adminData = {
        ...newAdmin,
        firebaseUid: user.uid,
        profilePictureUrl
      };
      const response = await axios.post('http://localhost:5000/admin', adminData);
      
      // Save admin data to localStorage
      const adminToSave = {
        id: response.data.id, // Assuming your backend returns the new admin's ID
        ...adminData
      };
      delete adminToSave.password; // Remove sensitive information
      localStorage.setItem('currentAdmin', JSON.stringify(adminToSave));
  
      alert('Admin added successfully');
      setNewAdmin({
        username: '',
        email: '',
        password: '',
        name: '',
        surname:'',
        age: '',
        idNumber: '',
        role: 'admin'
      });
      setProfilePicture(null);
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Failed to add admin: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <Form onSubmit={handleSubmit}>
        <h2>Add New Admin</h2>
        <Input
          type="text"
          name="username"
          value={newAdmin.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <Input
          type="email"
          name="email"
          value={newAdmin.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          value={newAdmin.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <Input
          type="text"
          name="name"
          value={newAdmin.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <Input
          type="text"
          name="surname"
          value={newAdmin.surname}
          onChange={handleChange}
          placeholder="Surname"
          required
        />
        <Input
          type="number"
          name="age"
          value={newAdmin.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <Input
          type="text"
          name="idNumber"
          value={newAdmin.idNumber}
          onChange={handleChange}
          placeholder="ID Number"
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button type="submit">Add Admin</Button>
      </Form>
    </div>
  );
};

export default AddAdmin;