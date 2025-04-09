import React, { createContext, useContext, useState } from 'react';

/**
 * ScrollToElementContext
 * 
 * A context for tracking element IDs that need to be scrolled to
 * when navigating back to a page. This follows the Single Responsibility 
 * Principle by isolating scroll position management logic.
 */
const ScrollToElementContext = createContext();

export const useScrollToElement = () => useContext(ScrollToElementContext);

export const ScrollToElementProvider = ({ children }) => {
  // Track element IDs that should be scrolled to for each page
  const [scrollTargets, setScrollTargets] = useState({});

  // Set a scroll target for a specific page
  const setScrollTarget = (page, elementId) => {
    setScrollTargets(prev => ({
      ...prev,
      [page]: elementId
    }));
  };

  // Get a scroll target for a specific page
  const getScrollTarget = (page) => {
    return scrollTargets[page];
  };

  // Clear a scroll target for a specific page
  const clearScrollTarget = (page) => {
    setScrollTargets(prev => {
      const newTargets = { ...prev };
      delete newTargets[page];
      return newTargets;
    });
  };

  return (
    <ScrollToElementContext.Provider 
      value={{ 
        setScrollTarget, 
        getScrollTarget, 
        clearScrollTarget 
      }}
    >
      {children}
    </ScrollToElementContext.Provider>
  );
};
