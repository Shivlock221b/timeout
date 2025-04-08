import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationButton from '../notifications/NotificationButton';
import { FaPlus, FaBars, FaTimes, FaBell } from 'react-icons/fa';

// Following Single Responsibility Principle - Header only handles navigation and its own UI state
const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle logo click based on authentication status
  const handleLogoClick = (e) => {
    if (isAuthenticated) {
      e.preventDefault(); // Prevent default navigation for authenticated users
      navigate('/onlyforyou'); // Navigate to the "Only For You" page
    }
  };

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle menu item click - navigate to the page and close the menu
  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Navigate to notifications page
  const handleNavigateToNotifications = () => {
    navigate('/notifications');
  };

  return (
    <>
      {/* Blurred background div that doesn't contain any content */}
      <div 
        className={`fixed top-0 left-0 right-0 h-[70px] md:h-[80px] z-40 transition-all duration-300 ${
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
          
          {/* Right side - Host button, Notification icon, and Hamburger menu (only if not authenticated) */}
          <div className="flex items-center">
            {isAuthenticated && (
              <>
                <Link 
                  to="/host"
                  className={`flex flex-col items-center focus:outline-none hover:opacity-80 transition-all duration-300 ${
                    isScrolled ? 'text-indigo-600' : 'text-white'
                  }`}
                  aria-label="Host"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isScrolled ? 'bg-indigo-600' : 'bg-indigo-500'
                  }`}>
                    <FaPlus className="text-white" />
                  </div>
                  <span className="text-xs mt-1">Host</span>
                </Link>

                {/* Spacing between buttons */}
                <div className="w-6"></div>

                {/* Notification Bell Icon */}
                <button
                  onClick={handleNavigateToNotifications}
                  className={`flex flex-col items-center focus:outline-none hover:opacity-80 transition-all duration-300 ${
                    isScrolled ? 'text-indigo-600' : 'text-white'
                  }`}
                  aria-label="Notifications"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 relative ${
                    isScrolled ? 'bg-indigo-600' : 'bg-indigo-500'
                  }`}>
                    <FaBell className="text-white" />
                    {/* Notification badge would go here if needed */}
                  </div>
                  <span className="text-xs mt-1">Notifications</span>
                </button>
              </>
            )}
            
            {/* Hamburger Menu Button - Only show if not authenticated */}
            {!isAuthenticated && (
              <button
                onClick={toggleMenu}
                className={`ml-4 focus:outline-none hover:opacity-80 transition-all duration-300 ${
                  isScrolled ? 'text-indigo-600' : 'text-white'
                }`}
                aria-label="Menu"
              >
                {isMenuOpen ? 
                  <FaTimes className="text-2xl" /> : 
                  <FaBars className="text-2xl" />
                }
              </button>
            )}
          </div>
        </div>
        
        {/* Hamburger Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleMenu}
        />
        
        {/* Hamburger Menu Content */}
        <div 
          className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
              <button 
                onClick={toggleMenu} 
                className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                aria-label="Close menu"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <nav>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/about')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/creators')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    Creators
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/business')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    Business
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/features')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/guidelines')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    Guidelines
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/faq')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/contact')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuItemClick('/policies')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                  >
                    Policies
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
