
import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; // Ensure this path is correct
import './Tbl.css';
import Navbar from './Navbar';
import BottomNavbarSmall from './BottomNavbarSmall';
import Loader from './Loader';
import './Removed.css';
import FirebaseImage from './Image';

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

  useEffect(() => {
    fetchActiveEmployees();
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
    <div>
      <Navbar />
      <h2>Active Employees</h2>
      {isEditing && (
        <div className='edit-form'>
          <h3>Edit Employee</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td><FirebaseImage imagePath={employee.image} /></td>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>{employee.status}</td>
              <td>
                <button className='edit' onClick={() => handleEdit(employee)}>
                  <CiEdit style={{ fontSize: "26px" }} />
                </button>
                <button className='delete' onClick={() => handleDelete(employee.id)}>
                  <MdDelete style={{ fontSize: "26px" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <BottomNavbarSmall /> */}
    </div>
  );
}

export default ActiveEmployees;