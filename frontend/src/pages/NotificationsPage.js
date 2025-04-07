import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationsContext';
import { format } from 'date-fns';

// Following Single Responsibility Principle - NotificationsPage only handles displaying notifications
const NotificationsPage = () => {
  const [notificationGroups, setNotificationGroups] = useState({
    today: [],
    yesterday: [],
    lastWeek: []
  });
  const [loading, setLoading] = useState(true);
  const { markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock fetching notifications - replace with actual API call
    const fetchNotifications = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample data - replace with actual API response
        const mockNotifications = [
          {
            id: 1,
            type: 'message',
            content: 'New message from John Doe',
            timestamp: new Date().getTime() - 1000 * 60 * 10, // 10 minutes ago
            read: false
          },
          {
            id: 2,
            type: 'event',
            content: 'Your event "Coffee Chat" is starting in 30 minutes',
            timestamp: new Date().getTime() - 1000 * 60 * 30, // 30 minutes ago
            read: false
          },
          {
            id: 3,
            type: 'circle',
            content: 'You were added to "Tech Enthusiasts" circle',
            timestamp: new Date().getTime() - 1000 * 60 * 60 * 2, // 2 hours ago
            read: true
          },
          {
            id: 4,
            type: 'table',
            content: 'Sarah invited you to join her table "Lunch at Central Park"',
            timestamp: new Date().getTime() - 1000 * 60 * 60 * 5, // 5 hours ago
            read: true
          },
          {
            id: 5,
            type: 'system',
            content: 'Welcome to Tymout! Complete your profile to get started.',
            timestamp: new Date().getTime() - 1000 * 60 * 60 * 24, // 1 day ago
            read: true
          },
          {
            id: 6,
            type: 'message',
            content: 'James commented on your post',
            timestamp: new Date().getTime() - 1000 * 60 * 60 * 30, // 30 hours ago
            read: true
          },
          {
            id: 7,
            type: 'event',
            content: 'New event was created in your area',
            timestamp: new Date().getTime() - 1000 * 60 * 60 * 48, // 2 days ago
            read: false
          },
          {
            id: 8,
            type: 'circle',
            content: 'Your friend Michael joined Tymout',
            timestamp: new Date().getTime() - 1000 * 60 * 60 * 72, // 3 days ago
            read: true
          }
        ];
        
        // Group notifications by time periods
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const today = now.setHours(0, 0, 0, 0);
        
        const groupedNotifications = {
          today: [],
          yesterday: [],
          lastWeek: []
        };
        
        mockNotifications.forEach(notification => {
          const notificationDate = new Date(notification.timestamp);
          
          if (notificationDate >= new Date(today)) {
            groupedNotifications.today.push(notification);
          } else if (notificationDate >= yesterday && notificationDate < new Date(today)) {
            groupedNotifications.yesterday.push(notification);
          } else if (notificationDate >= weekAgo && notificationDate < yesterday) {
            groupedNotifications.lastWeek.push(notification);
          }
        });
        
        setNotificationGroups(groupedNotifications);
        setLoading(false);
        
        // Mark notifications as read when viewing the page
        markAllAsRead();
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [markAllAsRead]);

  // Format timestamp to relative time (e.g., "2 hours ago")
  const formatTimestamp = (timestamp) => {
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'event':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'table':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'system':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Handle navigation based on notification type
  const handleNotificationClick = (notification) => {
    switch (notification.type) {
      case 'message':
        navigate('/messages');
        break;
      case 'event':
        navigate('/events');
        break;
      case 'circle':
        navigate('/circles');
        break;
      case 'table':
        navigate('/tables');
        break;
      default:
        // Do nothing for system notifications
        break;
    }
  };

  // Render a notification group section
  const renderNotificationGroup = (title, notifications) => {
    if (!notifications || notifications.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-500 mb-3 px-4">{title}</h2>
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li 
              key={notification.id}
              className={`px-4 py-3 cursor-pointer transition-colors rounded-lg mx-2
                ${notification.read ? 'bg-white' : 'bg-white'} 
                hover:bg-gray-50 shadow-sm`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1 bg-gray-50 p-2 rounded-full">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Simplified elegant header */}
      <div className="bg-white text-gray-800 py-4 px-4 flex items-center shadow-sm border-b border-gray-200">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-1 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
          aria-label="Go back"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-medium text-gray-800">Notifications</h1>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {notificationGroups.today.length === 0 && 
             notificationGroups.yesterday.length === 0 && 
             notificationGroups.lastWeek.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-4 
                             bg-white rounded-xl shadow-sm py-8 mx-4 mt-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-300 mb-3"
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
                <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
                <p className="text-gray-500 mt-1">You're all caught up!</p>
              </div>
            ) : (
              <div className="px-2">
                {renderNotificationGroup('Today', notificationGroups.today)}
                {renderNotificationGroup('Yesterday', notificationGroups.yesterday)}
                {renderNotificationGroup('Last 7 Days', notificationGroups.lastWeek)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
