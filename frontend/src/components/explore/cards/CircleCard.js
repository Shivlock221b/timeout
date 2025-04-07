import React from 'react';
import { FaUsers } from 'react-icons/fa';
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
 * CircleCard component - Displays a circle/group card
 * Following Single Responsibility Principle - This component only handles circle card display
 */
const CircleCard = ({ item }) => {
  const handleJoin = () => {
    // Will be implemented with actual functionality
    console.log('Join circle:', item.id);
  };

  const handleViewDetails = () => {
    // Will be implemented with actual functionality
    console.log('View circle details:', item.id);
  };
  
  // Make sure we have all required fields from the data
  if (!item) return null;
  
  return (
    <CardContainer>
      <CardImageSection 
        image={item.image} 
        type={item.type || "Group"} 
        activity={item.activity}
      />
      
      <CardContentSection>
        <div className="flex-grow">
          <CardHeader 
            title={item.title} 
            rating={item.rating} 
          />
          
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
          
          <TagsList tags={item.tags} />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center">
              <FaUsers className="h-4 w-4 text-gray-500" />
              <span className="ml-1 text-sm text-gray-600">{item.memberCount || item.members || 0} members</span>
            </div>
          </div>
          
          {item.admin && (
            <PersonInfo 
              person={item.admin} 
              title="admin" 
            />
          )}
        </div>
        
        <CardActions 
          primaryText="Join Circle"
          secondaryText="View Details"
          onPrimaryClick={handleJoin}
          onSecondaryClick={handleViewDetails}
        />
      </CardContentSection>
    </CardContainer>
  );
};

export default CircleCard;
