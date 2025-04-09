import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * TagFilter Component
 * 
 * Following Single Responsibility Principle:
 * - This component handles only tag filtering functionality
 * - It provides a visually appealing UI with rounded borders
 * - Allows selection of multiple tags for filtering content
 */
const TagFilter = ({ onTagSelect, selectedTags = [] }) => {
  // Popular tags used for filtering
  const availableTags = [
    'Music', 'Sports', 'Food', 'Art', 'Tech', 
    'Outdoors', 'Fitness', 'Business', 'Education', 
    'Social', 'Travel', 'Gaming', 'Networking'
  ];

  // Handle tag selection/deselection
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      // If tag is already selected, remove it
      onTagSelect(selectedTags.filter(t => t !== tag));
    } else {
      // If tag is not selected, add it
      onTagSelect([...selectedTags, tag]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Filter by Tags</h3>
      <div className="flex flex-wrap gap-2">
        {availableTags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200
              ${selectedTags.includes(tag) 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="mt-3 flex items-center">
          <span className="text-sm text-gray-500 mr-2">
            {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
          </span>
          <button 
            onClick={() => onTagSelect([])}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

TagFilter.propTypes = {
  onTagSelect: PropTypes.func.isRequired,
  selectedTags: PropTypes.array
};

export default TagFilter;
