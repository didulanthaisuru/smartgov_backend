import ApiService from './api.js';

// Authentication service for handling all auth-related API calls
class AuthService {
  /**
   * User login
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.nic - User's NIC number
   * @param {string} credentials.passcode - User's password
   * @returns {Promise<Object>} Login response with token and user data
   */
  static async login(credentials) {
    try {
      const response = await ApiService.post('/auth/sign_in', credentials, {
        includeAuth: false // Don't include auth header for login
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
   * User registration
   * @param {Object} userData - User registration data
   * @param {string} userData.first_name - User's first name
   * @param {string} userData.last_name - User's last name
   * @param {string} userData.nic - User's NIC number
   * @param {string} userData.phone_number - User's phone number
   * @param {string} userData.email - User's email address
   * @param {string} userData.passcode - User's password
   * @returns {Promise<Object>} Registration response
   */
  static async register(userData) {
    try {
      const response = await ApiService.post('/auth/register', userData, {
        includeAuth: false // Don't include auth header for registration
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
   * Verify user token
   * @returns {Promise<Object>} Token verification response
   */
  static async verifyToken() {
    try {
      const response = await ApiService.get('/auth/verify');
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
   * Get current user information
   * @returns {Promise<Object>} Current user data
   */
  static async getCurrentUser() {
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
   * Admin login
   * @param {Object} credentials - Admin login credentials
   * @param {string} credentials.email - Admin's email
   * @param {string} credentials.passcode - Admin's password
   * @returns {Promise<Object>} Admin login response
   */
  static async adminLogin(credentials) {
    try {
      const response = await ApiService.post('/admin/sign_in', credentials, {
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
   * Admin registration
   * @param {Object} adminData - Admin registration data
   * @returns {Promise<Object>} Admin registration response
   */
  static async adminRegister(adminData) {
    try {
      const response = await ApiService.post('/admin/register', adminData, {
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
   * Verify admin token
   * @returns {Promise<Object>} Admin token verification response
   */
  static async verifyAdminToken() {
    try {
      const response = await ApiService.get('/admin/verify');
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
   * Logout user (client-side)
   * Clears all authentication data from localStorage
   */
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('savedPassword');
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  static isAuthenticated() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const userData = localStorage.getItem('userData');
    
    return !!(token && userRole && userData);
  }

  /**
   * Get stored authentication data
   * @returns {Object} Authentication data
   */
  static getAuthData() {
    return {
      token: localStorage.getItem('token'),
      userRole: localStorage.getItem('userRole'),
      userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
    };
  }

  /**
   * Save authentication data
   * @param {Object} authData - Authentication data to save
   * @param {string} authData.token - JWT token
   * @param {string} authData.userRole - User role
   * @param {Object} authData.userData - User data
   */
  static saveAuthData(authData) {
    if (authData.token) localStorage.setItem('token', authData.token);
    if (authData.userRole) localStorage.setItem('userRole', authData.userRole);
    if (authData.userData) localStorage.setItem('userData', JSON.stringify(authData.userData));
  }
}

export default AuthService;
