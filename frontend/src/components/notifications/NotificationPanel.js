import React, { useMemo } from 'react';
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

  // Group notifications by time periods
  const groupedNotifications = useMemo(() => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const today = now.setHours(0, 0, 0, 0);
    
    const groups = {
      today: [],
      yesterday: [],
      lastWeek: []
    };
    
    notifications.forEach(notification => {
      const notificationDate = new Date(notification.timestamp);
      
      if (notificationDate >= new Date(today)) {
        groups.today.push(notification);
      } else if (notificationDate >= yesterday && notificationDate < new Date(today)) {
        groups.yesterday.push(notification);
      } else if (notificationDate >= weekAgo && notificationDate < yesterday) {
        groups.lastWeek.push(notification);
      }
    });
    
    return groups;
  }, [notifications]);

  // Render a notification group section
  const renderNotificationGroup = (title, notifications) => {
    if (!notifications || notifications.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 px-4 py-2">{title}</h3>
        <div>
          {notifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              notification={notification}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    );
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
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-30 border border-gray-200">
        <div className="py-3 px-4 bg-white flex justify-between items-center border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-800">Notifications</h3>
          {notifications.length > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              Mark all as read
            </button>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto pb-2">
          {notifications.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-gray-300 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              <p className="text-gray-500 text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="pt-2">
              {renderNotificationGroup('Today', groupedNotifications.today)}
              {renderNotificationGroup('Yesterday', groupedNotifications.yesterday)}
              {renderNotificationGroup('Last 7 Days', groupedNotifications.lastWeek)}
            </div>
          )}
        </div>
        
        <div className="py-2 px-3 bg-gray-50 border-t border-gray-100 text-center">
          <button 
            className="px-4 py-1.5 bg-white text-sm text-gray-700 rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none"
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
