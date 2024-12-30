import './Navbar.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { MdAppRegistration } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { MdFolderDelete } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    // Example: Clear user session, redirect to login page, etc.
  };

  return (
    <nav>
      <div className='logo1'>
        <MdAppRegistration style={{ fontSize: '30px', color: 'black' }} />
        <h1>Regipro</h1>
      </div>
   
      <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
        <IoLogOutSharp style={{ fontSize: '40px' }} />
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="hamburger-menu">
          <ul>
            <li>
              <Link to="/home" onClick={toggleMenu}>
                <FaHome style={{ fontSize: '24px' }} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/active" onClick={toggleMenu}>
                <GrStatusGood style={{ fontSize: '24px' }} />
                <span>Active</span>
              </Link>
            </li>
            <li>
              <Link to="/removed" onClick={toggleMenu}>
                <MdFolderDelete style={{ fontSize: '24px' }} />
                <span>Removed</span>
              </Link>
            </li>
            <li>
            <Link to="/" onClick={toggleMenu}>
                <IoLogOutSharp style={{ fontSize: '24px' }} />
                <span>Logout</span>
                </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

