import React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaUser, FaTag, FaClock, FaCalendarAlt, FaUsers } from 'react-icons/fa';

/**
 * EventDetailInfo Component
 * 
 * Following the Single Responsibility Principle:
 * This component handles displaying detailed information about an event/table/circle
 */
const EventDetailInfo = ({ item, type }) => {
  // Determine the appropriate content label based on type
  const getTypeLabel = () => {
    switch (type) {
      case 'tables':
        return 'Table';
      case 'events':
        return 'Event';
      case 'circles':
        return 'Circle';
      default:
        return 'Item';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">About this {getTypeLabel()}</h2>
      <p className="text-gray-700 mb-6">{item.description}</p>
      
      {/* Date and Time */}
      {(item.date || item.time) && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">When</h3>
          <div className="flex flex-wrap gap-6">
            {item.date && (
              <div className="flex items-center">
                <FaCalendarAlt className="text-indigo-600 mr-2" />
                <span>{item.date}</span>
              </div>
            )}
            {item.time && (
              <div className="flex items-center">
                <FaClock className="text-indigo-600 mr-2" />
                <span>{item.time}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Location */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Location</h3>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-indigo-600 mr-2" />
          <span>{item.location}</span>
          {item.distance && (
            <span className="ml-2 text-sm text-gray-500">({item.distance} km away)</span>
          )}
        </div>
      </div>
      
      {/* Participants */}
      {(item.participants || item.maxParticipants || item.attendees) && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Participants</h3>
          <div className="flex items-center">
            <FaUsers className="text-indigo-600 mr-2" />
            <span>
              {item.participants || item.attendees || 0}
              {item.maxParticipants ? ` / ${item.maxParticipants} max` : ''}
            </span>
          </div>
        </div>
      )}
      
      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
              >
                <FaTag className="mr-1 text-indigo-600 text-xs" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

EventDetailInfo.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default EventDetailInfo;
