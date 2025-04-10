import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import MessageList from '../../components/messaging/MessageList';
import MessageEmpty from '../../components/messaging/MessageEmpty';
import MessageTagFilter from '../../components/messaging/MessageTagFilter';

// Import mock data - following the mock data separation rule
import { messageThreadsData } from '../../data/mockMessagesData';

/**
 * MessageIndexPage Component
 * 
 * Main page component for displaying user's message threads
 * Following Single Responsibility Principle:
 * - This component handles the state management and data fetching for messages
 * - UI rendering is delegated to child components
 */
const MessageIndexPage = () => {
  const [threads, setThreads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Events'); // Default to Events tag
  const [loading, setLoading] = useState(true);
  
  // Fetch message threads
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        // In a production app, this would be an API call
        // const response = await api.get('/messages/threads');
        // setThreads(response.data);
        
        // Using mock data for development
        setTimeout(() => {
          setThreads(messageThreadsData);
          setLoading(false);
        }, 300); // Simulate API delay
      } catch (error) {
        console.error('Error fetching message threads:', error);
        setLoading(false);
      }
    };
    
    fetchThreads();
  }, []);
  
  // Extract all unique tags from threads and order them as Events, Circle, Private
  const availableTags = useMemo(() => {
    const allTags = threads
      .filter(thread => thread.tags && Array.isArray(thread.tags))
      .flatMap(thread => thread.tags);
    
    const uniqueTags = [...new Set(allTags)];
    
    // Define desired order
    const tagOrder = ['Events', 'Circle', 'Private'];
    
    // Sort tags according to desired order
    return uniqueTags.sort((a, b) => {
      const indexA = tagOrder.indexOf(a);
      const indexB = tagOrder.indexOf(b);
      
      // If both tags are in the order array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // If only a is in the order array, it comes first
      if (indexA !== -1) {
        return -1;
      }
      
      // If only b is in the order array, it comes first
      if (indexB !== -1) {
        return 1;
      }
      
      // If neither tag is in the order array, maintain alphabetical order
      return a.localeCompare(b);
    });
  }, [threads]);
  
  // Handle tag selection
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };
  
  // Clear selected tag
  const handleClearFilter = () => {
    setSelectedTag(null);
  };
  
  // Filter threads based on search term and selected tag
  const filteredThreads = useMemo(() => {
    return threads.filter(thread => {
      // Text search filter
      const matchesSearch = 
        thread.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Tag filter
      const matchesTag = 
        !selectedTag || // If no tag selected, show all
        (thread.tags && thread.tags.includes(selectedTag));
      
      return matchesSearch && matchesTag;
    });
  }, [threads, searchTerm, selectedTag]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden max-w-full">
      <div className="container mx-auto px-4 pb-20 pt-4 md:pt-6 md:pb-6 flex-grow overflow-x-hidden">
        {/* Page Header */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
      
        {/* Search bar */}
        <div className="relative mb-4 bg-white p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Tag filters */}
        {!loading && availableTags.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <MessageTagFilter
              availableTags={availableTags}
              selectedTag={selectedTag}
              onTagSelect={handleTagSelect}
              onClearFilter={handleClearFilter}
            />
          </div>
        )}
      
        {/* Message threads */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-4 space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredThreads.length > 0 ? (
            <MessageList threads={filteredThreads} />
          ) : (
            <MessageEmpty searchTerm={searchTerm} selectedTags={!!selectedTag} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageIndexPage;
