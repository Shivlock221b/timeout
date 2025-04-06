import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const NotificationsContext = createContext();

// Custom hook to use the notifications context
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

// Provider component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Example notification data - would come from API in real implementation
  const dummyNotifications = [
    {
      id: '1',
      type: 'event',
      title: 'New Event Invitation',
      message: 'John invited you to Coffee Meetup',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      actionUrl: '/events/123'
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Sarah sent you a message',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      actionUrl: '/messages/456'
    },
    {
      id: '3',
      type: 'system',
      title: 'Profile Completion',
      message: 'Complete your profile to get better matches',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      actionUrl: '/settings/profile'
    }
  ];

  // Simulate API fetch on mount
  useEffect(() => {
    // This would be replaced by an actual API call
    const fetchNotifications = async () => {
      // Simulate API delay
      setTimeout(() => {
        setNotifications(dummyNotifications);
        const unread = dummyNotifications.filter(notification => !notification.read).length;
        setUnreadCount(unread);
      }, 1000);
    };

    fetchNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => {
        if (notification.id === id && !notification.read) {
          setUnreadCount(prevCount => Math.max(0, prevCount - 1));
          return { ...notification, read: true };
        }
        return notification;
      })
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  // Add a new notification (will be used when websockets are implemented)
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  };

  // Remove a notification
  const removeNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  // Value object to be provided to consumers
  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
