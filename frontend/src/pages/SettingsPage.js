import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileSettings from '../components/settings/ProfileSettings';
import AvatarManager from '../components/settings/AvatarManager';
import AccountSettings from '../components/settings/AccountSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import NotificationPreferences from '../components/settings/NotificationPreferences';

// Following Single Responsibility Principle - this component only handles the settings page layout
const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Tabs configuration following Open/Closed principle - new tabs can be added without modifying existing code
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'avatar', label: 'Avatar' },
    { id: 'account', label: 'Account' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'notifications', label: 'Notifications' }
  ];

  // Tab content components mapping - follows Interface Segregation Principle
  // Each tab component handles only what it needs to
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings user={user} />;
      case 'avatar':
        return <AvatarManager user={user} />;
      case 'account':
        return <AccountSettings user={user} />;
      case 'privacy':
        return <PrivacySettings user={user} />;
      case 'notifications':
        return <NotificationPreferences user={user} />;
      default:
        return <ProfileSettings user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Settings</h2>
              <p className="mt-1 text-sm text-gray-500">Manage your profile and account preferences</p>
            </div>
            
            <div className="border-t border-gray-200">
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-4 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="p-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
