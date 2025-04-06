import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserDetails from '../components/profile/UserDetails';
import UserInterests from '../components/profile/UserInterests';
import ProfileCompleteness from '../components/profile/ProfileCompleteness';
import SocialLinks from '../components/profile/SocialLinks';
import VerificationBadges from '../components/profile/VerificationBadges';

// Following Single Responsibility Principle - this component only handles the profile page layout
const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real application, this would fetch the profile data from the API
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Mock data for now - would be replaced with API call
        setTimeout(() => {
          setProfile({
            ...user,
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
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Loading Profile...</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-500">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and preferences</p>
              </div>
              <button 
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => window.location.href = '/settings'}
              >
                Edit Profile
              </button>
            </div>
            
            {profile && (
              <div className="border-t border-gray-200">
                <ProfileCompleteness completeness={profile.completeness} />
                
                <UserDetails 
                  name={profile.name} 
                  email={profile.email} 
                  bio={profile.bio}
                  location={profile.location}
                />
                
                <VerificationBadges verified={profile.verified} />
                
                <UserInterests interests={profile.interests} />
                
                <SocialLinks social={profile.social} />
                
                {/* Sign Out Button */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-center">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
