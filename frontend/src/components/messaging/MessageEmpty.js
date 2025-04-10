import React from 'react';
import PropTypes from 'prop-types';
import { FaInbox, FaSearch, FaTags } from 'react-icons/fa';

/**
 * MessageEmpty Component
 * 
 * Following Single Responsibility Principle:
 * - This component is only responsible for displaying an empty state
 * - It adapts its content based on whether there's a search term, tag filters, or just empty
 */
const MessageEmpty = ({ searchTerm, selectedTags }) => {
  // Determine which empty state to show based on filters
  const hasSearchTerm = searchTerm && searchTerm.trim() !== '';
  const hasTagFilters = selectedTags === true;

  if (hasSearchTerm && hasTagFilters) {
    // Both search term and tag filters applied
    return (
      <div className="text-center py-16">
        <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No matching results</h3>
        <p className="text-gray-500">
          We couldn't find any messages matching "{searchTerm}" with the selected tags
        </p>
      </div>
    );
  } else if (hasSearchTerm) {
    // Only search term applied
    return (
      <div className="text-center py-16">
        <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500">
          We couldn't find any messages matching "{searchTerm}"
        </p>
      </div>
    );
  } else if (hasTagFilters) {
    // Only tag filters applied
    return (
      <div className="text-center py-16">
        <FaTags className="mx-auto text-gray-400 text-4xl mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No messages with selected tags</h3>
        <p className="text-gray-500">
          Try selecting different tags or clear the filters
        </p>
      </div>
    );
  } else {
    // No messages at all
    return (
      <div className="text-center py-16">
        <FaInbox className="mx-auto text-gray-400 text-4xl mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
        <p className="text-gray-500">
          When you connect with others, your conversations will appear here
        </p>
      </div>
    );
  }
};

MessageEmpty.propTypes = {
  searchTerm: PropTypes.string,
  selectedTags: PropTypes.bool
};

MessageEmpty.defaultProps = {
  searchTerm: '',
  selectedTags: false
};

export default MessageEmpty;
