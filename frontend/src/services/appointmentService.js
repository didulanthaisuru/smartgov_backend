import ApiService from './api.js';

// Appointment service for handling all appointment-related API calls
class AppointmentService {
  /**
   * Get ongoing appointments for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Ongoing appointments response
   */
  static async getOngoingAppointments(userId) {
    try {
      const response = await ApiService.post('/appointments_view/ongoing', {
        user_id: userId
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
   * Get incomplete appointments for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Incomplete appointments response
   */
  static async getIncompleteAppointments(userId) {
    try {
      const response = await ApiService.post('/appointments_view/incomplete', {
        user_id: userId
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
   * Get previous (completed) appointments for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Previous appointments response
   */
  static async getPreviousAppointments(userId) {
    try {
      const response = await ApiService.post('/appointments_view/previous', {
        user_id: userId
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
   * Get detailed information for a specific ongoing appointment
   * @param {string} appointmentId - Appointment ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Ongoing appointment details response
   */
  static async getOngoingAppointmentDetails(appointmentId, userId) {
    try {
      const response = await ApiService.post(`/appointments_view/ongoing/${appointmentId}`, {
        user_id: userId
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
   * Get detailed information for a specific incomplete appointment
   * @param {string} appointmentId - Appointment ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Incomplete appointment details response
   */
  static async getIncompleteAppointmentDetails(appointmentId, userId) {
    try {
      const response = await ApiService.post(`/appointments_view/incomplete/${appointmentId}`, {
        user_id: userId
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
   * Get detailed information for a specific previous appointment
   * @param {string} appointmentId - Appointment ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Previous appointment details response
   */
  static async getPreviousAppointmentDetails(appointmentId, userId) {
    try {
      const response = await ApiService.post(`/appointments_view/previous/${appointmentId}`, {
        user_id: userId
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
   * Calculate progress percentage for ongoing appointments
   * @param {Array} appointments - List of appointments
   * @returns {number} Progress percentage (0-100)
   */
  static calculateProgress(appointments) {
    if (!appointments || appointments.length === 0) return 0;
    
    // Calculate progress based on appointment completion status
    // This is a simplified calculation - you can enhance it based on your business logic
    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(appointment => 
      appointment.is_fully_completed
    ).length;
    
    // If all appointments are completed, return 100%
    if (completedAppointments === totalAppointments) return 100;
    
    // Calculate progress based on completion ratio
    const progress = Math.round((completedAppointments / totalAppointments) * 100);
    
    // Ensure progress is between 0 and 100
    return Math.max(0, Math.min(100, progress));
  }

  /**
   * Count required documents for incomplete appointments
   * @param {Array} appointments - List of incomplete appointments
   * @returns {number} Number of required documents
   */
  static countRequiredDocuments(appointments) {
    if (!appointments || appointments.length === 0) return 0;
    
    // This is a placeholder calculation
    // In a real implementation, you would need to fetch the required documents
    // for each incomplete appointment and count them
    // For now, we'll assume each incomplete appointment needs 2-3 documents
    return appointments.length * 2;
  }

  /**
   * Get comprehensive appointment statistics for profile page
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Statistics object
   */
  static async getAppointmentStatistics(userId) {
    try {
      const [ongoingResult, incompleteResult, previousResult] = await Promise.all([
        this.getOngoingAppointments(userId),
        this.getIncompleteAppointments(userId),
        this.getPreviousAppointments(userId)
      ]);

      const ongoing = ongoingResult.success ? ongoingResult.data || [] : [];
      const incomplete = incompleteResult.success ? incompleteResult.data || [] : [];
      const previous = previousResult.success ? previousResult.data || [] : [];

      return {
        success: true,
        data: {
          ongoing,
          incomplete,
          previous,
          ongoingProgress: this.calculateProgress(ongoing),
          requiredDocumentsCount: this.countRequiredDocuments(incomplete),
          totalAppointments: ongoing.length + incomplete.length + previous.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: {
          ongoing: [],
          incomplete: [],
          previous: [],
          ongoingProgress: 0,
          requiredDocumentsCount: 0,
          totalAppointments: 0
        }
      };
    }
  }

  /**
   * Get appointment summary for dashboard
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Summary object
   */
  static async getAppointmentSummary(userId) {
    try {
      const stats = await this.getAppointmentStatistics(userId);
      if (!stats.success) {
        return stats;
      }

      const { ongoing, incomplete, previous } = stats.data;

      return {
        success: true,
        data: {
          ongoingCount: ongoing.length,
          incompleteCount: incomplete.length,
          previousCount: previous.length,
          ongoingProgress: this.calculateProgress(ongoing),
          requiredDocumentsCount: this.countRequiredDocuments(incomplete),
          hasOngoing: ongoing.length > 0,
          hasIncomplete: incomplete.length > 0,
          hasPrevious: previous.length > 0
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default AppointmentService;
