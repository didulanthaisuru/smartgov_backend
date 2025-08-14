import ApiService from './api.js';

// User service for handling user-related API calls
class UserService {
  /**
   * Get user profile information
   * @returns {Promise<Object>} User profile data
   */
  static async getProfile() {
    try {
      const response = await ApiService.get('/auth/me');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Update response
   */
  static async updateProfile(profileData) {
    try {
      const response = await ApiService.put('/auth/profile', profileData);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Change user password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.current_password - Current password
   * @param {string} passwordData.new_password - New password
   * @returns {Promise<Object>} Password change response
   */
  static async changePassword(passwordData) {
    try {
      const response = await ApiService.post('/auth/change-password', passwordData);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Request password reset
   * @param {string} email - User's email address
   * @returns {Promise<Object>} Password reset request response
   */
  static async requestPasswordReset(email) {
    try {
      const response = await ApiService.post('/auth/forgot-password', { email }, {
        includeAuth: false
      });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Reset password with token
   * @param {Object} resetData - Password reset data
   * @param {string} resetData.token - Reset token
   * @param {string} resetData.new_password - New password
   * @returns {Promise<Object>} Password reset response
   */
  static async resetPassword(resetData) {
    try {
      const response = await ApiService.post('/auth/reset-password', resetData, {
        includeAuth: false
      });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get user activities
   * @returns {Promise<Object>} User activities data
   */
  static async getActivities() {
    try {
      const response = await ApiService.get('/user/activities');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get user appointments
   * @returns {Promise<Object>} User appointments data
   */
  static async getAppointments() {
    try {
      const response = await ApiService.get('/user/appointments');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get user documents
   * @returns {Promise<Object>} User documents data
   */
  static async getDocuments() {
    try {
      const response = await ApiService.get('/user/documents');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Upload user document
   * @param {FormData} formData - Document form data
   * @returns {Promise<Object>} Document upload response
   */
  static async uploadDocument(formData) {
    try {
      const response = await ApiService.post('/user/documents/upload', formData, {
        headers: {
          // Don't set Content-Type for FormData, let browser set it
        }
      });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Delete user document
   * @param {string} documentId - Document ID to delete
   * @returns {Promise<Object>} Document deletion response
   */
  static async deleteDocument(documentId) {
    try {
      const response = await ApiService.delete(`/user/documents/${documentId}`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default UserService;
