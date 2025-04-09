import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStar, FaUser, FaTag, FaClock, FaCalendarAlt, FaUsers } from 'react-icons/fa';

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
 * Following Single Responsibility Principle:
 * - This component handles fetching and displaying detailed information for a specific item
 * - The component adapts its display based on the item type (event/table/circle)
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
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800 transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 h-64 w-full rounded-lg"></div>
          <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800 transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // No item found
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800 transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Item Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the requested item. It may have been removed or you may have followed an invalid link.</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get action button text based on type
  const getActionText = () => {
    switch (type) {
      case 'tables':
        return 'Join Table';
      case 'events':
        return 'RSVP to Event';
      case 'circles':
        return 'Join Circle';
      default:
        return 'Join Now';
    }
  };

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to {isFromOnlyForYou ? 'Only For You' : 'Explore'}
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-72 md:h-96 w-full">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/1200x600?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Category Badge */}
          {item.category && (
            <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {item.category}
            </div>
          )}
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {getTypeLabel()}
              </span>
              {item.rating && (
                <div className="flex items-center ml-4">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
          </div>
        </div>
        
        <div className="p-6">
          {/* Host/Organizer Info */}
          {(item.host || item.organizer) && (
            <div className="flex items-center mb-6">
              <img
                src={(item.host || item.organizer).image}
                alt={(item.host || item.organizer).name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/48?text=Host';
                }}
              />
              <div>
                <p className="font-medium">{(item.host || item.organizer).name}</p>
                <p className="text-gray-500 text-sm">
                  {type === 'circles' ? 'Admin' : type === 'tables' ? 'Host' : 'Organizer'}
                  {(item.host || item.organizer).verified && (
                    <span className="ml-1 text-indigo-600">✓</span>
                  )}
                </p>
              </div>
            </div>
          )}
          
          {/* Essential Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
            
            {/* Additional Information Column */}
            <div>
              {/* Recommendation Reason */}
              {item.recommendation && (
                <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-indigo-800 mb-2">Why We Recommend This</h3>
                  <p className="text-indigo-700">{item.recommendation.reason}</p>
                  <div className="mt-2 bg-white rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${item.recommendation.score * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-indigo-600">
                    {Math.round(item.recommendation.score * 100)}% match
                  </p>
                </div>
              )}
              
              {/* Type-specific details */}
              {type === 'tables' && item.topic && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Discussion Topic</h3>
                  <p>{item.topic}</p>
                </div>
              )}
              
              {type === 'circles' && item.memberCount && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Members</h3>
                  <p>{item.memberCount} members</p>
                </div>
              )}
              
              {type === 'events' && item.price !== undefined && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price</h3>
                  <p>{item.price === 0 ? 'Free' : `$${item.price}`}</p>
                </div>
              )}
              
              {/* Join/RSVP Button */}
              <button
                onClick={handleMainAction}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition mt-4"
              >
                {getActionText()}
              </button>
              
              {/* Share buttons would go here in a real app */}
              <div className="mt-4 text-center text-gray-500 text-sm">
                Share this {getTypeLabel().toLowerCase()} with friends
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
