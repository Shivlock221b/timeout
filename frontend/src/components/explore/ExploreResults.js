import React from 'react';
import { FaStar, FaMapMarkerAlt, FaUsers, FaCheck, FaCalendarAlt, FaClock } from 'react-icons/fa';

// Single Responsibility Principle: This component only handles displaying the results list
const ExploreResults = ({ results, loading, activeTab }) => {
  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-pulse flex flex-col space-y-4 w-full">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-200 h-48 rounded-lg w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  // Render appropriate result card based on the active tab
  return (
    <div className="space-y-6">
      {results.map((item) => {
        switch (activeTab) {
          case 'tables':
            return <TableResultCard key={item.id} item={item} />;
          case 'events':
            return <EventResultCard key={item.id} item={item} />;
          case 'circles':
            return <CircleResultCard key={item.id} item={item} />;
          default:
            return <TableResultCard key={item.id} item={item} />;
        }
      })}
    </div>
  );
};

// Single Responsibility Principle: This component only handles displaying a table result card
const TableResultCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image container */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
            {item.type}
          </div>
        </div>
        
        {/* Content container */}
        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <div className="flex items-center text-yellow-500">
                <FaStar className="h-4 w-4" />
                <span className="ml-1 text-sm font-medium">{item.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags && item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center">
                <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
                <span className="ml-1 text-sm text-gray-600">{item.location}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="h-4 w-4 text-gray-500" />
                <span className="ml-1 text-sm text-gray-600">{item.participants} participants</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <img
                src={item.host.image}
                alt={item.host.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm font-medium">{item.host.name}</span>
              {item.host.verified && (
                <FaCheck className="ml-1 h-3 w-3 text-green-500" title="Verified host" />
              )}
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Join
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Responsibility Principle: This component only handles displaying an event result card
const EventResultCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image container */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
            {item.type}
          </div>
        </div>
        
        {/* Content container */}
        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <div className="flex items-center text-yellow-500">
                <FaStar className="h-4 w-4" />
                <span className="ml-1 text-sm font-medium">{item.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
            
            <div className="flex flex-wrap mb-4 gap-4">
              {item.date && (
                <div className="flex items-center">
                  <FaCalendarAlt className="h-4 w-4 text-indigo-500 mr-2" />
                  <span className="text-sm">{item.date}</span>
                </div>
              )}
              {item.time && (
                <div className="flex items-center">
                  <FaClock className="h-4 w-4 text-indigo-500 mr-2" />
                  <span className="text-sm">{item.time}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags && item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center">
                <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
                <span className="ml-1 text-sm text-gray-600">{item.location}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="h-4 w-4 text-gray-500" />
                <span className="ml-1 text-sm text-gray-600">{item.participants} attending</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <img
                src={item.host.image}
                alt={item.host.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm font-medium">{item.host.name}</span>
              {item.host.verified && (
                <FaCheck className="ml-1 h-3 w-3 text-green-500" title="Verified host" />
              )}
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              RSVP
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Responsibility Principle: This component only handles displaying a circle result card
const CircleResultCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image container */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img
            src={item.image || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
            {item.type || "Group"}
          </div>
          {item.activity && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              <span className="font-medium">{item.activity}</span>
            </div>
          )}
        </div>
        
        {/* Content container */}
        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              {item.rating && (
                <div className="flex items-center text-yellow-500">
                  <FaStar className="h-4 w-4" />
                  <span className="ml-1 text-sm font-medium">{item.rating}</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags && item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center">
                <FaUsers className="h-4 w-4 text-gray-500" />
                <span className="ml-1 text-sm text-gray-600">{item.memberCount || 0} members</span>
              </div>
            </div>
            
            {item.admin && (
              <div className="flex items-center">
                <img
                  src={item.admin.image || "https://via.placeholder.com/40?text=Admin"}
                  alt={item.admin.name || "Admin"}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm font-medium">{item.admin.name || "Admin"}</span>
                {item.admin.verified && (
                  <FaCheck className="ml-1 h-3 w-3 text-green-500" title="Verified admin" />
                )}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Join Circle
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreResults;
