import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollToElement } from '../context/ScrollToElementContext';
import { 
  tablesData, 
  eventsData, 
  circlesData 
} from '../data/mockExploreData';

// Import our separate components
import ExploreSearch from '../components/explore/ExploreSearch';
import ExploreResults from '../components/explore/ExploreResults';
import TagFilter from '../components/explore/TagFilter';

/**
 * ExplorePage Component
 * 
 * Following Single Responsibility Principle:
 * - This component handles the layout and state management for Explore page
 * - Data fetching logic is kept in this page component
 * - Display logic is delegated to specialized components
 */
const ExplorePage = () => {
  const location = useLocation();
  const { getScrollTarget, clearScrollTarget } = useScrollToElement();
  const pageRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  // Fetch data whenever search, tags, or filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        // Simulate API delay
        setTimeout(() => {
          // Combine all data types into one array
          let data = [
            ...tablesData.map(item => ({ ...item, type: 'table' })),
            ...eventsData.map(item => ({ ...item, type: 'event' })),
            ...circlesData.map(item => ({ ...item, type: 'circle' }))
          ];
          
          // Apply search filter if query exists
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            data = data.filter(item => 
              (item.title && item.title.toLowerCase().includes(query)) ||
              (item.description && item.description.toLowerCase().includes(query))
            );
          }
          
          // Filter by selected tags if any are selected
          if (selectedTags.length > 0) {
            data = data.filter(item => {
              if (!item.tags || !Array.isArray(item.tags)) return false;
              // Check if any of the item's tags match the selected tags
              return item.tags.some(tag => selectedTags.includes(tag));
            });
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
  }, [searchQuery, selectedTags]);

  // Handle scroll position restoration
  useEffect(() => {
    // Check if we need to scroll to a specific element
    const scrollToElementId = location.state?.scrollToElementId;
    
    if (scrollToElementId) {
      // Wait for the DOM to be fully rendered and data to be loaded
      const timer = setTimeout(() => {
        const elementToScrollTo = document.getElementById(scrollToElementId);
        if (elementToScrollTo) {
          elementToScrollTo.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          // Add a highlight effect to make it easier to identify the element
          elementToScrollTo.classList.add('bg-indigo-50');
          setTimeout(() => {
            elementToScrollTo.classList.remove('bg-indigo-50');
          }, 1500);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      // Check if we have a saved scroll target for this page
      const savedElementId = getScrollTarget('explore');
      if (savedElementId && !isLoading) {
        // Wait for the DOM to be fully rendered
        const timer = setTimeout(() => {
          const elementToScrollTo = document.getElementById(savedElementId);
          if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
            
            // Clear the scroll target after using it
            clearScrollTarget('explore');
            
            // Add a highlight effect
            elementToScrollTo.classList.add('bg-indigo-50');
            setTimeout(() => {
              elementToScrollTo.classList.remove('bg-indigo-50');
            }, 1500);
          }
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }
  }, [location, isLoading, results, getScrollTarget, clearScrollTarget]);
  
  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // Handle tag selection
  const handleTagSelect = (tags) => {
    setSelectedTags(tags);
  };

  return (
    <div className="container mx-auto px-4 py-8 overflow-x-hidden max-w-full" ref={pageRef}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore</h1>
        <p className="text-gray-600">Discover people, events, and activities near you</p>
      </div>
      
      {/* Search section */}
      <div className="mb-4">
        <ExploreSearch 
          query={searchQuery} 
          onSearch={handleSearch} 
        />
      </div>
      
      {/* Tag filter section */}
      <div className="mb-6">
        <TagFilter 
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      </div>
      
      {/* Results section */}
      <div className="mt-8">
        <ExploreResults 
          results={results} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ExplorePage;
