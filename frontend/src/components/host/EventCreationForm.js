import React from 'react';
import PropTypes from 'prop-types';

// Single Responsibility Principle: This component is only responsible for the event creation form UI and direct event handling
const EventCreationForm = ({ eventData, onEventDataChange, onSubmit, selectedTemplate }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      onEventDataChange({ [name]: checked });
    } else {
      onEventDataChange({ [name]: value });
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">Create an Event</h2>
        {selectedTemplate && (
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Using template: {selectedTemplate.name}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title*
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={eventData.title}
              onChange={handleChange}
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={eventData.description}
              onChange={handleChange}
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date*
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time*
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={eventData.time}
              onChange={handleChange}
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location*
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700">
              Maximum Attendees
            </label>
            <input
              type="number"
              name="maxAttendees"
              id="maxAttendees"
              min="1"
              max="100"
              value={eventData.maxAttendees}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <div className="flex items-center mt-6">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                checked={eventData.isPublic}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
                Make this event public
              </label>
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="flex items-center">
              <input
                id="isRecurring"
                name="isRecurring"
                type="checkbox"
                checked={eventData.isRecurring}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-900">
                This is a recurring event
              </label>
            </div>
            
            {eventData.isRecurring && (
              <p className="mt-2 text-sm text-gray-500">
                Please go to the "Recurring Events" tab to configure the recurrence pattern.
              </p>
            )}
          </div>

          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

EventCreationForm.propTypes = {
  eventData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    maxAttendees: PropTypes.number.isRequired,
    isPublic: PropTypes.bool.isRequired,
    isRecurring: PropTypes.bool.isRequired,
  }).isRequired,
  onEventDataChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaults: PropTypes.object.isRequired,
  }),
};

export default EventCreationForm;
