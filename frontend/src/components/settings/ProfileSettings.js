import React, { useState, useEffect } from 'react';

// Single Responsibility Principle - this component only handles profile settings
const ProfileSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    interests: []
  });
  const [availableInterests, setAvailableInterests] = useState([
    'hiking', 'photography', 'cooking', 'reading', 'travel', 'music', 
    'movies', 'art', 'sports', 'technology', 'gaming', 'fitness', 
    'yoga', 'meditation', 'dancing', 'writing', 'fashion', 'food'
  ]);
  const [newInterest, setNewInterest] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // In a real application, fetch user data from API
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        interests: user.interests || []
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const addInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData(prevData => ({
        ...prevData,
        interests: [...prevData.interests, newInterest]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setFormData(prevData => ({
      ...prevData,
      interests: prevData.interests.filter(item => item !== interest)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-x-hidden">
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          <p className="mt-1 text-sm text-gray-500">Update your basic profile information.</p>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-2 sm:gap-x-4 sm:grid-cols-6">
            <div className="col-span-1 sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Tell us about yourself"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
            </div>

            <div className="col-span-1 sm:col-span-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Mumbai, India"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Interests</h3>
          <p className="mt-1 text-sm text-gray-500">Select interests to help us find matches for you.</p>
          
          <div className="mt-2 max-w-full overflow-hidden">
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-1.5 h-4 w-4 rounded-full flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row">
              <div className="flex-grow mb-2 sm:mb-0">
                <select
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select an interest</option>
                  {availableInterests
                    .filter(interest => !formData.interests.includes(interest))
                    .map((interest, index) => (
                      <option key={index} value={interest}>
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="button"
                onClick={addInterest}
                className="sm:ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileSettings;
