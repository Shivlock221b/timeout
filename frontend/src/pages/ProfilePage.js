import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import UserDetails from '../components/profile/UserDetails';
import UserInterests from '../components/profile/UserInterests';
import ProfileCompleteness from '../components/profile/ProfileCompleteness';
import SocialLinks from '../components/profile/SocialLinks';
import VerificationBadges from '../components/profile/VerificationBadges';
import ProfileAvatar from '../components/profile/ProfileAvatar';

// Following Single Responsibility Principle - this component only handles the profile page layout
const ProfilePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const { profile, loading, error, refreshProfile } = useProfile();
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-500">{error}</h2>
          <div className="flex justify-center mt-4">
            <button 
              onClick={refreshProfile}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      navigate('/'); // Redirect to home page after logout
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {profile && (
            <div className="px-6 py-6">
              <ProfileAvatar 
                avatar={profile.avatar} 
                name={profile.name} 
                email={profile.email}
              />
              
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
              
              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => window.location.href = '/settings'}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Profile
                  </button>
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
  );
};

export default ProfilePage;
