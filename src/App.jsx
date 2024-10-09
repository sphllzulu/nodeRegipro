import { Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './Home';
import Active from './Active';
import Removed from './Removed';
import Login from './Login';
import AddAdmin from './AddAdmin';
import RemoveAdminRights from './RemoveAdminRights';
// import AdminProfile from './AdminProfile';





function App() {


  return (
    <div className="App">
      <div className="container">
      <Routes>
         <Route path='/home' element={<Home/>} />
         
         <Route path='/active' element={<Active/>} />
         <Route path='/removed' element={<Removed/>} />
         <Route path='/addAdmin' element={<AddAdmin/>} />
         <Route path='/removeAdmin' element={<RemoveAdminRights/>} />
         {/* <Route path='/adminProfile' element={<AdminProfile/>} /> */}

         <Route path='/' element={<Login/>} />
         
         
       </Routes>
      </div>
      
       
    </div>
  )
}

export default App
