import React from 'react';
import PropTypes from 'prop-types';

/**
 * CategoryFilter Component
 * 
 * Displays a horizontal scrollable list of category filters
 * Following Single Responsibility Principle - this component only handles category filtering UI
 */
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  // Categories should always include 'all' as the first option
  const allCategories = [
    { id: 'all', name: 'All', icon: '🔍' },
    ...(categories || [])
  ];

  return (
    <div className="flex space-x-2 min-w-max pb-1">
      {allCategories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap
            ${activeCategory === category.id 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          {category.icon && (
            <span className="mr-2">{category.icon}</span>
          )}
          {category.name}
        </button>
      ))}
    </div>
  );
};

// PropTypes for type checking
CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string
    })
  ),
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

// Default props
CategoryFilter.defaultProps = {
  categories: [
    { id: 'social', name: 'Social', icon: '🎭' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'fitness', name: 'Fitness', icon: '🏋️' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'food', name: 'Food', icon: '🍲' },
    { id: 'outdoor', name: 'Outdoor', icon: '🌲' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'tech', name: 'Tech', icon: '💻' }
  ]
};

export default CategoryFilter;
