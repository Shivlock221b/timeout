import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Import mock data for development
import { 
  personalizedEventsData, 
  upcomingPersonalizedEventsData,
  generatePersonalizedResults 
} from '../data/mockPersonalizedData';

// Import specialized components
import SearchBar from '../components/onlyforyou/SearchBar';
import CategoryFilter from '../components/onlyforyou/CategoryFilter';
import EventList from '../components/onlyforyou/EventList';
import { FaCalendarAlt } from 'react-icons/fa';

// Import styles
import '../styles/OnlyForYouPage.css';

/**
 * OnlyForYouPage Component
 * 
 * Main page component that displays personalized events for logged-in users
 * Following Single Responsibility Principle:
 * - This component handles layout and data fetching for the OnlyForYou page
 * - Display logic is delegated to specialized components
 */
const OnlyForYouPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [personalizedEvents, setPersonalizedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define categories with icons
  const categories = [
    { id: 'social', name: 'Social', icon: '🎭' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'fitness', name: 'Fitness', icon: '🏋️' },
    { id: 'educational', name: 'Education', icon: '📚' },
    { id: 'food', name: 'Food', icon: '🍲' },
    { id: 'outdoor', name: 'Outdoor', icon: '🌲' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'creative', name: 'Creative', icon: '🎨' }
  ];

  // Fetch personalized events data
  useEffect(() => {
    const fetchPersonalizedEvents = async () => {
      setIsLoading(true);
      try {
        // In a production environment, this would be a real API call
        // Example API call (commented out for now, using mock data instead)
        /*
        const response = await axios.get('/api/events/personalized', {
          params: {
            userId: user.id
          }
        });
        setPersonalizedEvents(response.data.recommendedEvents);
        setUpcomingEvents(response.data.upcomingEvents);
        */
        
        // Using mock data for development
        // Simulate loading delay
        setTimeout(() => {
          setPersonalizedEvents(personalizedEventsData);
          setUpcomingEvents(upcomingPersonalizedEventsData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching personalized events:', error);
        setIsLoading(false);
      }
    };

    fetchPersonalizedEvents();
  }, [user]);

  // Filter events based on search query and active category
  useEffect(() => {
    if (!isLoading) {
      // Filter events based on the current search query and category
      const filtered = generatePersonalizedResults(searchQuery, activeCategory);
      setFilteredEvents(filtered);
    }
  }, [searchQuery, activeCategory, personalizedEvents, upcomingEvents, isLoading]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-2">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Only For You</h1>
            <p className="text-gray-600 mt-2">
              Personalized event recommendations based on your interests and preferences.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search for events, activities, or interests..."
            />
          </div>

          {/* Category Filters - Contained in scrollable wrapper */}
          <div className="overflow-x-auto no-scrollbar mb-6">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Main Content */}
          <div className="space-y-10">
            {/* Filtered Results Section (when searching or filtering) */}
            {(searchQuery || activeCategory !== 'all') && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  {searchQuery ? `Results for "${searchQuery}"` : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Events`}
                </h2>
                <EventList 
                  events={filteredEvents} 
                  loading={isLoading}
                  emptyMessage={`No events found${searchQuery ? ` for "${searchQuery}"` : ''}`}
                />
              </section>
            )}

            {/* Recommended For You Section (when not searching) */}
            {!searchQuery && activeCategory === 'all' && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Recommended For You</h2>
                <EventList 
                  events={personalizedEvents} 
                  loading={isLoading}
                  emptyMessage="No recommended events found for you yet."
                />
              </section>
            )}

            {/* Upcoming Events Section (only show when not searching or filtering) */}
            {!searchQuery && activeCategory === 'all' && (
              <section className="pt-4">
                <div className="flex items-center mb-4">
                  <FaCalendarAlt className="text-indigo-600 mr-2" />
                  <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                </div>
                <EventList 
                  events={upcomingEvents} 
                  loading={isLoading}
                  emptyMessage="No upcoming events to show."
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlyForYouPage;
