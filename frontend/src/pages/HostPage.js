import React, { useState, useEffect } from 'react';
import { FaCalendarPlus, FaListAlt, FaSyncAlt, FaChartBar, FaHistory } from 'react-icons/fa';
import EventCreationForm from '../components/host/EventCreationForm';
import EventTemplateSelector from '../components/host/EventTemplateSelector';
import RecurringEventScheduler from '../components/host/RecurringEventScheduler';
import { upcomingEvents, hostAnalytics } from '../data/host/mockHostData';

/**
 * HostPage Component
 * 
 * Following Single Responsibility Principle:
 * - This component is responsible for the overall host dashboard layout and state management
 * - Each tab's functionality is delegated to specialized components
 */
const HostPage = () => {
  const [activeTab, setActiveTab] = useState('create'); // create, templates, recurring, analytics, history
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [upcomingHostEvents, setUpcomingHostEvents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Initial event data state
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    duration: 60,
    maxAttendees: 10,
    isPublic: true,
    isRecurring: false,
    tags: [],
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      endDate: '',
      daysOfWeek: []
    }
  });

  // Fetch host data on component mount
  useEffect(() => {
    const fetchHostData = async () => {
      setLoading(true);
      try {
        // Simulating API calls with mock data
        // In a real app, these would be API requests
        setTimeout(() => {
          setUpcomingHostEvents(upcomingEvents);
          setAnalytics(hostAnalytics);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching host data:", error);
        setLoading(false);
      }
    };

    fetchHostData();
  }, []);

  // Handler for event data changes
  const handleEventDataChange = (updatedData) => {
    setEventData({ ...eventData, ...updatedData });
  };

  // Apply a template to the event data
  const applyTemplate = (template) => {
    setSelectedTemplate(template);
    setEventData({
      ...eventData,
      ...template.defaults,
      // Keep existing date/time/location if set
      date: eventData.date || '',
      time: eventData.time || ''
    });
    setActiveTab('create'); // Switch to creation form after selecting a template
  };

  // Handler for event submission
  const handleCreateEvent = (e) => {
    e.preventDefault();
    // Here you would typically send the event data to your API
    console.log('Creating event:', eventData);
    
    // Show success message
    alert('Event created successfully! (This is a placeholder - actual API integration would happen here)');
    
    // Reset form after submission
    setEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      duration: 60,
      maxAttendees: 10,
      isPublic: true,
      isRecurring: false,
      tags: [],
      recurringPattern: {
        frequency: 'weekly',
        interval: 1,
        endDate: '',
        daysOfWeek: []
      }
    });
    setSelectedTemplate(null);
  };

  // Format date for display
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  // Tabs configuration
  const tabs = [
    { id: 'create', label: 'Create Event', icon: <FaCalendarPlus className="h-5 w-5" /> },
    { id: 'templates', label: 'Templates', icon: <FaListAlt className="h-5 w-5" /> },
    { id: 'recurring', label: 'Recurring', icon: <FaSyncAlt className="h-5 w-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <FaChartBar className="h-5 w-5" /> },
    { id: 'history', label: 'Upcoming', icon: <FaHistory className="h-5 w-5" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden max-w-full">
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6 overflow-x-hidden">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Host Dashboard</h1>
          <p className="mt-1 text-gray-600">Manage your events and view hosting insights</p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Vertical Tab Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <nav className="flex flex-col" aria-label="Dashboard Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center px-4 py-3 hover:bg-gray-50 focus:outline-none ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
                        : 'text-gray-600 border-l-4 border-transparent'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Quick Stats for Desktop */}
            {!loading && analytics && (
              <div className="hidden md:block mt-6 bg-white shadow-sm rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Events Hosted</span>
                    <span className="font-medium">{analytics.eventsHosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Total Attendees</span>
                    <span className="font-medium">{analytics.totalAttendees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Avg. Rating</span>
                    <span className="font-medium">{analytics.averageRating}/5</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 max-w-full overflow-x-hidden">
            {activeTab === 'create' && (
              <EventCreationForm 
                eventData={eventData} 
                onEventDataChange={handleEventDataChange} 
                onSubmit={handleCreateEvent}
                selectedTemplate={selectedTemplate}
              />
            )}
            
            {activeTab === 'templates' && (
              <EventTemplateSelector onSelectTemplate={applyTemplate} />
            )}
            
            {activeTab === 'recurring' && (
              <RecurringEventScheduler 
                eventData={eventData}
                onEventDataChange={handleEventDataChange}
                onSubmit={handleCreateEvent}
              />
            )}
            
            {activeTab === 'analytics' && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h2 className="text-xl font-medium text-gray-900">Hosting Analytics</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Insights from your hosted events
                  </p>
                </div>
                
                {loading ? (
                  <div className="p-6 flex justify-center">
                    <div className="animate-pulse space-y-4 w-full">
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                      <div className="h-48 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ) : analytics ? (
                  <div className="p-6">
                    {/* Stats Summary - Visible only on mobile */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 md:hidden">
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-indigo-800">Events Hosted</p>
                        <p className="text-2xl font-bold text-indigo-900">{analytics.eventsHosted}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Total Attendees</p>
                        <p className="text-2xl font-bold text-green-900">{analytics.totalAttendees}</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">Avg. Rating</p>
                        <p className="text-2xl font-bold text-yellow-900">{analytics.averageRating}/5</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Completion Rate</p>
                        <p className="text-2xl font-bold text-blue-900">{analytics.completionRate}%</p>
                      </div>
                    </div>
                    
                    {/* Additional stats that don't appear in sidebar */}
                    <div className="hidden md:block mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">Completion Rate</p>
                          <p className="text-2xl font-bold text-blue-900">{analytics.completionRate}%</p>
                        </div>
                        {analytics.revenueGenerated && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-purple-800">Revenue</p>
                            <p className="text-2xl font-bold text-purple-900">${analytics.revenueGenerated}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Top Performing Events */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Top Event Types</h3>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Count
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Attendees
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {analytics.topPerformingEventTypes.map((type, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {type.type}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {type.count}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {type.attendees}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    
                    {/* Monthly Stats Placeholder */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Monthly Activity</h3>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-48 flex items-center justify-center">
                        <p className="text-gray-500">Monthly stats visualization would appear here</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No analytics data available yet.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h2 className="text-xl font-medium text-gray-900">Upcoming Events</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Events you're hosting in the near future
                  </p>
                </div>
                
                <div className="overflow-hidden">
                  {loading ? (
                    <div className="p-6">
                      <div className="animate-pulse space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                    </div>
                  ) : upcomingHostEvents && upcomingHostEvents.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Event
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Attendees
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {upcomingHostEvents.map((event) => (
                            <tr key={event.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{event.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{formatEventDate(event.date)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{event.location}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {event.attendeeCount}/{event.maxAttendees}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span 
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    event.status === 'confirmed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {event.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">You don't have any upcoming events.</p>
                      <button
                        onClick={() => setActiveTab('create')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaCalendarPlus className="-ml-1 mr-2 h-5 w-5" />
                        Create Your First Event
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPage;
