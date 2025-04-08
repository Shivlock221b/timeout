import React from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard';

/**
 * EventList Component
 * 
 * Displays a list of events in a responsive grid
 * Following Single Responsibility Principle - this component only handles displaying a list of events
 */
const EventList = ({ events, emptyMessage = "No events found", loading = false }) => {
  // Handle loading state
  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-indigo-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Handle empty state
  if (!events || events.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

// PropTypes for type checking
EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      distance: PropTypes.number,
      rating: PropTypes.number,
      participants: PropTypes.number,
      maxParticipants: PropTypes.number,
      tags: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.string.isRequired,
      host: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        verified: PropTypes.bool
      }),
      date: PropTypes.string,
      time: PropTypes.string,
      recommendation: PropTypes.shape({
        reason: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    })
  ),
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool
};

export default EventList;
