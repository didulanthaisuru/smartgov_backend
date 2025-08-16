import axios from 'axios';
import AuthService from './authService.js';

// User Profile service for handling profile-related API calls
class UserProfileService {
  /**
   * Get user profile by NIC
   * @param {string} nic - User's NIC number
   * @returns {Promise<Object>} User profile data
   */
  static async getUserProfile(nic) {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/profile/user/${nic}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        success: false,
        error: error.response?.data?.detail || error.message
      };
    }
  }

  /**
   * Get current user's profile using auth data
   * @returns {Promise<Object>} Current user profile data
   */
  static async getCurrentUserProfile() {
    try {
      // Get user data from auth service
      const authData = AuthService.getAuthData();
      if (!authData?.userData?.nic) {
        return {
          success: false,
          error: 'User NIC not found. Please login again.'
        };
      }

      return await this.getUserProfile(authData.userData.nic);
    } catch (error) {
      console.error('Error fetching current user profile:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update user profile
   * @param {string} nic - User's NIC number
   * @param {Object} profileData - Profile data to update
   * @param {string} profileData.first_name - User's first name
   * @param {string} profileData.phone_number - User's phone number
   * @param {string} profileData.address - User's address
   * @param {File} profileData.profile_picture - Profile picture file (optional)
   * @returns {Promise<Object>} Update response
   */
  static async updateUserProfile(nic, profileData) {
    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      
      // Add text fields
      if (profileData.first_name) {
        formData.append('first_name', profileData.first_name);
      }
      if (profileData.phone_number) {
        formData.append('phone_number', profileData.phone_number);
      }
      if (profileData.address) {
        formData.append('address', profileData.address);
      }
      
      // Add profile picture if provided
      if (profileData.profile_picture) {
        formData.append('profile_picture', profileData.profile_picture);
      }

      const response = await axios.put(
        `http://localhost:8000/api/v1/profile/user/${nic}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return {
        success: false,
        error: error.response?.data?.detail || error.message
      };
    }
  }

  /**
   * Update current user's profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<Object>} Update response
   */
  static async updateCurrentUserProfile(profileData) {
    try {
      // Get user data from auth service
      const authData = AuthService.getAuthData();
      if (!authData?.userData?.nic) {
        return {
          success: false,
          error: 'User NIC not found. Please login again.'
        };
      }

      return await this.updateUserProfile(authData.userData.nic, profileData);
    } catch (error) {
      console.error('Error updating current user profile:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get user profile with fallback to auth data
   * @returns {Promise<Object>} User profile data
   */
  static async getUserProfileWithFallback() {
    try {
      // First try to get profile from backend
      const profileResult = await this.getCurrentUserProfile();
      
      if (profileResult.success) {
        return profileResult;
      }

      // Fallback to auth data if backend fails
      const authData = AuthService.getAuthData();
      if (authData?.userData) {
        return {
          success: true,
          data: {
            first_name: authData.userData.first_name || '',
            phone_number: authData.userData.phone_number || '',
            address: authData.userData.address || '',
            profile_picture: authData.userData.profile_picture || null
          }
        };
      }

      return {
        success: false,
        error: 'No user data available'
      };
    } catch (error) {
      console.error('Error getting user profile with fallback:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Validate profile data
   * @param {Object} profileData - Profile data to validate
   * @returns {Object} Validation result
   */
  static validateProfileData(profileData) {
    const errors = {};

    // Validate first name
    if (profileData.first_name && profileData.first_name.trim().length < 2) {
      errors.first_name = 'First name must be at least 2 characters long';
    }

    // Validate phone number
    if (profileData.phone_number) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(profileData.phone_number)) {
        errors.phone_number = 'Please enter a valid phone number';
      }
    }

    // Validate address
    if (profileData.address && profileData.address.trim().length < 10) {
      errors.address = 'Address must be at least 10 characters long';
    }

    // Validate profile picture
    if (profileData.profile_picture) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(profileData.profile_picture.type)) {
        errors.profile_picture = 'Please select a valid image file (JPEG, PNG, GIF)';
      } else if (profileData.profile_picture.size > maxSize) {
        errors.profile_picture = 'Image file size must be less than 5MB';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Format profile data for display
   * @param {Object} profileData - Raw profile data
   * @returns {Object} Formatted profile data
   */
  static formatProfileData(profileData) {
    return {
      first_name: profileData.first_name || '',
      phone_number: profileData.phone_number || '',
      address: profileData.address || '',
      profile_picture: profileData.profile_picture || null,
      // Add computed fields
      display_name: profileData.first_name || 'User',
      has_profile_picture: !!profileData.profile_picture
    };
  }
}

export default UserProfileService;
