import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes } from 'react-icons/fa';

/**
 * SearchBar Component
 * 
 * Provides a search interface for the OnlyForYou page
 * Following Single Responsibility Principle - this component only handles search functionality
 */
const SearchBar = ({ onSearch, placeholder = "Search events..." }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-center w-full"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      
      {query ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      ) : null}
      
      <button
        type="submit"
        className="absolute right-3 text-gray-500 hover:text-indigo-600 p-1"
        aria-label="Search"
      >
        <FaSearch className="text-xl" />
      </button>
    </form>
  );
};

// PropTypes for type checking
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchBar;
