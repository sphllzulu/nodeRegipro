


import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; 
import './Tbl.css';
import Navbar from './Navbar';
import BottomNavbarSmall from './BottomNavbarSmall';
import Loader from './Loader';
import './Removed.css';
import FirebaseImage from './FirebaseImage';

const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const TableContainer = styled.div`
  overflow-x: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    thead {
      display: none;
    }
    
    tbody, tr, td {
      display: block;
      width: 100%;
    }
    
    tr {
      margin-bottom: 15px;
      border: 1px solid #ddd;
    }
    
    td {
      text-align: right;
      padding-left: 50%;
      position: relative;
      border-bottom: 1px solid #ddd;

      &:before {
        content: attr(data-label);
        position: absolute;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        text-align: left;
        font-weight: bold;
      }
    }
  }
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const EditForm = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;


function ActiveEmployees() {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchActiveEmployees();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  

  async function fetchActiveEmployees() {
    try {
      setLoading(true);
      const employeesRef = collection(db, 'employees');
      const q = query(employeesRef, where("status", "==", "Active"));
      const querySnapshot = await getDocs(q);
      const employeeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeeList);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'employees', id));
      await fetchActiveEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(employee) {
    setCurrentEmployee(employee);
    setFormData(employee);
    setIsEditing(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSave() {
    try {
      setLoading(true);
      const employeeRef = doc(db, 'employees', formData.id);
      await updateDoc(employeeRef, formData);
      await fetchActiveEmployees();
      setIsEditing(false);
      setCurrentEmployee(null);
      setFormData({
        id: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        status: ''
      });
    } catch (error) {
      console.error('Error updating employee:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <Navbar />
      <Title>Active Employees</Title>
      {isEditing && (
        <EditForm>
          <h3>Edit Employee</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <FormInput type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <FormInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <FormInput type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <FormInput type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
            <FormSelect name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </FormSelect>
            <FormButton type="submit">Save</FormButton>
          </form>
        </EditForm>
      )}
      <TableContainer>
        <StyledTable>
          <TableHead>
            <tr>
              <TableHeader>Image</TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Position</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell data-label="Image"><FirebaseImage imagePath={employee.image} /></TableCell>
                <TableCell data-label="ID">{employee.id}</TableCell>
                <TableCell data-label="Name">{employee.name}</TableCell>
                <TableCell data-label="Email">{employee.email}</TableCell>
                <TableCell data-label="Phone">{employee.phone}</TableCell>
                <TableCell data-label="Position">{employee.position}</TableCell>
                <TableCell data-label="Status">{employee.status}</TableCell>
                <TableCell data-label="Actions">
                  <Button onClick={() => handleEdit(employee)}>
                    <CiEdit style={{ fontSize: "26px" }} />
                  </Button>
                  <Button onClick={() => handleDelete(employee.id)}>
                    <MdDelete style={{ fontSize: "26px" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      {windowWidth <= 768 && <BottomNavbarSmall />}
    </PageContainer>
  );
}

export default ActiveEmployees;