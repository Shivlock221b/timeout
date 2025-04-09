import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStar, FaCalendarAlt, FaUser } from 'react-icons/fa';

/**
 * UserProfilePage Component
 * 
 * Single Responsibility: Display user profile information and provide navigation
 * This component handles:
 * 1. Fetching and displaying user profile data
 * 2. Providing a back button to return to previous page (event, table, or circle)
 */
const UserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get navigation state from location
  const { from, returnTo, itemTitle } = location.state || {};
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to the user service
        // For development, simulate API delay and response
        setTimeout(() => {
          // Mock data - would be replaced with actual API fetch
          const mockUserData = {
            id,
            name: 'Alex Johnson',
            profileImage: 'https://via.placeholder.com/150',
            location: 'Mumbai, India',
            bio: 'Event host and community enthusiast who loves bringing people together for memorable experiences.',
            rating: 4.8,
            joined: '2023',
            eventsHosted: 18,
            interests: ['Music', 'Food', 'Technology', 'Art', 'Outdoor'],
            verified: true
          };
          
          setUserData(mockUserData);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [id]);
  
  // Handle back button click
  const handleBack = () => {
    if (returnTo) {
      navigate(returnTo, { state: { from } });
    } else {
      // Default fallback if no return path is specified
      navigate(-1);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-8">
          <div className="bg-gray-200 h-8 w-24 rounded"></div>
          <div className="flex space-x-4">
            <div className="bg-gray-200 h-32 w-32 rounded-full"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !userData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {error || 'User profile not found'}
          </h3>
          <p className="text-gray-500">
            We couldn't load this profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button with Context */}
      <button
        onClick={handleBack}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 group"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
        <span>
          {itemTitle ? `Back to ${itemTitle}` : 'Back'}
        </span>
      </button>
      
      {/* User Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="md:mr-8 mb-4 md:mb-0 flex-shrink-0">
              <div className="relative">
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=User';
                  }}
                />
                {userData.verified && (
                  <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full">
                    <FaUser className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                  {userData.name}
                  {userData.verified && <span className="ml-2 text-indigo-600">✓</span>}
                </h1>
                
                <div className="flex items-center space-x-4">
                  {userData.rating && (
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="font-medium">{userData.rating}</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    Member since {userData.joined}
                  </div>
                </div>
              </div>
              
              {userData.location && (
                <div className="flex items-center mb-3 text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                  <span>{userData.location}</span>
                </div>
              )}
              
              <p className="text-gray-600 mb-4">{userData.bio}</p>
              
              {userData.interests && userData.interests.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {userData.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* User Stats */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-2xl text-indigo-600">{userData.eventsHosted || 0}</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-2xl text-indigo-600">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-2xl text-indigo-600">92%</div>
              <div className="text-gray-600">Response Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Events Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          
          {/* This would be populated with actual events in a real implementation */}
          <div className="text-center py-8 text-gray-500">
            <FaCalendarAlt className="mx-auto text-gray-300 text-4xl mb-3" />
            <p>No recent events to display</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
