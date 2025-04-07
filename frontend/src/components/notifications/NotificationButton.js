import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationsContext';

// Single Responsibility Principle: NotificationButton component only handles displaying the notification button and navigation
const NotificationButton = ({ logoSrc, size = 'normal', className = '' }) => {
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  // Navigate to notifications page
  const handleNavigateToNotifications = () => {
    navigate('/notifications');
  };

  // Determine size classes based on the size prop
  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return 'h-12 w-12 md:h-14 md:w-14';
      case 'normal':
      default:
        return 'h-9 w-9';
    }
  };

  // Determine badge position and size based on logo size
  const getBadgeClasses = () => {
    if (size === 'large') {
      return 'absolute top-1 right-1 translate-x-1/4 translate-y-1/4 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center border-2 border-indigo-600';
    }
    return 'absolute top-1 right-1 translate-x-1/4 translate-y-1/4 bg-red-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center border-2 border-indigo-600';
  };

  const sizeClasses = getSizeClasses();
  const badgeClasses = getBadgeClasses();

  return (
    <div className="relative">
      <button
        onClick={handleNavigateToNotifications}
        className="relative p-1 rounded-full text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
        aria-label="Notifications"
      >
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt="Notifications" 
            className={`${sizeClasses} object-contain rounded-full ${className}`}
          />
        ) : (
          <svg 
            className={`${sizeClasses} ${className}`}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
            />
          </svg>
        )}
      </button>

      {unreadCount > 0 && (
        <span className={badgeClasses}>
          {unreadCount < 10 ? unreadCount : '9+'}
        </span>
      )}
    </div>
  );
};

export default NotificationButton;
