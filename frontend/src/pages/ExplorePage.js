import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  tablesData, 
  eventsData, 
  circlesData 
} from '../data/mockExploreData';

// Import our separate components
import ExploreSearch from '../components/explore/ExploreSearch';
import ExploreFilters from '../components/explore/ExploreFilters';
import ExploreResults from '../components/explore/ExploreResults';
import CategoryFilter from '../components/onlyforyou/CategoryFilter';

// Import styles
import '../styles/ExplorePage.css';

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
  const [startX, setStartX] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Define categories with icons based on the active tab
  const getCategories = () => {
    switch (activeTab) {
      case 'tables':
        return [
          { id: 'social', name: 'Social', icon: '🎭' },
          { id: 'business', name: 'Business', icon: '💼' },
          { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
          { id: 'cafe', name: 'Cafe', icon: '☕' },
          { id: 'outdoors', name: 'Outdoors', icon: '🌳' }
        ];
      case 'events':
        return [
          { id: 'party', name: 'Party', icon: '🎉' },
          { id: 'workshop', name: 'Workshop', icon: '🔨' },
          { id: 'concert', name: 'Concert', icon: '🎵' },
          { id: 'conference', name: 'Conference', icon: '🎤' },
          { id: 'sports', name: 'Sports', icon: '⚽' }
        ];
      case 'circles':
        return [
          { id: 'hobby', name: 'Hobby', icon: '🎨' },
          { id: 'professional', name: 'Professional', icon: '💼' },
          { id: 'support', name: 'Support', icon: '🤝' },
          { id: 'interest', name: 'Interest', icon: '🔍' },
          { id: 'local', name: 'Local', icon: '📍' }
        ];
      default:
        return [];
    }
  };
  
  // Filters state
  const [filters, setFilters] = useState({
    category: 'all',
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
          
          // Apply category filter from the CategoryFilter component
          if (activeCategory !== 'all') {
            data = data.filter(item => 
              item.category && item.category.toLowerCase() === activeCategory.toLowerCase()
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
  }, [activeTab, searchQuery, filters, activeCategory]);
  
  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset filters when tab changes
    setActiveCategory('all');
    setFilters(prev => ({
      ...prev,
      category: 'all'
    }));
  };

  // Handle category change from CategoryFilter
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore</h1>
        <p className="text-gray-600">Discover people, events, and activities near you</p>
      </div>
      
      {/* Tab navigation */}
      <div className="mb-6 tabs-container no-scrollbar">
        <nav className="flex justify-center sm:justify-start min-w-max mx-auto border-b border-gray-200">
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
      
      {/* Category filters from OnlyForYouPage - only this section scrolls horizontally */}
      <div className="category-scroll-container mb-6 no-scrollbar">
        <CategoryFilter
          categories={getCategories()}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      
      {/* Search and additional filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <ExploreSearch 
            query={searchQuery} 
            onSearch={handleSearch} 
          />
        </div>
        
        <div className="md:col-span-1">
          <ExploreFilters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            activeTab={activeTab} 
          />
        </div>
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
