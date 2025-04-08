import React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaStar, FaUser, FaTag, FaClock, FaCalendarAlt } from 'react-icons/fa';

/**
 * EventCard Component
 * 
 * Displays an individual event card with all relevant information
 * Following the Single Responsibility Principle - this component only handles displaying event data
 */
const EventCard = ({ event, size = 'medium' }) => {
  // Handle null/undefined checks for event properties
  if (!event) return null;
  
  const {
    title,
    description,
    location,
    distance,
    rating,
    participants,
    maxParticipants,
    tags,
    image,
    host,
    date,
    time,
    recommendation
  } = event;

  // Different class sets based on card size
  const sizeClasses = {
    small: {
      card: 'max-w-xs',
      image: 'h-40',
      title: 'text-lg',
      description: 'line-clamp-2', // Limit to 2 lines for small cards
    },
    medium: {
      card: 'max-w-sm',
      image: 'h-48',
      title: 'text-xl',
      description: 'line-clamp-3', // Limit to 3 lines for medium cards
    },
    large: {
      card: 'max-w-md',
      image: 'h-56',
      title: 'text-2xl',
      description: 'line-clamp-4', // Limit to 4 lines for large cards
    }
  };

  const classes = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`${classes.card} bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
      <div className="relative">
        {/* Event Image */}
        <img 
          src={image} 
          alt={title} 
          className={`${classes.image} w-full object-cover`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x250?text=Event'; // Fallback image
          }}
        />
        
        {/* Recommendation badge if applicable */}
        {recommendation && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(recommendation.score * 100)}% Match
          </div>
        )}
      </div>
      
      <div className="p-4">
        {/* Event Title */}
        <h3 className={`${classes.title} font-bold text-gray-800 mb-2`}>{title}</h3>
        
        {/* Event Description */}
        <p className={`${classes.description} text-gray-600 mb-3 overflow-hidden`}>
          {description}
        </p>
        
        {/* Event Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          {/* Date and Time */}
          {date && time && (
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <FaCalendarAlt className="mr-1 text-indigo-600" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-1 text-indigo-600" />
                <span>{time}</span>
              </div>
            </div>
          )}
          
          {/* Location and Distance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center truncate mr-2">
              <FaMapMarkerAlt className="mr-1 text-indigo-600" />
              <span className="truncate">{location}</span>
            </div>
            {distance && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {distance} km
              </span>
            )}
          </div>
          
          {/* Rating and Participants */}
          <div className="flex items-center justify-between">
            {rating && (
              <div className="flex items-center">
                <FaStar className="mr-1 text-yellow-500" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            {participants && (
              <div className="flex items-center">
                <FaUser className="mr-1 text-indigo-600" />
                <span>
                  {participants}
                  {maxParticipants ? ` / ${maxParticipants}` : ''}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
              >
                <FaTag className="mr-1 text-xs text-indigo-600" />
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-block text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Host Information */}
        {host && (
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center">
            <img 
              src={host.image} 
              alt={host.name} 
              className="w-8 h-8 rounded-full object-cover mr-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/32?text=Host'; // Fallback image
              }}
            />
            <div>
              <p className="text-sm font-medium">{host.name}</p>
              <p className="text-xs text-gray-500">Host {host.verified && '✓'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes for type checking
EventCard.propTypes = {
  event: PropTypes.shape({
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
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default EventCard;
