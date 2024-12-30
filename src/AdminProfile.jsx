

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
