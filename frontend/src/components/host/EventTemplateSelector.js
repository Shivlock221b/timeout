import React from 'react';
import PropTypes from 'prop-types';

// Single Responsibility Principle: This component is only responsible for displaying and selecting event templates
const EventTemplateSelector = ({ onSelectTemplate }) => {
  // Pre-defined event templates
  const templates = [
    {
      id: 'coffee-chat',
      name: 'Coffee Chat',
      description: 'Casual coffee meetup for networking or getting to know each other.',
      icon: '☕',
      defaults: {
        title: 'Coffee Chat',
        description: 'Let\'s meet for coffee and conversation! Join me for a casual chat where we can discuss topics, share ideas, or just get to know each other better.',
        maxAttendees: 4,
        isPublic: true,
        duration: 60, // minutes
      }
    },
    {
      id: 'book-club',
      name: 'Book Club',
      description: 'Discussion about a specific book or literary topic.',
      icon: '📚',
      defaults: {
        title: 'Book Club Meeting',
        description: 'Join our book club discussion! We\'ll be sharing thoughts and insights on the selected reading material in a friendly, open environment.',
        maxAttendees: 12,
        isPublic: true,
        duration: 90, // minutes
      }
    },
    {
      id: 'dinner-party',
      name: 'Dinner Party',
      description: 'Social gathering centered around a meal.',
      icon: '🍽️',
      defaults: {
        title: 'Dinner Party',
        description: 'You\'re invited to a dinner party! Join us for good food, great company, and memorable conversations.',
        maxAttendees: 8,
        isPublic: false,
        duration: 120, // minutes
      }
    },
    {
      id: 'fitness-group',
      name: 'Fitness Group',
      description: 'Exercise or sports activity for a group.',
      icon: '🏃',
      defaults: {
        title: 'Group Fitness Session',
        description: 'Let\'s get active together! Join this fitness session suitable for all levels. Bring water and comfortable clothes.',
        maxAttendees: 15,
        isPublic: true,
        duration: 60, // minutes
      }
    },
    {
      id: 'networking',
      name: 'Professional Networking',
      description: 'Career-focused networking event.',
      icon: '💼',
      defaults: {
        title: 'Professional Networking Event',
        description: 'Connect with professionals in your industry. Share experiences, exchange contacts, and explore potential collaborations.',
        maxAttendees: 20,
        isPublic: true,
        duration: 120, // minutes
      }
    },
    {
      id: 'workshop',
      name: 'Workshop/Class',
      description: 'Educational session to learn a specific skill.',
      icon: '🔧',
      defaults: {
        title: 'Workshop Session',
        description: 'Learn something new in this hands-on workshop. All materials will be provided, just bring your enthusiasm and willingness to learn!',
        maxAttendees: 15,
        isPublic: true,
        duration: 180, // minutes
      }
    }
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">Event Templates</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose a template to quickly set up your event. You can customize all details after selection.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{template.icon}</span>
              <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">{template.description}</p>
            <div className="text-xs text-gray-400">
              <p>Default capacity: {template.defaults.maxAttendees} people</p>
              <p>Duration: {template.defaults.duration} minutes</p>
            </div>
            <button
              className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => {
                e.stopPropagation();
                onSelectTemplate(template);
              }}
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

EventTemplateSelector.propTypes = {
  onSelectTemplate: PropTypes.func.isRequired,
};

export default EventTemplateSelector;
