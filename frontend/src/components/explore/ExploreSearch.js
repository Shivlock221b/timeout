import React from 'react';

/**
 * ExploreSearch Component
 * 
 * Following Single Responsibility Principle:
 * - This component only handles the search functionality
 */
const ExploreSearch = ({ query, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.search.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search tables, events, or circles..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue={query}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bg-indigo-600 text-white p-1 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ExploreSearch;
