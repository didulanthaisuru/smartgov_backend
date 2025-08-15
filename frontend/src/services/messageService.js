import ApiService from './api.js';

// Message service for handling all message-related API calls
class MessageService {
  /**
   * Get all messages for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Messages response
   */
  static async getMessages(userId) {
    try {
      // TODO: Replace with actual API endpoint when available
      // For now, return mock data
      const mockMessages = [
        {
          id: 1,
          from: 'BR Admin',
          date: '2025-07-11',
          content: 'Hi Imasha Jayarathne, we are regret to inform that your birth certificate doesn\'t match our requirement. Please upload another one.',
          type: 'error',
          isRead: false
        },
        {
          id: 2,
          from: 'NIC Admin',
          date: '2025-07-10',
          content: 'Hi Imasha Jayarathne, we are happy to inform you that your grama niladari approval got verified and now have gone to the permit processing stage.',
          type: 'success',
          isRead: false
        },
        {
          id: 3,
          from: 'License Admin',
          date: '2025-07-09',
          content: 'Hi Imasha Jayarathne, we are happy to inform you that your business registration is at the final stage and it will be send to the final signature on 13th monday. you can borrow it on 2.00 pm',
          type: 'info',
          isRead: true
        }
      ];

      return {
        success: true,
        data: mockMessages
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get unread message count for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Unread count response
   */
  static async getUnreadMessageCount(userId) {
    try {
      const messagesResult = await this.getMessages(userId);
      if (!messagesResult.success) {
        return messagesResult;
      }

      const unreadCount = messagesResult.data.filter(message => !message.isRead).length;

      return {
        success: true,
        data: unreadCount
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Mark a message as read
   * @param {string} messageId - Message ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Mark as read response
   */
  static async markMessageAsRead(messageId, userId) {
    try {
      // TODO: Replace with actual API endpoint when available
      // For now, return success
      return {
        success: true,
        data: { messageId, markedAsRead: true }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get message statistics for profile page
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Message statistics
   */
  static async getMessageStatistics(userId) {
    try {
      const messagesResult = await this.getMessages(userId);
      if (!messagesResult.success) {
        return messagesResult;
      }

      const messages = messagesResult.data;
      const unreadCount = messages.filter(message => !message.isRead).length;
      const totalCount = messages.length;

      return {
        success: true,
        data: {
          unreadCount,
          totalCount,
          hasUnread: unreadCount > 0,
          hasMessages: totalCount > 0
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: {
          unreadCount: 0,
          totalCount: 0,
          hasUnread: false,
          hasMessages: false
        }
      };
    }
  }
}

export default MessageService;
