import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  tablesData, 
  eventsData, 
  circlesData 
} from '../data/mockExploreData';

// Import our separate components
import ExploreSearch from '../components/explore/ExploreSearch';
import ExploreResults from '../components/explore/ExploreResults';

/**
 * ExplorePage Component
 * 
 * Following Single Responsibility Principle:
 * - This component handles the layout and state management for Explore page
 * - Data fetching logic is kept in this page component
 * - Display logic is delegated to specialized components
 */
const ExplorePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tables');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  
  const [filters, setFilters] = useState({
    distance: 10,
    sortBy: 'relevance'
  });

  // Fetch data whenever tab, search, or filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        // Simulate API delay
        setTimeout(() => {
          let data;
          
          // Select data based on active tab
          switch (activeTab) {
            case 'tables':
              data = [...tablesData];
              break;
            case 'events':
              data = [...eventsData];
              break;
            case 'circles':
              data = [...circlesData];
              break;
            default:
              data = [...tablesData];
          }
          
          // Apply search filter if query exists
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            data = data.filter(item => 
              (item.title && item.title.toLowerCase().includes(query)) ||
              (item.description && item.description.toLowerCase().includes(query))
            );
          }
          
          // Apply distance filter
          if (filters.distance) {
            data = data.filter(item => 
              item.distance && item.distance <= filters.distance
            );
          }
          
          // Apply sorting
          if (filters.sortBy === 'distance') {
            data.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          } else if (filters.sortBy === 'rating') {
            data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          }
          
          setResults(data);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResults([]);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab, searchQuery, filters]);
  
  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8 overflow-x-hidden max-w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore</h1>
        <p className="text-gray-600">Discover people, events, and activities near you</p>
      </div>
      
      {/* Tab navigation */}
      <div className="mb-6">
        <nav className="flex justify-center sm:justify-start border-b border-gray-200 flex-wrap">
          <button
            onClick={() => handleTabChange('tables')}
            className={`relative py-4 px-8 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === 'tables'
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="relative z-10">Tables</span>
            {activeTab === 'tables' && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-indigo-600 shadow-[0_1px_3px_rgba(79,70,229,0.45)]"></span>
            )}
          </button>
          <button
            onClick={() => handleTabChange('events')}
            className={`relative py-4 px-8 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === 'events'
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="relative z-10">Events</span>
            {activeTab === 'events' && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-indigo-600 shadow-[0_1px_3px_rgba(79,70,229,0.45)]"></span>
            )}
          </button>
          <button
            onClick={() => handleTabChange('circles')}
            className={`relative py-4 px-8 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === 'circles'
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="relative z-10">Circles</span>
            {activeTab === 'circles' && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-indigo-600 shadow-[0_1px_3px_rgba(79,70,229,0.45)]"></span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Search section */}
      <div className="mb-8">
        <ExploreSearch 
          query={searchQuery} 
          onSearch={handleSearch} 
        />
      </div>
      
      {/* Results section */}
      <div className="mt-8">
        <ExploreResults 
          results={results} 
          isLoading={isLoading} 
          activeTab={activeTab} 
        />
      </div>
    </div>
  );
};

export default ExplorePage;
