import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Create Profile Context
export const ProfileContext = createContext();

// Following Single Responsibility Principle - this component only manages profile data and caching
export const ProfileProvider = ({ children }) => {
  const { user: authUser, isAuthenticated, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  
  // Cache duration in milliseconds (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;
  
  // Load profile data
  const fetchProfileData = useCallback(async (force = false) => {
    // Don't fetch if not authenticated or still loading auth
    if (!isAuthenticated || authLoading) {
      setLoading(false);
      return;
    }
    
    // Check if cache is still valid
    const now = Date.now();
    const isCacheValid = lastFetchTime && (now - lastFetchTime < CACHE_DURATION);
    
    // Return cached profile if available and valid, unless forced refresh
    if (profile && isCacheValid && !force) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate an API call with setTimeout
      const fetchData = async () => {
        // This would be replaced with actual API call in production
        // const res = await axios.get('/api/users/profile');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock profile data (in production this would come from the API)
        return {
          ...authUser,
          bio: 'Enthusiastic traveler and food lover',
          location: 'Mumbai, India',
          interests: ['hiking', 'photography', 'cooking', 'reading'],
          social: {
            instagram: 'user_insta',
            twitter: 'user_twitter',
            linkedin: 'user_linkedin'
          },
          verified: {
            email: true,
            phone: false
          },
          completeness: 75 // percentage
        };
      };
      
      const profileData = await fetchData();
      
      // Update state with fetched profile
      setProfile(profileData);
      setLastFetchTime(Date.now());
      setError(null);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading, profile, lastFetchTime, authUser]);
  
  // Load profile when auth state changes
  useEffect(() => {
    // Only fetch profile if user is authenticated and auth loading is complete
    if (isAuthenticated && !authLoading) {
      fetchProfileData();
    } else if (!isAuthenticated) {
      // Clear profile when user logs out
      setProfile(null);
      setLastFetchTime(null);
    }
  }, [isAuthenticated, authLoading, fetchProfileData]);
  
  // Function to manually refresh profile data
  const refreshProfile = () => {
    return fetchProfileData(true);
  };
  
  // Function to check if cache is stale
  const isCacheStale = () => {
    if (!lastFetchTime) return true;
    const now = Date.now();
    return (now - lastFetchTime) > CACHE_DURATION;
  };
  
  // Context value
  const value = {
    profile,
    loading,
    error,
    refreshProfile,
    isCacheStale,
    lastFetchTime
  };
  
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

// Custom hook for using profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
