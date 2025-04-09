import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { 
  CardContainer, 
  CardImageSection, 
  CardContentSection,
  CardHeader,
  TagsList,
  PersonInfo,
  CardActions
} from './CardStyles';

/**
 * EventCard component - Displays an event card
 * Following Single Responsibility Principle - This component only handles event card display
 */
const EventCard = ({ item }) => {
  const navigate = useNavigate();

  const handleRSVP = () => {
    // Will be implemented with actual functionality
    console.log('RSVP to event:', item.id);
  };

  const handleViewDetails = () => {
    // Navigate to event detail page
    navigate(`/events/${item.id}`, { state: { from: 'explore' } });
  };

  // Make sure we have all required fields from the data
  if (!item) return null;

  return (
    <CardContainer>
      <CardImageSection 
        image={item.image} 
        type={item.type} 
        onClick={handleViewDetails}
      />
      
      <CardContentSection>
        <div className="flex-grow">
          <CardHeader 
            title={item.title} 
            rating={item.rating} 
            onClick={handleViewDetails}
          />
          
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
          
          <div className="flex flex-wrap mb-4 gap-4">
            {item.date && (
              <div className="flex items-center">
                <FaCalendarAlt className="h-4 w-4 text-indigo-500 mr-2" />
                <span className="text-sm">{item.date}</span>
              </div>
            )}
            {item.time && (
              <div className="flex items-center">
                <FaClock className="h-4 w-4 text-indigo-500 mr-2" />
                <span className="text-sm">{item.time}</span>
              </div>
            )}
          </div>
          
          <TagsList tags={item.tags} />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center">
              <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
              <span className="ml-1 text-sm text-gray-600">{item.location}</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="h-4 w-4 text-gray-500" />
              <span className="ml-1 text-sm text-gray-600">{item.participants || item.attendees || 0} attending</span>
            </div>
          </div>
          
          <PersonInfo 
            person={item.host || item.organizer || {}} 
            title="host" 
          />
        </div>
        
        <CardActions 
          primaryText="RSVP"
          secondaryText="View Details"
          onPrimaryClick={handleRSVP}
          onSecondaryClick={handleViewDetails}
        />
      </CardContentSection>
    </CardContainer>
  );
};

export default EventCard;
