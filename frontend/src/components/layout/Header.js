import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationButton from '../notifications/NotificationButton';
import timeoutLogo from '../../assets/icons/timeout_logo.png';

// Following Single Responsibility Principle - Header only handles navigation
const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Navigate to profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Handle logo click based on authentication status
  const handleLogoClick = (e) => {
    if (isAuthenticated) {
      e.preventDefault(); // Prevent default navigation for authenticated users
      navigate('/onlyforyou'); // Navigate to the "Only For You" page
    }
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-3 py-3 md:px-4 md:py-4 flex justify-between items-center relative">
        {/* Left side - App name */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold"
            onClick={handleLogoClick}
          >
            Tymout
          </Link>
        </div>
        
        {/* Center - Notification icon with logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center">
          {isAuthenticated && <NotificationButton logoSrc={timeoutLogo} size="large" />}
        </div>
        
        {/* Right side - User controls */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button 
              onClick={handleProfileClick}
              className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
              aria-label="Profile"
            >
              <img 
                src={user?.profilePicture || "https://via.placeholder.com/40"} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <span className="hidden md:inline">{user?.name || 'User'}</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200">Login</Link>
              <Link to="/signup" className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
