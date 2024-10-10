// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import Navbar from './Navbar';

// const Container = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
// `;

// const AdminList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const AdminItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px;
//   border-bottom: 1px solid #ddd;
// `;

// const Button = styled.button`
//   background-color: #f44336;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #d32f2f;
//   }
// `;

// const RemoveAdminRights = () => {
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/admins');
//       setAdmins(response.data);
//     } catch (error) {
//       console.error('Error fetching admins:', error);
//     }
//   };

//   const handleRemoveRights = async (adminId) => {
//     try {
//       await axios.put(`http://localhost:5000/admin/${adminId}/remove-rights`);
//       alert('Admin rights removed successfully');
//       fetchAdmins(); 
//     } catch (error) {
//       console.error('Error removing admin rights:', error);
//       alert('Failed to remove admin rights');
//     }
//   };
  

  


//   return (
//     <div>
//         <Navbar/>
//     <Container>
//       <h2>Remove Admin Rights</h2>
//       <AdminList>
//         {admins.map((admin) => (
//           <AdminItem key={admin.id}>
//             <span>{admin.name} {admin.surname}</span>
//             <Button onClick={() => handleRemoveRights(admin.id)}>Remove Rights</Button>
//           </AdminItem>
//         ))}
//       </AdminList>
//     </Container>
//     </div>
//   );
// };

// export default RemoveAdminRights;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import Navbar from './Navbar';

// const Container = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
// `;

// const AdminList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const AdminItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px;
//   border-bottom: 1px solid #ddd;
// `;

// const Button = styled.button`
//   background-color: ${props => props.disabled ? '#ccc' : '#f44336'};
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 4px;
//   cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

//   &:hover {
//     background-color: ${props => props.disabled ? '#ccc' : '#d32f2f'};
//   }
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: white;
//   padding: 20px;
//   border-radius: 5px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// const RemoveAdminRights = () => {
//   const [admins, setAdmins] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/admins');
//       setAdmins(response.data);
//     } catch (error) {
//       console.error('Error fetching admins:', error);
//     }
//   };

//   const handleRemoveRights = async (adminId) => {
//     try {
//       await axios.put(`http://localhost:5000/admin/${adminId}/remove-rights`);
//       setModalMessage('Admin rights removed successfully');
//       setShowModal(true);
//       fetchAdmins();
//     } catch (error) {
//       console.error('Error removing admin rights:', error);
//       setModalMessage('Failed to remove admin rights');
//       setShowModal(true);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Container>
//         <h2>Remove Admin Rights</h2>
//         <AdminList>
//           {admins.map((admin) => (
//             <AdminItem key={admin.id}>
//               <span>{admin.name} {admin.surname}</span>
//               <Button 
//                 onClick={() => handleRemoveRights(admin.id)}
//                 disabled={admin.role === 'user'}
//               >
//                 {admin.role === 'user' ? 'Rights Removed' : 'Remove Rights'}
//               </Button>
//             </AdminItem>
//           ))}
//         </AdminList>
//       </Container>
//       {showModal && (
//         <Modal>
//           <p>{modalMessage}</p>
//           <Button onClick={() => setShowModal(false)}>Close</Button>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default RemoveAdminRights;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const AdminList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AdminItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: ${props => props.disabled ? '#ccc' : '#f44336'};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#d32f2f'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const RemoveAdminRights = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleRemoveRights = async (adminId) => {
    try {
      await axios.put(`http://localhost:5000/admin/${adminId}/remove-rights`);
      setModalMessage('Admin rights removed successfully');
      setShowModal(true);
      fetchAdmins();
    } catch (error) {
      console.error('Error removing admin rights:', error);
      setModalMessage('Failed to remove admin rights');
      setShowModal(true);
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h2>Remove Admin Rights</h2>
        <AdminList>
          {admins.map((admin) => (
            <AdminItem key={admin.id}>
              <span>{admin.name} {admin.surname}</span>
              <Button 
                onClick={() => handleRemoveRights(admin.id)}
                disabled={admin.role === 'user'}
              >
                {admin.role === 'user' ? 'Rights Removed' : 'Remove Rights'}
              </Button>
            </AdminItem>
          ))}
        </AdminList>
      </Container>
      {showModal && (
        <Modal>
          <p>{modalMessage}</p>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal>
      )}
    </div>
  );
};

export default RemoveAdminRights;