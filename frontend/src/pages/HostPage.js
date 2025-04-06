import React, { useState } from 'react';
import EventCreationForm from '../components/host/EventCreationForm';
import EventTemplateSelector from '../components/host/EventTemplateSelector';
import RecurringEventScheduler from '../components/host/RecurringEventScheduler';

// Single Responsibility Principle: HostPage is responsible for the overall host dashboard layout and state
const HostPage = () => {
  const [activeTab, setActiveTab] = useState('create'); // create, templates, recurring, analytics
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: 10,
    isPublic: true,
    isRecurring: false,
    recurringPattern: {
      frequency: 'weekly', // daily, weekly, monthly
      interval: 1, // every 1 day/week/month
      endDate: '',
      daysOfWeek: [] // For weekly recurring events
    }
  });

  // Handler for form updates
  const handleEventDataChange = (updatedData) => {
    setEventData({ ...eventData, ...updatedData });
  };

  // Apply a template to the event data
  const applyTemplate = (template) => {
    setSelectedTemplate(template);
    setEventData({
      ...eventData,
      ...template.defaults
    });
    setActiveTab('create'); // Switch to creation form after selecting a template
  };

  // Handler for event submission
  const handleCreateEvent = (e) => {
    e.preventDefault();
    // Here you would typically send the event data to your API
    console.log('Creating event:', eventData);
    alert('Event created successfully! (This is a placeholder - actual API integration would happen here)');
    
    // Reset form after submission
    setEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: 10,
      isPublic: true,
      isRecurring: false,
      recurringPattern: {
        frequency: 'weekly',
        interval: 1,
        endDate: '',
        daysOfWeek: []
      }
    });
    setSelectedTemplate(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Host Dashboard</h1>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        <nav className="flex min-w-max" aria-label="Dashboard Tabs">
          <button
            className={`py-4 px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'create'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('create')}
          >
            Create Event
          </button>
          <button
            className={`py-4 px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'templates'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            Event Templates
          </button>
          <button
            className={`py-4 px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'recurring'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('recurring')}
          >
            Recurring Events
          </button>
          <button
            className={`py-4 px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-6">
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
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Host Analytics</h2>
            <p className="text-gray-500">Analytics features are coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostPage;
