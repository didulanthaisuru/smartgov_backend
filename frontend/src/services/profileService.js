import AppointmentService from './appointmentService.js';
import MessageService from './messageService.js';
import AuthService from './authService.js';

// Profile service for handling all profile-related data aggregation
class ProfileService {
  /**
   * Extract user ID from user data object
   * @param {Object} userData - User data object
   * @returns {string|null} User ID or null if not found
   */
  static extractUserId(userData) {
    if (!userData) return null;
    
    // Try different possible field names for user ID (prioritize actual ObjectId)
    const possibleIdFields = ['id', 'user_id', '_id', 'userId', 'userID'];
    
    for (const field of possibleIdFields) {
      if (userData[field]) {
        console.log(`Found user ID in field '${field}':`, userData[field]);
        return userData[field];
      }
    }
    
    // If no ID found, log the user data structure for debugging
    console.log('User data structure:', userData);
    console.log('Available fields:', Object.keys(userData));
    
    return null;
  }

  /**
   * Get comprehensive profile data including appointments and messages
   * @param {string} userId - User ID (MongoDB ObjectId)
   * @returns {Promise<Object>} Complete profile data
   */
  static async getProfileData(userId) {
    try {
      // Fetch all data in parallel for better performance
      const [appointmentStats, messageStats] = await Promise.all([
        AppointmentService.getAppointmentStatistics(userId),
        MessageService.getMessageStatistics(userId)
      ]);

      // Get user data from auth service
      const authData = AuthService.getAuthData();
      const userData = authData?.userData || {};

      return {
        success: true,
        data: {
          user: userData,
          appointments: appointmentStats.success ? appointmentStats.data : {
            ongoing: [],
            incomplete: [],
            previous: [],
            ongoingProgress: 0,
            requiredDocumentsCount: 0,
            totalAppointments: 0
          },
          messages: messageStats.success ? messageStats.data : {
            unreadCount: 0,
            totalCount: 0,
            hasUnread: false,
            hasMessages: false
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: {
          user: {},
          appointments: {
            ongoing: [],
            incomplete: [],
            previous: [],
            ongoingProgress: 0,
            requiredDocumentsCount: 0,
            totalAppointments: 0
          },
          messages: {
            unreadCount: 0,
            totalCount: 0,
            hasUnread: false,
            hasMessages: false
          }
        }
      };
    }
  }

  /**
   * Get profile data with automatic user ID extraction
   * @returns {Promise<Object>} Complete profile data
   */
  static async getProfileDataWithAutoUserId() {
    try {
      // Get user data from auth service
      const authData = AuthService.getAuthData();
      console.log('Auth data retrieved:', authData);
      
      if (!authData.userData) {
        return {
          success: false,
          error: 'User data not found. Please login again.',
          data: this.getDefaultProfileData()
        };
      }

      // Extract user ID using the helper function
      const userId = this.extractUserId(authData.userData);
      if (!userId) {
        return {
          success: false,
          error: 'User ID not found in user data. Please login again.',
          data: this.getDefaultProfileData()
        };
      }

      console.log('Using user ID:', userId);
      return await this.getProfileData(userId);
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: this.getDefaultProfileData()
      };
    }
  }

  /**
   * Get default profile data structure
   * @returns {Object} Default profile data
   */
  static getDefaultProfileData() {
    return {
      user: {},
      appointments: {
        ongoing: [],
        incomplete: [],
        previous: [],
        ongoingProgress: 0,
        requiredDocumentsCount: 0,
        totalAppointments: 0
      },
      messages: {
        unreadCount: 0,
        totalCount: 0,
        hasUnread: false,
        hasMessages: false
      }
    };
  }

  /**
   * Get profile summary for dashboard
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Profile summary
   */
  static async getProfileSummary(userId) {
    try {
      const profileData = await this.getProfileData(userId);
      if (!profileData.success) {
        return profileData;
      }

      const { appointments, messages } = profileData.data;

      return {
        success: true,
        data: {
          ongoingCount: appointments.ongoing.length,
          incompleteCount: appointments.incomplete.length,
          previousCount: appointments.previous.length,
          ongoingProgress: appointments.ongoingProgress,
          requiredDocumentsCount: appointments.requiredDocumentsCount,
          unreadMessagesCount: messages.unreadCount,
          hasOngoing: appointments.ongoing.length > 0,
          hasIncomplete: appointments.incomplete.length > 0,
          hasPrevious: appointments.previous.length > 0,
          hasUnreadMessages: messages.hasUnread
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Refresh profile data
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Refreshed profile data
   */
  static async refreshProfileData(userId) {
    return await this.getProfileData(userId);
  }

  /**
   * Get user display name
   * @param {Object} userData - User data object
   * @returns {string} Display name
   */
  static getUserDisplayName(userData) {
    if (!userData) return 'User Profile';
    
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else {
      return 'User Profile';
    }
  }

  /**
   * Get masked NIC for display
   * @param {string} nic - NIC number
   * @returns {string} Masked NIC
   */
  static getMaskedNIC(nic) {
    if (!nic || nic.length < 4) return 'NIC: ****';
    
    const firstFour = nic.slice(0, 4);
    const lastTwo = nic.slice(-2);
    return `${firstFour}******${lastTwo}`;
  }

  /**
   * Generate menu items data for profile page (without JSX)
   * @param {Object} profileData - Profile data object
   * @returns {Array} Menu items data array
   */
  static generateMenuItemsData(profileData) {
    const { appointments, messages } = profileData;

    return [
      {
        id: 1,
        title: 'Ongoing Activities',
        description: appointments.ongoingProgress > 0 
          ? `${appointments.ongoingProgress}%`
          : 'No ongoing activities',
        iconType: 'ongoing',
        showProgress: true,
        progressValue: appointments.ongoingProgress,
        route: '/ongoing-activities',
        count: appointments.ongoing.length
      },
      {
        id: 2,
        title: 'Incomplete Activities',
        description: appointments.requiredDocumentsCount > 0 
          ? `${appointments.requiredDocumentsCount} Documents are required for completion`
          : 'No incomplete activities',
        iconType: 'incomplete',
        route: '/incomplete-activities',
        count: appointments.incomplete.length
      },
      {
        id: 3,
        title: 'Messages',
        description: messages.unreadCount > 0 
          ? `You have ${messages.unreadCount} Unread Messages`
          : 'No unread messages',
        iconType: 'messages',
        route: '/messages',
        count: messages.unreadCount
      },
      {
        id: 4,
        title: 'Previous Activities',
        description: appointments.previous.length > 0 
          ? `${appointments.previous.length} completed activities`
          : 'No previous activities',
        iconType: 'previous',
        route: '/previous-activities',
        count: appointments.previous.length
      },
      {
        id: 6,
        title: 'Update Information',
        description: '',
        iconType: 'update',
        route: '/update-information'
      }
    ];
  }
}

export default ProfileService;
