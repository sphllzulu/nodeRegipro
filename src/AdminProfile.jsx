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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import Navbar from './Navbar';

// const ProfileContainer = styled.div`
//   max-width: 600px;
//   margin: 5% auto;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const ProfileHeader = styled.h2`
//   text-align: center;
//   color: #333;
// `;

// const ProfileInfo = styled.div`
//   margin-top: 20px;
// `;

// const ProfileItem = styled.p`
//   margin-bottom: 10px;
//   font-size: 16px;
//   color: #555;
// `;

// const ProfileLabel = styled.span`
//   font-weight: bold;
//   color: #333;
// `;

// const ProfilePicture = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin: 0 auto 20px;
//   display: block;
//   border: 3px solid #fff;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const AdminProfile = () => {
//   const [adminData, setAdminData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const adminId = localStorage.getItem('adminId');
//         if (!adminId) {
//           throw new Error('No admin ID found. Please log in.');
//         }

//         const response = await axios.get(`http://localhost:5000/admin/${adminId}`);
//         setAdminData(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching admin data:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!adminData) return <div>No admin data found.</div>;

//   return (
//     <div>
//       <Navbar />
//       <ProfileContainer>
//         <ProfileHeader>Admin Profile</ProfileHeader>
//         {adminData.profilePictureUrl && (
//           <ProfilePicture src={adminData.profilePictureUrl} alt={`${adminData.name} ${adminData.surname}`} />
//         )}
//         <ProfileInfo>
//           <ProfileItem><ProfileLabel>Username:</ProfileLabel> {adminData.username}</ProfileItem>
//           <ProfileItem><ProfileLabel>Name:</ProfileLabel> {adminData.name}</ProfileItem>
//           <ProfileItem><ProfileLabel>Surname:</ProfileLabel> {adminData.surname}</ProfileItem>
//           <ProfileItem><ProfileLabel>Email:</ProfileLabel> {adminData.email}</ProfileItem>
//           <ProfileItem><ProfileLabel>Age:</ProfileLabel> {adminData.age}</ProfileItem>
//           <ProfileItem><ProfileLabel>ID Number:</ProfileLabel> {adminData.idNumber}</ProfileItem>
//           <ProfileItem><ProfileLabel>Role:</ProfileLabel> {adminData.role}</ProfileItem>
//         </ProfileInfo>
//       </ProfileContainer>
//     </div>
//   );
// };

// export default AdminProfile;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// const ProfileContainer = styled.div`
//   max-width: 600px;
//   margin: 5% auto;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const ProfileHeader = styled.h2`
//   text-align: center;
//   color: #333;
// `;

// const ProfileInfo = styled.div`
//   margin-top: 20px;
// `;

// const ProfileItem = styled.p`
//   margin-bottom: 10px;
//   font-size: 16px;
//   color: #555;
// `;

// const ProfileLabel = styled.span`
//   font-weight: bold;
//   color: #333;
// `;

// const ProfilePicture = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin: 0 auto 20px;
//   display: block;
//   border: 3px solid #fff;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   text-align: center;
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   background-color: #4CAF50;
//   color: white;
//   padding: 10px 15px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;
//   display: block;
//   margin: 20px auto 0;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const AdminProfile = () => {
//   const [adminData, setAdminData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
//         if (!currentAdmin || !currentAdmin.id) {
//           throw new Error('No admin data found. Please log in.');
//         }

//         // If we have the admin data in localStorage, use it directly
//         setAdminData(currentAdmin);
//         setLoading(false);

//         // Optionally, you can still fetch the latest data from the server
//         // const response = await axios.get(`http://localhost:5000/admin/${currentAdmin.id}`);
//         // setAdminData(response.data);
//         // setLoading(false);
//       } catch (err) {
//         console.error('Error fetching admin data:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   const handleLogin = () => {
//     // Redirect to login page
//     navigate('/');
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) {
//     return (
//       <ProfileContainer>
//         <ErrorMessage>{error}</ErrorMessage>
//         <Button onClick={handleLogin}>Go to Login</Button>
//       </ProfileContainer>
//     );
//   }
//   if (!adminData) return <div>No admin data found.</div>;

//   return (
//     <div>
//       <Navbar />
//       <ProfileContainer>
//         <ProfileHeader>Admin Profile</ProfileHeader>
//         {adminData.profilePictureUrl && (
//           <ProfilePicture src={adminData.profilePictureUrl} alt={`${adminData.name} ${adminData.surname}`} />
//         )}
//         <ProfileInfo>
//           <ProfileItem><ProfileLabel>Username:</ProfileLabel> {adminData.username}</ProfileItem>
//           <ProfileItem><ProfileLabel>Name:</ProfileLabel> {adminData.name}</ProfileItem>
//           <ProfileItem><ProfileLabel>Surname:</ProfileLabel> {adminData.surname}</ProfileItem>
//           <ProfileItem><ProfileLabel>Email:</ProfileLabel> {adminData.email}</ProfileItem>
//           <ProfileItem><ProfileLabel>Age:</ProfileLabel> {adminData.age}</ProfileItem>
//           <ProfileItem><ProfileLabel>ID Number:</ProfileLabel> {adminData.idNumber}</ProfileItem>
//           <ProfileItem><ProfileLabel>Role:</ProfileLabel> {adminData.role}</ProfileItem>
//         </ProfileInfo>
//       </ProfileContainer>
//     </div>
//   );
// };

// export default AdminProfile;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from './firebase'; // Import your Firebase setup
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import BottomNavbar from './BottomNavbarSmall';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  h2 {
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
    color: #555;
  }
`;

const Button = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'admins', currentUser.uid));
          if (userDoc.exists()) {
            setUser({ id: userDoc.id, ...userDoc.data() });
          } else {
            setError('User not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar/>
    <Container>
      {user && (
        <>
          <ProfileImage src={user.profilePictureUrl} alt="Profile" />
          <ProfileDetails>
            <h2>{user.name} {user.surname}</h2>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Age: {user.age}</p>
            <p>ID Number: {user.idNumber}</p>
            <Button onClick={() => { auth.signOut(); }}>Logout</Button>
          </ProfileDetails>
        </>
      )}
    </Container>
    <BottomNavbar/>
    </div>
  );
};

export default Profile;
