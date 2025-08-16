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
    
    // Try different possible field names for user ID (prioritize 'id' field from backend)
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
   * Get user ID from authentication data
   * @returns {string|null} User ID or null if not found
   */
  static getUserIdFromAuth() {
    try {
      const authData = AuthService.getAuthData();
      if (!authData.userData) {
        console.warn('No user data found in authentication');
        return null;
      }
      
      const userId = this.extractUserId(authData.userData);
      if (!userId) {
        console.warn('User ID not found in user data');
        return null;
      }
      
      return userId;
    } catch (error) {
      console.error('Error extracting user ID from auth:', error);
      return null;
    }
  }

  /**
   * Get comprehensive profile data including appointments and messages
   * @param {string} userId - User ID (MongoDB ObjectId)
   * @returns {Promise<Object>} Complete profile data
   */
  static async getProfileData(userId) {
    try {
      // Add timeout to prevent hanging requests
      const timeout = 10000; // 10 seconds
      
      // Fetch all data in parallel for better performance with timeout
      const [appointmentStats, messageStats] = await Promise.all([
        Promise.race([
          AppointmentService.getAppointmentStatistics(userId),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Appointment service timeout')), timeout)
          )
        ]),
        Promise.race([
          MessageService.getMessageStatistics(userId),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Message service timeout')), timeout)
          )
        ])
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
    // Add safety checks for profileData structure
    if (!profileData) {
      console.warn('ProfileService.generateMenuItemsData: profileData is null or undefined');
      return [];
    }

    const { appointments, messages } = profileData;
    
    // Ensure appointments and messages have default values
    const safeAppointments = appointments || {
      ongoing: [],
      incomplete: [],
      previous: [],
      ongoingProgress: 0,
      requiredDocumentsCount: 0,
      totalAppointments: 0
    };
    
    const safeMessages = messages || {
      unreadCount: 0,
      totalCount: 0,
      hasUnread: false,
      hasMessages: false
    };

    return [
      {
        id: 1,
        title: 'Ongoing Activities',
        description: safeAppointments.ongoing.length > 0 
          ? `${safeAppointments.ongoing.length} ongoing activities`
          : 'No ongoing activities',
        iconType: 'ongoing',
        showProgress: false, // Remove progress bar
        route: '/ongoing-activities',
        count: safeAppointments.ongoing.length
      },
      {
        id: 2,
        title: 'Incomplete Activities',
        description: safeAppointments.incomplete.length > 0 
          ? `${safeAppointments.incomplete.length} incomplete activities`
          : 'No incomplete activities',
        iconType: 'incomplete',
        route: '/incomplete-activities',
        count: safeAppointments.incomplete.length
      },
      {
        id: 3,
        title: 'Messages',
        description: safeMessages.unreadCount > 0 
          ? `You have ${safeMessages.unreadCount} unread messages`
          : 'No unread messages',
        iconType: 'messages',
        route: '/messages',
        count: safeMessages.unreadCount
      },
      {
        id: 4,
        title: 'Previous Activities',
        description: safeAppointments.previous.length > 0 
          ? `${safeAppointments.previous.length} completed activities`
          : 'No previous activities',
        iconType: 'previous',
        route: '/previous-activities',
        count: safeAppointments.previous.length
      },
      {
        id: 6,
        title: 'Update Information',
        description: 'Update your personal information',
        iconType: 'update',
        route: '/update-information'
      }
    ];
  }
}

export default ProfileService;
