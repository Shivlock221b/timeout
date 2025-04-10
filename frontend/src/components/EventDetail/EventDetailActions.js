import React from 'react';
import PropTypes from 'prop-types';

/**
 * EventDetailActions Component
 * 
 * Following the Single Responsibility Principle:
 * This component handles the action buttons and recommendation information
 */
const EventDetailActions = ({ item, type, handleMainAction }) => {
  // Determine the appropriate content label based on type
  const getTypeLabel = () => {
    switch (type) {
      case 'tables':
        return 'Table';
      case 'events':
        return 'Event';
      case 'circles':
        return 'Circle';
      default:
        return 'Item';
    }
  };

  return (
    <div>
      {/* Recommendation Reason */}
      {item.recommendation && (
        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-indigo-800 mb-2">Why We Recommend This</h3>
          <p className="text-indigo-700">{item.recommendation.reason}</p>
          <div className="mt-2 bg-white rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${item.recommendation.score * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-right mt-1 text-indigo-600">
            {Math.round(item.recommendation.score * 100)}% match
          </p>
        </div>
      )}
      
      {/* Type-specific details */}
      {type === 'tables' && item.topic && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Discussion Topic</h3>
          <p>{item.topic}</p>
        </div>
      )}
      
      {type === 'circles' && item.memberCount && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Members</h3>
          <p>{item.memberCount} members</p>
        </div>
      )}
      
      {type === 'events' && item.price !== undefined && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Price</h3>
          <p>{item.price === 0 ? 'Free' : `$${item.price}`}</p>
        </div>
      )}
      
      {/* Action Button */}
      <button
        onClick={handleMainAction}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition mt-4"
      >
        Request to Join
      </button>
      
      {/* Share buttons would go here in a real app */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        Share this {getTypeLabel().toLowerCase()} with friends
      </div>
    </div>
  );
};

EventDetailActions.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  handleMainAction: PropTypes.func.isRequired
};

export default EventDetailActions;
