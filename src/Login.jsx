// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from './firebase'; // Import your Firebase setup
// import { MdAppRegistration } from "react-icons/md";
// import './Login.css'; 

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setError('');
//       navigate('/home'); 
//     } catch (error) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1><MdAppRegistration style={{fontSize:'30px'}} />RegiPro</h1>
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Import your Firebase setup
import { MdAppRegistration } from "react-icons/md";
import styled from 'styled-components';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
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
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
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
        navigate('/adminProfile'); // Navigate to profile on successful login
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
