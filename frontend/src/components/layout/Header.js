import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationButton from '../notifications/NotificationButton';
import timeoutLogo from '../../assets/icons/timeout_logo.png';
import { FaPlus } from 'react-icons/fa';

// Following Single Responsibility Principle - Header only handles navigation and its own UI state
const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to update header transparency
  useEffect(() => {
    const handleScroll = () => {
      // Consider scrolled after 10px to create a nice effect
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle logo click based on authentication status
  const handleLogoClick = (e) => {
    if (isAuthenticated) {
      e.preventDefault(); // Prevent default navigation for authenticated users
      navigate('/onlyforyou'); // Navigate to the "Only For You" page
    }
  };

  return (
    <>
      {/* Blurred background div that doesn't contain any content */}
      <div 
        className={`fixed top-0 left-0 right-0 h-[60px] md:h-[72px] z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/30 backdrop-blur-md' 
            : 'bg-indigo-600'
        } rounded-b-lg`} 
      />
      
      {/* Actual header content with transparent background */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
      >
        <div className="container mx-auto px-3 py-3 md:px-4 md:py-4 flex justify-between items-center relative">
          {/* Left side - App name */}
          <div className="flex items-center relative">
            <span 
              className={`absolute -top-2 -right-2 text-[8px] transition-colors duration-300 ${
                isScrolled ? 'text-indigo-600' : 'text-white'
              }`}
            >
              TM
            </span>
            <Link 
              to="/" 
              className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-indigo-600' : 'text-white'
              }`}
              onClick={handleLogoClick}
            >
              Tymout
            </Link>
          </div>
          
          {/* Center - Notification icon with logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            {isAuthenticated && (
              <NotificationButton 
                logoSrc={timeoutLogo} 
                size="large" 
                className={isScrolled ? 'filter invert' : ''}
              />
            )}
          </div>
          
          {/* Right side - Host button or Login/Signup */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link 
                to="/host"
                className={`flex flex-col items-center focus:outline-none hover:opacity-80 transition-all duration-300 ${
                  isScrolled ? 'text-indigo-600' : 'text-white'
                }`}
                aria-label="Host"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isScrolled ? 'bg-indigo-600' : 'bg-indigo-500'
                }`}>
                  <FaPlus className="text-white" />
                </div>
                <span className="text-xs mt-1">Host</span>
              </Link>
            ) : (
              // Empty div to maintain layout balance when not authenticated
              <div></div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
