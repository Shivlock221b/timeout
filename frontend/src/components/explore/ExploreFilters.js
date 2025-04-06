import React, { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaCheck } from 'react-icons/fa';

// Single Responsibility Principle: This component only handles filtering options
const ExploreFilters = ({ filters, onFilterChange, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Adapt category options based on active tab
  const getCategoryOptions = () => {
    const commonCategories = [{ id: 'all', name: 'All Categories' }];
    
    switch (activeTab) {
      case 'tables':
        return [
          ...commonCategories,
          { id: 'social', name: 'Social' },
          { id: 'educational', name: 'Educational' },
          { id: 'business', name: 'Business' },
          { id: 'hobby', name: 'Hobby' },
        ];
      case 'events':
        return [
          ...commonCategories,
          { id: 'social', name: 'Social' },
          { id: 'business', name: 'Business' },
          { id: 'outdoor', name: 'Outdoor' },
          { id: 'fitness', name: 'Fitness & Health' },
          { id: 'cultural', name: 'Cultural' },
        ];
      case 'circles':
        return [
          ...commonCategories,
          { id: 'social', name: 'Social' },
          { id: 'business', name: 'Business' },
          { id: 'educational', name: 'Educational' },
          { id: 'fitness', name: 'Fitness & Health' },
          { id: 'hobby', name: 'Hobby & Interest' },
        ];
      default:
        return commonCategories;
    }
  };
  
  // Reset category when tab changes
  useEffect(() => {
    onFilterChange({ category: 'all' });
  }, [activeTab, onFilterChange]);
  
  // Get tag options based on active tab
  const getTagOptions = () => {
    const commonTags = ['networking'];
    
    switch (activeTab) {
      case 'tables':
        return [...commonTags, 'coffee', 'books', 'reading', 'casual', 'discussion'];
      case 'events':
        return [...commonTags, 'tech', 'startup', 'hiking', 'outdoors', 'fitness'];
      case 'circles':
        return [...commonTags, 'wellness', 'community', 'entrepreneur', 'fitness'];
      default:
        return commonTags;
    }
  };
  
  const categories = getCategoryOptions();
  const availableTags = getTagOptions();

  // Handle category change
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  // Handle distance change
  const handleDistanceChange = (e) => {
    onFilterChange({ distance: parseInt(e.target.value, 10) });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  // Toggle tag selection
  const toggleTag = (tag) => {
    const updatedTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange({ tags: updatedTags });
  };

  // Reset all filters to default values
  const resetFilters = () => {
    onFilterChange({
      category: 'all',
      distance: 10,
      sortBy: 'relevance',
      tags: []
    });
  };

  // Toggle filters panel on mobile
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Mobile filter toggle */}
      <div className="flex justify-between items-center p-4 border-b md:hidden">
        <h3 className="font-medium">Filters</h3>
        <button
          onClick={toggleFilters}
          className="text-indigo-600 hover:text-indigo-800"
          aria-expanded={isOpen}
          aria-controls="filter-panel"
        >
          <FaFilter className="h-4 w-4" />
        </button>
      </div>
      
      {/* Filter panel - always visible on desktop, toggleable on mobile */}
      <div 
        id="filter-panel"
        className={`p-4 space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}
      >
        {/* Category filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Distance filter */}
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
            Distance (km): {filters.distance}
          </label>
          <input
            id="distance"
            type="range"
            min="1"
            max="50"
            step="1"
            value={filters.distance}
            onChange={handleDistanceChange}
            className="block w-full"
          />
        </div>
        
        {/* Sort by filter */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={handleSortChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="relevance">Relevance</option>
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
            <option value="participants">{activeTab === 'circles' ? 'Most Members' : 'Most Participants'}</option>
          </select>
        </div>
        
        {/* Tags filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.tags.includes(tag)
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {tag}
                {filters.tags.includes(tag) && (
                  <FaCheck className="inline-block ml-1 h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reset filters */}
        <div className="pt-2">
          <button
            onClick={resetFilters}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <FaTimes className="h-3 w-3 mr-1" />
            <span>Reset filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreFilters;
