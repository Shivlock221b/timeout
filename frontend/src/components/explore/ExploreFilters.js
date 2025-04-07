import React from 'react';

/**
 * ExploreFilters Component
 * 
 * Following Single Responsibility Principle:
 * - This component only handles filtering functionality
 */
const ExploreFilters = ({ filters, onFilterChange, activeTab }) => {
  // Handle filter changes
  const handleChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  // Get category options based on active tab
  const getCategoryOptions = () => {
    switch (activeTab) {
      case 'tables':
        return [
          { value: 'all', label: 'All Categories' },
          { value: 'social', label: 'Social' },
          { value: 'educational', label: 'Educational' },
          { value: 'business', label: 'Business' }
        ];
      case 'events':
        return [
          { value: 'all', label: 'All Categories' },
          { value: 'social', label: 'Social' },
          { value: 'business', label: 'Business' },
          { value: 'fitness', label: 'Fitness' },
          { value: 'cultural', label: 'Cultural' }
        ];
      case 'circles':
        return [
          { value: 'all', label: 'All Categories' },
          { value: 'social', label: 'Social' },
          { value: 'professional', label: 'Professional' },
          { value: 'hobby', label: 'Hobby' },
          { value: 'educational', label: 'Educational' }
        ];
      default:
        return [{ value: 'all', label: 'All Categories' }];
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          {getCategoryOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Distance (miles)</label>
        <select
          value={filters.distance}
          onChange={(e) => handleChange('distance', Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value={5}>Within 5 miles</option>
          <option value={10}>Within 10 miles</option>
          <option value={25}>Within 25 miles</option>
          <option value={50}>Within 50 miles</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="relevance">Relevance</option>
          <option value="distance">Distance</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default ExploreFilters;
