import React, { useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import EventCreationForm from '../components/host/EventCreationForm';
import EventTemplateSelector from '../components/host/EventTemplateSelector';
import RecurringEventScheduler from '../components/host/RecurringEventScheduler';

/**
 * HostPage Component
 * 
 * Following Single Responsibility Principle:
 * - This component is responsible for the overall host dashboard layout and state management
 * - Each tab's functionality is delegated to specialized components
 */
const HostPage = () => {
  // Main tab is only "create" now
  const [activeTab, setActiveTab] = useState('create');
  // Create a nested tab structure within the create tab
  const [activeCreateSubTab, setActiveCreateSubTab] = useState('new');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
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
    setActiveCreateSubTab('new'); // Switch to creation form after selecting a template
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

  // Simplified tabs configuration - just one main tab now
  const tabs = [
    { id: 'create', label: 'Create Event', icon: <FaCalendarPlus className="h-5 w-5" /> }
  ];

  // Create sub-tabs for the create section
  const createSubTabs = [
    { id: 'new', label: 'Create a New Event' },
    { id: 'templates', label: 'Templates' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden max-w-full">
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6 overflow-x-hidden">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Host Dashboard</h1>
          <p className="mt-1 text-gray-600">Manage your events and view hosting insights</p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Vertical Tab Navigation - Simplified with just Create Event */}
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
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 max-w-full overflow-x-hidden">
            {activeTab === 'create' && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                {/* Sub-tabs for Create Event section */}
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    {createSubTabs.map((subTab) => (
                      <button
                        key={subTab.id}
                        className={`px-4 py-3 text-sm font-medium ${
                          activeCreateSubTab === subTab.id
                            ? 'border-b-2 border-indigo-500 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveCreateSubTab(subTab.id)}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Sub-tab Content */}
                <div className="p-4">
                  {activeCreateSubTab === 'new' && (
                    <div>
                      <div className="mb-4 mt-2">
                        <h2 className="text-xl font-medium text-gray-900">
                          {selectedTemplate 
                            ? `Create Event from Template: ${selectedTemplate.name}` 
                            : 'Create a New Event'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Fill in the details below to create your event
                        </p>
                      </div>
                      
                      <EventCreationForm 
                        eventData={eventData} 
                        onEventDataChange={handleEventDataChange} 
                        onSubmit={handleCreateEvent}
                        selectedTemplate={selectedTemplate}
                      />
                      
                      {/* Show recurring options when isRecurring is true */}
                      {eventData.isRecurring && (
                        <div className="mt-8 border-t border-gray-200 pt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Recurring Event Settings
                          </h3>
                          <RecurringEventScheduler 
                            eventData={eventData}
                            onEventDataChange={handleEventDataChange}
                            onSubmit={handleCreateEvent}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeCreateSubTab === 'templates' && (
                    <EventTemplateSelector onSelectTemplate={applyTemplate} />
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
