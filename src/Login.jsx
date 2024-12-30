

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Import your Firebase setup
import { MdAppRegistration } from "react-icons/md";
import styled from 'styled-components';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto; // Added top and bottom margin for vertical centering
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    margin-bottom: 20px;
  }

  .error-message {
    color: red;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #008080; // Changed to teal
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #006666; // Darker teal for hover state
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      
      const currentUser = auth.currentUser;
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'admins', currentUser.uid));
      
      if (userDoc.exists()) {
        // Store user email in local storage
        localStorage.setItem('userEmail', email);
        
        // Set isSysAdmin flag in local storage
        const isSysAdmin = email === 'sysadmin@example.com';
        localStorage.setItem('isSysAdmin', isSysAdmin);
        
        navigate('/adminProfile');
      } else {
        setError('User not found in the database');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <LoginContainer>
      <h1><MdAppRegistration style={{fontSize:'30px'}} />RegiPro</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </LoginContainer>
  );
}

export default Login;
