import React, { useState, useEffect } from 'react';
import ExploreSearch from '../components/explore/ExploreSearch';
import ExploreFilters from '../components/explore/ExploreFilters';
import ExploreResults from '../components/explore/ExploreResults';
import { useAuth } from '../context/AuthContext';

// Following Single Responsibility Principle - ExplorePage only handles the layout and state coordination
const ExplorePage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    distance: 10,
    sortBy: 'relevance',
    tags: []
  });
  const [activeTab, setActiveTab] = useState('tables'); // 'tables', 'events', or 'circles'
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch explore data based on search, filters, and active tab
  useEffect(() => {
    const fetchExploreData = async () => {
      setLoading(true);
      try {
        // This would be replaced with an actual API call
        // Example API endpoint: /api/discovery/explore?tab=${activeTab}&query=${searchQuery}&filters=${JSON.stringify(filters)}
        
        // Simulating API call with mock data for now
        setTimeout(() => {
          const mockResults = generateMockResults(activeTab, searchQuery, filters);
          setResults(mockResults);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching explore data:', error);
        setLoading(false);
      }
    };

    fetchExploreData();
  }, [activeTab, searchQuery, filters]);

  // Generate mock results based on active tab, search, and filters
  const generateMockResults = (tab, query, appliedFilters) => {
    // Mock data that would come from the Discovery microservice
    const tablesData = [
      {
        id: '1',
        title: 'Coffee Chat at Starbucks',
        type: 'social',
        category: 'social',
        description: 'Join us for a casual coffee chat to discuss tech trends and networking opportunities.',
        location: 'Starbucks Downtown',
        distance: 2.3,
        rating: 4.7,
        participants: 8,
        tags: ['coffee', 'networking', 'casual'],
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        host: {
          id: '101',
          name: 'Alex Johnson',
          image: 'https://randomuser.me/api/portraits/women/12.jpg',
          verified: true
        }
      },
      {
        id: '2',
        title: 'Book Club Meetup',
        type: 'club',
        category: 'educational',
        description: 'Monthly book club discussing the latest bestsellers and literary classics.',
        location: 'City Library',
        distance: 1.5,
        rating: 4.9,
        participants: 12,
        tags: ['books', 'reading', 'discussion'],
        image: 'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        host: {
          id: '102',
          name: 'Sarah Williams',
          image: 'https://randomuser.me/api/portraits/women/32.jpg',
          verified: true
        }
      }
    ];
    
    const eventsData = [
      {
        id: '3',
        title: 'Weekend Hiking Trip',
        type: 'activity',
        category: 'outdoor',
        description: 'Weekend hiking trips to nearby trails and mountains. All skill levels welcome!',
        location: 'Mountain View Park',
        distance: 5.8,
        rating: 4.5,
        participants: 25,
        tags: ['hiking', 'outdoors', 'fitness'],
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        host: {
          id: '103',
          name: 'Mike Thompson',
          image: 'https://randomuser.me/api/portraits/men/45.jpg',
          verified: false
        }
      },
      {
        id: '4',
        title: 'Tech Startup Showcase',
        type: 'professional',
        category: 'business',
        description: 'Connect with startup founders, investors, and tech professionals in your area.',
        location: 'Innovation Hub',
        date: '2025-04-15',
        time: '18:00',
        distance: 3.2,
        rating: 4.8,
        participants: 40,
        tags: ['tech', 'startup', 'networking', 'business'],
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        host: {
          id: '104',
          name: 'Daniel Brooks',
          image: 'https://randomuser.me/api/portraits/men/22.jpg',
          verified: true
        }
      }
    ];
    
    const circlesData = [
      {
        id: '5',
        title: 'Local Fitness Group',
        type: 'group',
        category: 'fitness',
        description: 'Group for fitness enthusiasts of all levels. We organize regular workouts and wellness events.',
        memberCount: 124,
        distance: 1.0,
        rating: 4.6,
        activity: 'Very Active',
        tags: ['fitness', 'wellness', 'community'],
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        admin: {
          id: '105',
          name: 'Emily Parker',
          image: 'https://randomuser.me/api/portraits/women/45.jpg',
          verified: true
        }
      },
      {
        id: '6',
        title: 'Startup Founders Circle',
        type: 'group',
        category: 'business',
        description: 'A community of startup founders, entrepreneurs and innovators sharing experiences and opportunities.',
        memberCount: 86,
        distance: 4.2,
        rating: 4.8,
        activity: 'Active',
        tags: ['startup', 'entrepreneur', 'business', 'networking'],
        image: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        admin: {
          id: '106',
          name: 'Robert Chen',
          image: 'https://randomuser.me/api/portraits/men/34.jpg',
          verified: true
        }
      },
      {
        id: '7',
        title: 'Photography Enthusiasts',
        type: 'group',
        category: 'hobby',
        description: 'Share your photography skills, join photo walks, and participate in monthly photo challenges.',
        memberCount: 152,
        distance: 2.3,
        rating: 4.7,
        activity: 'Active',
        tags: ['photography', 'hobby', 'community'],
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        admin: {
          id: '107',
          name: 'Jessica Wong',
          image: 'https://randomuser.me/api/portraits/women/63.jpg',
          verified: true
        }
      },
      {
        id: '8',
        title: 'Tech Mentors Network',
        type: 'group',
        category: 'educational',
        description: 'Connect with tech professionals for mentorship, career advice, and knowledge sharing.',
        memberCount: 98,
        distance: 5.1,
        rating: 4.9,
        activity: 'Moderately Active',
        tags: ['tech', 'mentorship', 'networking', 'educational'],
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        admin: {
          id: '108',
          name: 'Marcus Green',
          image: 'https://randomuser.me/api/portraits/men/53.jpg',
          verified: true
        }
      },
      {
        id: '9',
        title: 'Sustainability Advocates',
        type: 'group',
        category: 'social',
        description: 'Community focused on sustainable living, environmental projects, and eco-friendly initiatives.',
        memberCount: 175,
        distance: 3.8,
        rating: 4.5,
        activity: 'Very Active',
        tags: ['sustainability', 'environment', 'community'],
        image: 'https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        admin: {
          id: '109',
          name: 'Laura Sanchez',
          image: 'https://randomuser.me/api/portraits/women/87.jpg',
          verified: false
        }
      }
    ];
    
    // Select the appropriate data based on the active tab
    let baseResults = [];
    switch (tab) {
      case 'tables':
        baseResults = tablesData;
        break;
      case 'events':
        baseResults = eventsData;
        break;
      case 'circles':
        baseResults = circlesData;
        break;
      default:
        baseResults = [...tablesData, ...eventsData, ...circlesData];
    }

    // Filter the results based on search query
    let filteredResults = baseResults;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredResults = filteredResults.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.description.toLowerCase().includes(lowerQuery) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    }

    // Apply category filter
    if (appliedFilters.category !== 'all') {
      filteredResults = filteredResults.filter(item => 
        item.category === appliedFilters.category
      );
    }

    // Apply distance filter
    filteredResults = filteredResults.filter(item => 
      item.distance <= appliedFilters.distance
    );

    // Apply tag filters if any
    if (appliedFilters.tags.length > 0) {
      filteredResults = filteredResults.filter(item => 
        item.tags && appliedFilters.tags.some(tag => item.tags.includes(tag))
      );
    }

    // Sort results
    switch (appliedFilters.sortBy) {
      case 'distance':
        filteredResults.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        filteredResults.sort((a, b) => b.rating - a.rating);
        break;
      case 'participants':
        filteredResults.sort((a, b) => {
          const aCount = a.participants || a.memberCount || 0;
          const bCount = b.participants || b.memberCount || 0;
          return bCount - aCount;
        });
        break;
      case 'relevance':
      default:
        // No additional sorting needed for relevance (default order)
        break;
    }

    return filteredResults;
  };

  // Handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore</h1>
        <p className="text-gray-600">Discover people, events, and activities near you</p>
      </div>
      
      {/* Tab navigation */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto no-scrollbar">
        <nav className="flex min-w-max">
          <button
            onClick={() => handleTabChange('tables')}
            className={`py-4 px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'tables'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tables
          </button>
          <button
            onClick={() => handleTabChange('events')}
            className={`py-4 px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => handleTabChange('circles')}
            className={`py-4 px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'circles'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Circles
          </button>
        </nav>
      </div>
      
      <div className="mb-6">
        <ExploreSearch 
          query={searchQuery} 
          onSearch={handleSearch} 
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <ExploreFilters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            activeTab={activeTab}
          />
        </div>
        
        <div className="w-full md:w-3/4">
          <ExploreResults 
            results={results} 
            loading={loading} 
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
