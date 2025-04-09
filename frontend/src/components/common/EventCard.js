import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaUser, FaTag, FaClock, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { useScrollToElement } from '../../context/ScrollToElementContext';

/**
 * Universal Card Component
 * 
 * A consolidated card component that handles events, tables, and circles
 * Following the Single Responsibility Principle - this component handles displaying all card types
 * with appropriate variations based on the type
 */
const EventCard = ({ item, size = 'medium', source = 'onlyforyou', type = 'event' }) => {
  const navigate = useNavigate();
  const { setScrollTarget } = useScrollToElement();
  
  // Handle null/undefined checks for properties
  if (!item) return null;
  
  const {
    id,
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
    recommendation,
    memberCount,
    attendees
  } = item;

  // Generate a unique element ID for this card
  const cardElementId = `${type}-card-${id}`;

  // For backward compatibility, reshape data if needed
  const event = item.event || item;

  // Different navigation paths based on card type
  const getNavigationPath = () => {
    switch (type) {
      case 'table':
        return `/tables/${id}`;
      case 'circle':
        return `/circles/${id}`;
      case 'event':
      default:
        return `/events/${id}`;
    }
  };

  // Handle card click to navigate to detail page
  const handleCardClick = () => {
    // Save the scroll target for when we come back
    setScrollTarget(source, cardElementId);
    
    // Navigate to detail page
    navigate(getNavigationPath(), { 
      state: { 
        from: source,
        cardElementId: cardElementId
      } 
    });
  };

  // Handle click on profile section
  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent card click
    
    const person = getPerson();
    if (person && person.id) {
      // Save the scroll target for when we come back
      setScrollTarget(source, cardElementId);
      
      navigate(`/profile/${person.id}`, { 
        state: { 
          from: source,
          returnTo: getNavigationPath(),
          itemTitle: title,
          cardElementId: cardElementId
        } 
      });
    }
  };

  // Action button handlers with stop propagation to prevent card navigation
  const handlePrimaryAction = (e) => {
    if (e) e.stopPropagation();
    
    switch (type) {
      case 'table':
      case 'circle':
        console.log(`Join ${type}:`, id);
        break;
      case 'event':
      default:
        console.log('RSVP to event:', id);
        break;
    }
  };

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

  // Get the appropriate label based on card type
  const getTypeLabel = () => {
    switch (type) {
      case 'table':
        return 'participants';
      case 'circle':
        return 'members';
      case 'event':
      default:
        return 'attending';
    }
  };

  // Get the appropriate primary action text based on card type
  const getPrimaryActionText = () => {
    switch (type) {
      case 'table':
      case 'circle':
        return 'Join';
      case 'event':
      default:
        return 'RSVP';
    }
  };

  // Get the person title based on card type
  const getPersonTitle = () => {
    switch (type) {
      case 'circle':
        return 'admin';
      case 'table':
      case 'event':
      default:
        return 'host';
    }
  };

  // Get the appropriate person object (host, admin, etc.)
  const getPerson = () => {
    switch (type) {
      case 'circle':
        return item.admin || {};
      case 'table':
      case 'event':
      default:
        return host || item.organizer || {};
    }
  };

  // Get participant count
  const getParticipantCount = () => {
    switch (type) {
      case 'circle':
        return memberCount || 0;
      case 'event':
        return attendees || participants || 0;
      case 'table':
      default:
        return participants || 0;
    }
  };

  return (
    <div 
      id={cardElementId}
      className={`${classes.card} bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* Host/Admin Information - At the very top */}
      {getPerson() && Object.keys(getPerson()).length > 0 && (
        <div 
          className="py-3 px-4 bg-gray-50 flex items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
          onClick={handleProfileClick}
        >
          <img 
            src={getPerson().image} 
            alt={getPerson().name} 
            className="w-8 h-8 rounded-full object-cover mr-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/32?text=User'; // Fallback image
            }}
          />
          <div>
            <p className="text-sm font-medium">{getPerson().name}</p>
            <p className="text-xs text-gray-500">{getPersonTitle()} {getPerson().verified && '✓'}</p>
          </div>
        </div>
      )}
      
      <div className="relative">
        {/* Card Image */}
        <img 
          src={image} 
          alt={title} 
          className={`${classes.image} w-full object-cover`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/400x250?text=${type.charAt(0).toUpperCase() + type.slice(1)}`; // Fallback image
          }}
        />
        
        {/* Type badge */}
        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        
        {/* Recommendation badge if applicable */}
        {recommendation && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(recommendation.score * 100)}% Match
          </div>
        )}
      </div>
      
      <div className="p-4">
        {/* Title */}
        <h3 className={`${classes.title} font-bold text-gray-800 mb-2`}>{title}</h3>
        
        {/* Description */}
        <p className={`${classes.description} text-gray-600 mb-3 overflow-hidden`}>
          {description}
        </p>
        
        {/* Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          {/* Date and Time - Only for events */}
          {type === 'event' && date && time && (
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
          {location && (
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
          )}
          
          {/* Rating and Participants */}
          <div className="flex items-center justify-between">
            {rating && (
              <div className="flex items-center">
                <FaStar className="mr-1 text-yellow-500" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            <div className="flex items-center">
              <FaUsers className="mr-1 text-indigo-600" />
              <span>
                {getParticipantCount()}
                {maxParticipants ? ` / ${maxParticipants}` : ''} {getTypeLabel()}
              </span>
            </div>
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
        
        {/* Action Buttons */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handlePrimaryAction}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            {getPrimaryActionText()}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
EventCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string,
    distance: PropTypes.number,
    rating: PropTypes.number,
    participants: PropTypes.number,
    attendees: PropTypes.number,
    memberCount: PropTypes.number,
    maxParticipants: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    host: PropTypes.object,
    date: PropTypes.string,
    time: PropTypes.string,
    recommendation: PropTypes.shape({
      score: PropTypes.number
    })
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  source: PropTypes.string,
  type: PropTypes.oneOf(['event', 'table', 'circle'])
};

export default EventCard;
