/**
 * Mock data for Explore page
 * Following Single Responsibility Principle - this file only contains mock data
 */

// Tables mock data
export const tablesData = [
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

// Events mock data
export const eventsData = [
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

// Circles mock data
export const circlesData = [
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
      name: 'Michael Foster',
      image: 'https://randomuser.me/api/portraits/men/41.jpg',
      verified: true
    }
  }
];

// Helper function to generate filtered mock results based on tab, query, and filters
export const generateMockResults = (tab, query, appliedFilters) => {
  // Select the base data set based on active tab
  let baseResults = [];
  try {
    switch (tab) {
      case 'tables':
        baseResults = [...tablesData];
        break;
      case 'events':
        baseResults = [...eventsData];
        break;
      case 'circles':
        baseResults = [...circlesData];
        break;
      default:
        baseResults = [...tablesData, ...eventsData, ...circlesData];
    }

    // Filter the results based on search query
    let filteredResults = baseResults;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredResults = filteredResults.filter(item => 
        (item.title && item.title.toLowerCase().includes(lowerQuery)) || 
        (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    }

    // Apply additional filters
    if (appliedFilters && appliedFilters.category && appliedFilters.category !== 'all') {
      filteredResults = filteredResults.filter(item => item.category === appliedFilters.category);
    }

    if (appliedFilters && appliedFilters.distance) {
      filteredResults = filteredResults.filter(item => 
        item.distance && item.distance <= appliedFilters.distance
      );
    }

    if (appliedFilters && appliedFilters.tags && appliedFilters.tags.length > 0) {
      filteredResults = filteredResults.filter(item => 
        item.tags && appliedFilters.tags.some(tag => item.tags.includes(tag))
      );
    }

    // Sort results based on filter
    if (appliedFilters && appliedFilters.sortBy === 'distance') {
      filteredResults.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (appliedFilters && appliedFilters.sortBy === 'rating') {
      filteredResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filteredResults || [];
  } catch (error) {
    console.error('Error in generateMockResults:', error);
    return [];
  }
};
