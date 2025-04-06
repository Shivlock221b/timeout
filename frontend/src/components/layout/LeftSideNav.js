import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTable, FaCalendarAlt, FaCommentDots, FaUsers, FaMicrophoneAlt } from 'react-icons/fa'; // Example icons

// Single Responsibility Principle - This component only handles left side navigation
const LeftSideNav = () => {
  const { isAuthenticated } = useAuth();

  // Don't show left nav if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Navigation items configuration
  const navItems = [
    { name: 'Only For You', path: '/onlyforyou', icon: <FaTable /> },
    { name: 'Explore', path: '/explore', icon: <FaUsers /> },
    { name: 'Message', path: '/message', icon: <FaCommentDots /> },
    { name: 'Host', path: '/host', icon: <FaMicrophoneAlt /> }
  ];

  return (
    // Hide on small screens (hidden), show as flex column on medium+ screens (md:flex)
    <nav className="hidden md:flex w-64 h-screen bg-gray-100 p-4 fixed top-20 left-0 flex-col"> 
      <ul className="space-y-2"> {/* Use space-y for vertical spacing */}
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-200 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : ''}`
              }
            >
              <span className="mr-3">{item.icon}</span> {/* Icon on the left */}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeftSideNav;
