import React from 'react';
import PropTypes from 'prop-types';

// Single Responsibility Principle: This component is only responsible for the recurring event configuration
const RecurringEventScheduler = ({ eventData, onEventDataChange, onSubmit }) => {
  // Handle changes to the recurring pattern
  const handleRecurringChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Create a new recurring pattern object with the updated value
    const updatedPattern = {
      ...eventData.recurringPattern,
      [name]: type === 'checkbox' ? checked : value
    };
    
    // Update the parent state with the new pattern
    onEventDataChange({
      recurringPattern: updatedPattern
    });
  };

  // Handle day of week selection for weekly recurring events
  const handleDaySelect = (day) => {
    const currentDays = [...eventData.recurringPattern.daysOfWeek];
    const updatedDays = currentDays.includes(day) 
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    // Update the recurring pattern with the new days
    onEventDataChange({
      recurringPattern: {
        ...eventData.recurringPattern,
        daysOfWeek: updatedDays
      }
    });
  };

  // Day names for weekly selection
  const daysOfWeek = [
    { value: 0, label: 'Sun' },
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' }
  ];
  
  // Function to create the recurring event title based on pattern
  const getRecurringTitle = () => {
    const frequency = eventData.recurringPattern.frequency;
    const interval = eventData.recurringPattern.interval;
    
    if (frequency === 'daily') {
      return interval === 1 ? 'Daily' : `Every ${interval} days`;
    } else if (frequency === 'weekly') {
      return interval === 1 ? 'Weekly' : `Every ${interval} weeks`;
    } else if (frequency === 'monthly') {
      return interval === 1 ? 'Monthly' : `Every ${interval} months`;
    }
    return 'Custom';
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">Configure Recurring Events</h2>
        <p className="mt-1 text-sm text-gray-500">
          Set up a schedule for recurring events. You can choose frequency, interval, and end date.
        </p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        onEventDataChange({ isRecurring: true });
        onSubmit(e);
      }}>
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
              onChange={(e) => onEventDataChange({ title: e.target.value })}
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="e.g., Weekly Book Club"
            />
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={eventData.recurringPattern.frequency}
              onChange={handleRecurringChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label htmlFor="interval" className="block text-sm font-medium text-gray-700">
              Interval
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                Every
              </span>
              <input
                type="number"
                name="interval"
                id="interval"
                min="1"
                max="30"
                value={eventData.recurringPattern.interval}
                onChange={handleRecurringChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                {eventData.recurringPattern.frequency === 'daily' ? 'days' : 
                 eventData.recurringPattern.frequency === 'weekly' ? 'weeks' : 'months'}
              </span>
            </div>
          </div>

          {eventData.recurringPattern.frequency === 'weekly' && (
            <div className="col-span-2">
              <span className="block text-sm font-medium text-gray-700 mb-2">Days of Week</span>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => handleDaySelect(day.value)}
                    className={`px-3 py-2 text-sm rounded-full ${
                      eventData.recurringPattern.daysOfWeek.includes(day.value)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="col-span-2">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={eventData.recurringPattern.endDate}
              onChange={handleRecurringChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty for an indefinite recurring event.
            </p>
          </div>

          <div className="col-span-2">
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <h3 className="text-sm font-medium text-gray-900">Summary</h3>
              <p className="text-sm text-gray-700 mt-1">
                This event will occur <strong>{getRecurringTitle()}</strong>
                {eventData.recurringPattern.frequency === 'weekly' && eventData.recurringPattern.daysOfWeek.length > 0 && (
                  <> on <strong>
                    {eventData.recurringPattern.daysOfWeek
                      .sort()
                      .map(day => daysOfWeek.find(d => d.value === day).label)
                      .join(', ')}
                  </strong></>
                )}
                {eventData.recurringPattern.endDate && (
                  <> until <strong>{new Date(eventData.recurringPattern.endDate).toLocaleDateString()}</strong></>
                )}
                .
              </p>
            </div>
          </div>

          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Recurring Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RecurringEventScheduler.propTypes = {
  eventData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isRecurring: PropTypes.bool.isRequired,
    recurringPattern: PropTypes.shape({
      frequency: PropTypes.string.isRequired,
      interval: PropTypes.number.isRequired,
      endDate: PropTypes.string,
      daysOfWeek: PropTypes.array.isRequired
    }).isRequired
  }).isRequired,
  onEventDataChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default RecurringEventScheduler;
