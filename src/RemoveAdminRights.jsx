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
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const RemoveAdminRights = () => {
  const [admins, setAdmins] = useState([]);

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
      alert('Admin rights removed successfully');
      fetchAdmins(); 
    } catch (error) {
      console.error('Error removing admin rights:', error);
      alert('Failed to remove admin rights');
    }
  };
  

  


  return (
    <div>
        <Navbar/>
    <Container>
      <h2>Remove Admin Rights</h2>
      <AdminList>
        {admins.map((admin) => (
          <AdminItem key={admin.id}>
            <span>{admin.name} {admin.surname}</span>
            <Button onClick={() => handleRemoveRights(admin.id)}>Remove Rights</Button>
          </AdminItem>
        ))}
      </AdminList>
    </Container>
    </div>
  );
};

export default RemoveAdminRights;