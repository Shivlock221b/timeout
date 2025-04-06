import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Single Responsibility Principle: This component only handles search input
const ExploreSearch = ({ query, onSearch }) => {
  const [inputValue, setInputValue] = useState(query);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle key press - search on Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Search activities, events, or interests..."
            className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Search explore"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-label="Submit search"
          >
            <FaSearch className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExploreSearch;
