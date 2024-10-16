// import React, { useState, useEffect } from 'react';

// import { Link } from 'react-router-dom';
// import './BottomNavbarSmall.css'

// import { FaHome } from "react-icons/fa";
// import { MdFolderDelete } from "react-icons/md";
// import { GrStatusGood } from "react-icons/gr";



// function BottomNavbarSmall() {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     isMobile && (
//       <nav className="bottom-navbar">
        
//         <ul className="list">
//           <li>
//             <Link to="/home"><FaHome style={{fontSize:'50px'}}/></Link>
//           </li>
          
//           <li>
//             <Link to="/active"><GrStatusGood  style={{fontSize:'50px'}}/></Link>
//           </li>
//           <li>
//             <Link to="/removed"><MdFolderDelete  style={{fontSize:'50px'}}/></Link>
//           </li>
//         </ul>
        
//       </nav>
//     )
//   );
// }

// export default BottomNavbarSmall;



// import React from 'react';
// import { Home, Folder, CheckCircle } from 'lucide-react';

// const BottomNavbar = () => {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-2">
//       <div className="container mx-auto">
//         <ul className="flex justify-around items-center">
//           <li>
//             <a href="#" className="flex flex-col items-center p-2 hover:bg-gray-700 rounded-lg transition-colors">
//               <Home size={24} />
//               <span className="text-xs mt-1">Home</span>
//             </a>
//           </li>
//           <li>
//             <a href="#" className="flex flex-col items-center p-2 hover:bg-gray-700 rounded-lg transition-colors">
//               <Folder size={24} />
//               <span className="text-xs mt-1">Folders</span>
//             </a>
//           </li>
//           <li>
//             <a href="#" className="flex flex-col items-center p-2 hover:bg-gray-700 rounded-lg transition-colors">
//               <CheckCircle size={24} />
//               <span className="text-xs mt-1">Status</span>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default BottomNavbar;

// import React, { useState } from 'react';
// import { Home, Folder, CheckCircle } from 'lucide-react';
// import './BottomNavbarSmall.css';

// const BottomNavbar = () => {
//   const [activeTab, setActiveTab] = useState('home');

//   const navItems = [
//     { id: 'home', icon: Home, label: 'Home' },
//     { id: 'folders', icon: Folder, label: 'Folders' },
//     { id: 'status', icon: CheckCircle, label: 'Status' },
//   ];

//   return (
//     <nav className="bottom-navbar">
//       <div className="navbar-container">
//         <ul className="navbar-list">
//           {navItems.map((item) => (
//             <li key={item.id} className="navbar-item">
//               <button
//                 onClick={() => setActiveTab(item.id)}
//                 className={`navbar-button ${activeTab === item.id ? 'active' : ''}`}
//               >
//                 <item.icon size={24} className="navbar-icon" />
//                 <span className="navbar-label">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default BottomNavbar;



// import React, { useState, useEffect } from 'react';
// import { Home, Folder, CheckCircle } from 'lucide-react';
// import './BottomNavbarSmall.css';
// import {Link} from 'react-router-dom'

// const BottomNavbar = () => {
//   const [activeTab, setActiveTab] = useState('home');
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const navItems = [
//     { id: 'home', icon: Home, label: 'Home' },
//     { id: 'folders', icon: Folder, label: 'Folders' },
//     { id: 'status', icon: CheckCircle, label: 'Status' },
//   ];

//   if (!isSmallScreen) {
//     return null;
//   }

//   return (
//     <nav className="bottom-navbar">
//       <div className="navbar-container">
//         <ul className="navbar-list">
//           {navItems.map((item) => (
//             <li key={item.id} className="navbar-item">
//               <button
//                 onClick={() => setActiveTab(item.id)}
//                 className={`navbar-button ${activeTab === item.id ? 'active' : ''}`}
//               >
//                 <item.icon size={24} className="navbar-icon" />
//                 <span className="navbar-label">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default BottomNavbar;



import React, { useState, useEffect } from 'react';
import { Home, Folder, CheckCircle } from 'lucide-react';
import './BottomNavbarSmall.css';
import { Link } from 'react-router-dom';

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'folders', icon: Folder, label: 'Folders', path: '/active' },
    { id: 'status', icon: CheckCircle, label: 'Status', path: '/removed' },
  ];

  if (!isSmallScreen) {
    return null;
  }

  return (
    <nav className="bottom-navbar">
      <div className="navbar-container">
        <ul className="navbar-list">
          {navItems.map((item) => (
            <li key={item.id} className="navbar-item">
              <Link to={item.path} className="navbar-link">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`navbar-button ${activeTab === item.id ? 'active' : ''}`}
                >
                  <item.icon size={24} className="navbar-icon" />
                  <span className="navbar-label">{item.label}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavbar;
