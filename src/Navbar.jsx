import './Navbar.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { MdAppRegistration } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import React from 'react'
import AccountMenu from './AccountMenu';


const Navbar = () => {
  

  return (
    
      <nav>
        <div className='logo1'>
        <MdAppRegistration style={{fontSize:'30px', color:'black'}} />
        <Link to={'/home'}><h1>Regipro</h1></Link>
        
        </div>
       <ul className='list1'>
         <li>
           <Link to="/home">Home</Link>
         </li>
         
         <li>
           <Link to="/active">Active</Link>
         </li>
         <li>
           <Link to="/removed">Removed</Link>
         </li>
         
       </ul>
       <div>
       <AccountMenu/>
       </div>
       
     </nav>
    
  )
}

export default Navbar


