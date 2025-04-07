import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTable, FaCalendarAlt, FaCommentDots, FaUsers, FaUser } from 'react-icons/fa';

// Combined navigation component that serves as both bottom nav on mobile and side nav on desktop
// Following Single Responsibility Principle - This component handles all navigation in a unified way
const ResponsiveNavBar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Don't show nav if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Navigation items configuration - unified for both mobile and desktop
  const navItems = [
    { name: 'TymOut', path: '/onlyforyou', icon: <FaTable /> },
    { name: 'Explore', path: '/explore', icon: <FaUsers /> },
    { name: 'Message', path: '/message', icon: <FaCommentDots /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> }
  ];

  return (
    <>
      {/* Desktop Left Side Navigation - hidden on mobile, visible on md+ screens */}
      <nav className="hidden md:flex w-64 h-screen bg-gray-100 p-4 fixed top-20 left-0 flex-col z-40"> 
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-indigo-600 font-semibold' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Bottom Navigation - visible on mobile, hidden on md+ screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 md:hidden z-40">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `flex flex-col items-center ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-500 hover:text-indigo-500'
                } outline-none focus:outline-none`}
              >
                <div className="mb-1 text-xl">{item.icon}</div>
                <span className="text-xs font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavBar;
