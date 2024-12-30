import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import styled from 'styled-components';
import './Tbl.css';
import Image from './Image';
import FirebaseImage from './Image';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  // flex-grow: 1;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin:5px;
  // margin-left: 10px;

  &:hover {
    background-color: white;
    color:black;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  border-radius: 4px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #f8f8f8;
  color: #333;
  font-weight: bold;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
`;

const EmployeeImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Select= styled.input`
 margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`
// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: 'Arial', sans-serif;
// `;

// const Controls = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: stretch;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 16px;
//   flex-grow: 1;
//   margin: 10px 0;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Button = styled.button`
//   background-color: #4CAF50;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #45a049;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     margin-top: 10px;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background-color: white;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.2);
//   border-radius: 4px;
//   overflow: hidden;
// `;

// const Th = styled.th`
//   background-color: #f8f8f8;
//   color: #333;
//   font-weight: bold;
//   padding: 12px;
//   text-align: left;
//   border-bottom: 2px solid #ddd;
// `;

// const Td = styled.td`
//   padding: 12px;
//   border-bottom: 1px solid #ddd;
//   vertical-align: middle;
// `;

// const EmployeeImg = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   object-fit: cover;
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   margin-right: 10px;
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const PopupOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const PopupContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 90%;
//   max-width: 500px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 8px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

function Tbl() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees: ", error);
      setLoading(false);
    }
  }

  async function handleAdd(newEmployee, imageFile) {
    try {
      const formData = new FormData();
      formData.append('employeeData', JSON.stringify(newEmployee));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.post('http://localhost:5000/employee', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchEmployees();
      setShowAddPopup(false);
    } catch (error) {
      console.error("Error adding employee: ", error);
    }
  }

  async function handleUpdate(id, updatedEmployee, imageFile) {
    try {
      const formData = new FormData();
      formData.append('employeeData', JSON.stringify(updatedEmployee));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.put(`http://localhost:5000/employee/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchEmployees();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating employee: ", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/employee/${id}`);
      await fetchEmployees();
      setShowDeletePopup(null);
    } catch (error) {
      console.error("Error deleting employee: ", error);
    }
  }

  const filteredEmployees = employees.filter(employee => 
    employee.id.toLowerCase().includes(searchId.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Controls>
        <EmployeeCount count={employees.length} />
        <SearchInput
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button onClick={() => setShowAddPopup(true)}>
          Add Employee
        </Button>
      </Controls>
      <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Image</Th>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>ID Number</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Position</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) =>
            editingId === employee.id ? (
              <EditEmployeeRow
                key={employee.id}
                employee={employee}
                onUpdate={handleUpdate}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onEdit={() => setEditingId(employee.id)}
                onDelete={() => setShowDeletePopup(employee.id)}
              />
            )
          )}
        </tbody>
      </Table>
      </TableContainer>

      {showAddPopup && (
        <Popup title="Add Employee" onClose={() => setShowAddPopup(false)}>
          <AddEmployeeForm onAdd={handleAdd} onCancel={() => setShowAddPopup(false)} />
        </Popup>
      )}

      {showDeletePopup && (
        <Popup title="Delete Employee" onClose={() => setShowDeletePopup(null)}>
          <DeleteConfirmation
            onConfirm={() => handleDelete(showDeletePopup)}
            onCancel={() => setShowDeletePopup(null)}
          />
        </Popup>
      )}
    
    </Container>
  );
}

function EmployeeRow({ employee, onEdit, onDelete }) {
  return (
    <tr>
      <Td><FirebaseImage imagePath={employee.image} /></Td>
      <Td>{employee.id}</Td>
      <Td>{employee.name}</Td>
      <Td>{employee.age}</Td>
      <Td>{employee.idNumber}</Td>
      <Td>{employee.email}</Td>
      <Td>{employee.phone}</Td>
      <Td>{employee.position}</Td>
      <Td>{employee.status}</Td>
      <Td>
        <ActionButton onClick={onEdit}>
          <CiEdit style={{ fontSize: '26px', color: 'blue' }} />
        </ActionButton>
        <ActionButton onClick={onDelete}>
          <MdDelete style={{ fontSize: '26px', color: 'red' }} />
        </ActionButton>
      </Td>
    </tr>
  );
}

function EditEmployeeRow({ employee, onUpdate, onCancel }) {
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(employee.id, editedEmployee, imageFile);
  };

  return (
    <tr>
      <Td>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {editedEmployee.image && <EmployeeImg src={editedEmployee.image} alt={editedEmployee.name} />}
      </Td>
      <Td>{employee.id}</Td>
      <Td><Input type="text" name="name" value={editedEmployee.name} onChange={handleChange} /></Td>
      <Td><Input type="number" name="age" value={editedEmployee.age} onChange={handleChange} /></Td>
      <Td><Input type="text" name="idNumber" value={editedEmployee.idNumber} onChange={handleChange} /></Td>
      <Td><Input type="email" name="email" value={editedEmployee.email} onChange={handleChange} /></Td>
      <Td><Input type="tel" name="phone" value={editedEmployee.phone} onChange={handleChange} /></Td>
      <Td><Input type="text" name="position" value={editedEmployee.position} onChange={handleChange} /></Td>
      <Td><Input type="text" name="status" value={editedEmployee.status} onChange={handleChange} /></Td>
      <Td>
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Td>
    </tr>
  );
}

function AddEmployeeForm({ onAdd, onCancel }) {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    age: '',
    idNumber: '',
    email: '',
    phone: '',
    position: '',
    status: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newEmployee, imageFile);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      <Input type="text" name="name" placeholder="Name" value={newEmployee.name} onChange={handleChange} required />
      <Input type="number" name="age" placeholder="Age" value={newEmployee.age} onChange={handleChange} required />
      <Input type="text" name="idNumber" placeholder="ID Number" value={newEmployee.idNumber} onChange={handleChange} required />
      <Input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} required />
      <Input type="tel" name="phone" placeholder="Phone" value={newEmployee.phone} onChange={handleChange} required />
      <select className='select' name="status" value={newEmployee.status} onChange={handleChange} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
      </select>
      <Input type="text" name="position" placeholder="Position" value={newEmployee.position} onChange={handleChange} required />
      {/* <Input type="text" name="status" placeholder="Status" value={newEmployee.status} onChange={handleChange} required /> */}
      <Button type="submit">Add Employee</Button>
      <Button type="button" onClick={onCancel}>Cancel</Button>
    </Form>
  );
}

function Popup({ title, children, onClose }) {
  return (
    <PopupOverlay>
      <PopupContent>
        <h3>{title}</h3>
        <Button onClick={onClose}>×</Button>
        {children}
      </PopupContent>
    </PopupOverlay>
  );
}

function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div>
      <p>Are you sure you want to delete this employee?</p>
      <Button onClick={onConfirm}>Confirm</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
}

function EmployeeCount({ count }) {
  return <div>Total Employees: {count}</div>;
}

export default Tbl;