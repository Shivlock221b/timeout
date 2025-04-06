import React from 'react';
import PropTypes from 'prop-types';
import { useNotifications } from '../../context/NotificationsContext';
import NotificationItem from './NotificationItem';

// Single Responsibility Principle: NotificationPanel component only handles displaying the panel and notification list
const NotificationPanel = ({ onClose }) => {
  const { notifications, markAllAsRead } = useNotifications();

  // Handles the click outside to close panel
  const handleClickOutside = (e) => {
    if (e.target.id === 'notification-backdrop') {
      onClose();
    }
  };

  return (
    <>
      {/* Transparent backdrop to detect clicks outside */}
      <div 
        id="notification-backdrop"
        className="fixed inset-0 z-20" 
        onClick={handleClickOutside}
      ></div>
      
      {/* Notification panel */}
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-30">
        <div className="py-2 px-3 bg-gray-100 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
          <button 
            onClick={markAllAsRead}
            className="text-xs text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Mark all as read
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">
              No notifications yet
            </div>
          ) : (
            <div>
              {notifications.map(notification => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="py-2 px-3 bg-gray-100 border-t border-gray-200 text-center">
          <button 
            className="text-xs text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

NotificationPanel.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default NotificationPanel;
