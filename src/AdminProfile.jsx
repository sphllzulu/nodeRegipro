// import React, { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import axios from 'axios';
// import styled from 'styled-components';
// import Navbar from './Navbar';

// const ProfileContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const ProfileImage = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   object-fit: cover;
// `;

// const ProfileInfo = styled.div`
//   margin-top: 20px;
// `;

// const AdminProfile = () => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           // Fetch additional admin data from your backend
//           const response = await axios.get(`http://localhost:5000/admin/${user.uid}`);
//           setAdmin({ ...user, ...response.data });
//         } catch (err) {
//           console.error('Error fetching admin data:', err);
//           setError('Failed to fetch admin data');
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//         setError('No admin is currently logged in');
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!admin) return <div>No admin profile found</div>;

//   return (
//     <div>
//       <Navbar/>
//     <ProfileContainer>
      
//       <h2>Admin Profile</h2>
//       <ProfileImage src={admin.photoURL || 'default-profile-picture.jpg'} alt="Profile" />
//       <ProfileInfo>
//         <p><strong>Username:</strong> {admin.displayName}</p>
//         <p><strong>Email:</strong> {admin.email}</p>
//         <p><strong>Name:</strong> {admin.name}</p>
//         <p><strong>Surname:</strong> {admin.surname}</p>
//         <p><strong>Age:</strong> {admin.age}</p>
//         <p><strong>ID Number:</strong> {admin.idNumber}</p>
//         <p><strong>Role:</strong> {admin.role}</p>
//       </ProfileInfo>
//     </ProfileContainer>
//     </div>
//   );
// };

// export default AdminProfile;


