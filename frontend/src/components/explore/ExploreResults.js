import React from 'react';
import { TableCard, EventCard, CircleCard } from './cards';

/**
 * ExploreResults Component
 * 
 * Following Single Responsibility Principle:
 * - This component only handles displaying the results list
 * - It chooses which card type to render based on the active tab
 */
const ExploreResults = ({ results, isLoading, activeTab }) => {
  // Render loading skeleton
  const renderSkeleton = () => (
    <div className="animate-pulse space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-200 h-48 rounded-lg w-full"></div>
      ))}
    </div>
  );
  
  // Handle loading state
  if (isLoading) {
    return renderSkeleton();
  }
  
  // Handle empty results
  if (!results || !Array.isArray(results) || results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  // Render results
  return (
    <div className="space-y-6">
      {results.map(item => {
        // Make sure the item is valid
        if (!item || !item.id) {
          console.warn('Invalid item in results', item);
          return null;
        }
        
        // Render appropriate card based on tab
        switch (activeTab) {
          case 'tables':
            return <TableCard key={item.id} item={item} />;
          case 'events':
            return <EventCard key={item.id} item={item} />;
          case 'circles':
            return <CircleCard key={item.id} item={item} />;
          default:
            return <TableCard key={item.id} item={item} />;
        }
      })}
    </div>
  );
};

export default ExploreResults;
