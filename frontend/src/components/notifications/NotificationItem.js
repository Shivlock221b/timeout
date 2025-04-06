import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationsContext';

// Single Responsibility Principle: NotificationItem component only handles displaying and interacting with a single notification
const NotificationItem = ({ notification, onClose }) => {
  const { markAsRead } = useNotifications();

  // Format the timestamp in a human-readable format
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - notificationTime) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } else {
      return notificationTime.toLocaleDateString();
    }
  };

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'event':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case 'message':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Handle notification click
  const handleClick = () => {
    markAsRead(notification.id);
    onClose();
  };

  return (
    <Link 
      to={notification.actionUrl} 
      onClick={handleClick}
      className={`block border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
    >
      <div className="flex p-4">
        <div className="flex-shrink-0 mr-3">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
              {notification.title}
            </p>
            <span className="text-xs text-gray-400">
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
        </div>
        {!notification.read && (
          <span className="flex-shrink-0 ml-2 h-2 w-2 bg-blue-500 rounded-full"></span>
        )}
      </div>
    </Link>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    read: PropTypes.bool.isRequired,
    actionUrl: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default NotificationItem;
