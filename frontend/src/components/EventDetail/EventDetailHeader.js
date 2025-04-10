import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';

/**
 * EventDetailHeader Component
 * 
 * Following the Single Responsibility Principle:
 * This component handles only the header section with back button
 */
const EventDetailHeader = ({ isFromOnlyForYou, handleGoBack }) => {
  return (
    <button
      onClick={handleGoBack}
      className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800 transition"
    >
      <FaArrowLeft className="mr-2" /> Back to {isFromOnlyForYou ? 'Only For You' : 'Explore'}
    </button>
  );
};

EventDetailHeader.propTypes = {
  isFromOnlyForYou: PropTypes.bool.isRequired,
  handleGoBack: PropTypes.func.isRequired
};

export default EventDetailHeader;
