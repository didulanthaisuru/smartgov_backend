import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileService from '../services/userProfileService.js';

const UpdateInformationPage = ({ nic }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    phone_number: '',
    address: '',
    profile_picture: null
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // Load profile data on component mount
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await UserProfileService.getUserProfileWithFallback();
      
      if (result.success) {
        const formattedData = UserProfileService.formatProfileData(result.data);
        setFormData(formattedData);
        
        // Set profile image preview if exists
        if (formattedData.profile_picture) {
          setProfileImagePreview(`data:image/jpeg;base64,${formattedData.profile_picture}`);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error loading profile data:', err);
      setError('Failed to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file
      const validation = UserProfileService.validateProfileData({ profile_picture: file });
      if (!validation.isValid) {
        setValidationErrors(prev => ({
          ...prev,
          profile_picture: validation.errors.profile_picture
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        profile_picture: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      // Clear previous errors
      setError(null);
      setValidationErrors({});

      // Validate data
      const validation = UserProfileService.validateProfileData(formData);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        return;
      }

      setUpdating(true);
      
      const result = await UserProfileService.updateCurrentUserProfile(formData);
      
      if (result.success) {
        setShowSuccessModal(true);
        // Reload profile data to get updated information
        await loadProfileData();
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C3C2A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[730px] rounded-full bg-blue-100 opacity-30"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6">
        <button 
          onClick={() => navigate('/profile')}
          className="w-9 h-9 flex items-center justify-center"
        >
          <div className="w-9 h-9 bg-gray-300 rounded"></div>
        </button>

        <div className="flex items-center">
          <div className="w-15 h-20 bg-gray-300 rounded mr-4"></div>
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-4">Update Information</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-9 min-h-[500px] p-6">
        <div className="max-w-md mx-auto">
          {/* Profile Picture Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {profileImagePreview ? (
                <img 
                  src={profileImagePreview} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#8C322A] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#7A2A22] transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          {validationErrors.profile_picture && (
            <div className="text-red-500 text-xs text-center mb-4">
              {validationErrors.profile_picture}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-normal text-black mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={`w-full bg-[#F8CB93] rounded-xl px-4 py-3 text-sm text-black placeholder-black placeholder-opacity-50 border-none focus:outline-none focus:ring-2 focus:ring-[#8C322A] ${
                  validationErrors.first_name ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="Enter your first name"
              />
              {validationErrors.first_name && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.first_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-normal text-black mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className={`w-full bg-[#F8CB93] rounded-xl px-4 py-3 text-sm text-black placeholder-black placeholder-opacity-50 border-none focus:outline-none focus:ring-2 focus:ring-[#8C322A] ${
                  validationErrors.phone_number ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="Enter your phone number"
              />
              {validationErrors.phone_number && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.phone_number}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-normal text-black mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className={`w-full bg-[#F8CB93] rounded-xl px-4 py-3 text-sm text-black placeholder-black placeholder-opacity-50 border-none focus:outline-none focus:ring-2 focus:ring-[#8C322A] resize-none ${
                  validationErrors.address ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="Enter your address"
              />
              {validationErrors.address && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button 
              onClick={() => navigate('/profile')}
              disabled={updating}
              className="flex-1 bg-gray-200 text-black rounded-xl py-3 px-6 text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              disabled={updating}
              className="flex-1 bg-[#8C322A] text-white rounded-xl py-3 px-6 text-sm font-medium hover:bg-[#7A2A22] transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {updating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 m-6 max-w-xs w-full text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-xl font-medium text-black mb-2">Profile Updated</h3>
            <p className="text-sm text-gray-600 mb-6">Your information has been updated successfully.</p>
            
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/profile');
              }}
              className="w-full bg-[#8C322A] text-white rounded-xl py-3 px-6 text-sm font-medium hover:bg-[#7A2A22] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  );
};

export default UpdateInformationPage;
