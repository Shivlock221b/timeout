import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Import the new modular components
import {
  EventDetailLayout,
  EventDetailLoading,
  EventDetailError
} from '../components/EventDetail';

// Import mock data for development - following the mock data separation rule
import { 
  tablesData, 
  eventsData, 
  circlesData 
} from '../data/mockExploreData';
import { personalizedEventsData } from '../data/mockPersonalizedData';

/**
 * EventDetailPage Component
 * 
 * Displays detailed information about a specific event, table, or circle
 * Following Single Responsibility Principle & Composition Over Inheritance:
 * - This component handles data fetching and state management
 * - UI is delegated to specialized child components
 */
const EventDetailPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine if we came from OnlyForYou or Explore page
  const isFromOnlyForYou = location.state?.from === 'onlyforyou';
  
  // Get the card element ID for scroll position restoration
  const cardElementId = location.state?.cardElementId;
  
  // Fetch the item data based on type and id
  useEffect(() => {
    const fetchItemData = async () => {
      setLoading(true);
      try {
        // In a production environment, this would be an API call
        // Example API call (commented out for now, using mock data instead)
        /*
        const response = await axios.get(`/api/${type}/${id}`);
        setItem(response.data);
        */
        
        // Using mock data for development
        let foundItem = null;
        
        // Search in different data sources based on type
        switch (type) {
          case 'tables':
            foundItem = tablesData.find(item => item.id === id);
            break;
          case 'events':
            foundItem = eventsData.find(item => item.id === id);
            // If not found in explore events, check personalized events
            if (!foundItem) {
              foundItem = personalizedEventsData.find(item => item.id === id);
            }
            break;
          case 'circles':
            foundItem = circlesData.find(item => item.id === id);
            break;
          default:
            // If type is not specified, search all data sources
            foundItem = 
              tablesData.find(item => item.id === id) ||
              eventsData.find(item => item.id === id) ||
              circlesData.find(item => item.id === id) ||
              personalizedEventsData.find(item => item.id === id);
        }
        
        // Simulate API delay
        setTimeout(() => {
          if (foundItem) {
            setItem(foundItem);
            setLoading(false);
          } else {
            setError(`Item not found. Please check the URL and try again.`);
            setLoading(false);
          }
        }, 500);
      } catch (error) {
        console.error(`Error fetching ${type} with id ${id}:`, error);
        setError(`Failed to load item details. Please try again later.`);
        setLoading(false);
      }
    };
    
    fetchItemData();
  }, [type, id]);

  // Handle going back to previous page
  const handleGoBack = () => {
    // Navigate back to the appropriate page with scroll position information
    if (isFromOnlyForYou) {
      navigate('/onlyforyou', { 
        state: { 
          scrollToElementId: cardElementId 
        } 
      });
    } else {
      navigate('/explore', { 
        state: { 
          scrollToElementId: cardElementId 
        } 
      });
    }
  };
  
  // Handle RSVP/Join/Apply action
  const handleMainAction = () => {
    // This would typically make an API call to join/RSVP
    console.log(`Action for ${type} with id ${id}`);
    // Show confirmation message
    alert(`You have successfully ${type === 'events' ? 'RSVP\'d' : type === 'tables' ? 'joined' : 'applied to'} this ${type.slice(0, -1)}!`);
  };

  // Loading state
  if (loading) {
    return <EventDetailLoading handleGoBack={handleGoBack} />;
  }

  // Error state
  if (error) {
    return <EventDetailError error={error} handleGoBack={handleGoBack} />;
  }
  
  // No item found
  if (!item) {
    return <EventDetailError error="Item not found. It may have been removed or you may have followed an invalid link." handleGoBack={handleGoBack} />;
  }

  return (
    <EventDetailLayout
      item={item}
      type={type}
      isFromOnlyForYou={isFromOnlyForYou}
      handleGoBack={handleGoBack}
      handleMainAction={handleMainAction}
    />
  );
};

export default EventDetailPage;
