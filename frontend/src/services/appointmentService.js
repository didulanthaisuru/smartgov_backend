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
    
    // For now, we'll use a simple calculation based on completed vs total
    // This can be enhanced based on your business logic
    const totalSteps = appointments.length * 4; // Assuming 4 steps per appointment
    const completedSteps = appointments.reduce((total, appointment) => {
      // Add logic here based on your progress calculation requirements
      return total + 2; // Placeholder: assuming 2 steps completed per appointment
    }, 0);
    
    return Math.round((completedSteps / totalSteps) * 100);
  }

  /**
   * Count required documents for incomplete appointments
   * @param {Array} appointments - List of incomplete appointments
   * @returns {number} Number of required documents
   */
  static countRequiredDocuments(appointments) {
    if (!appointments || appointments.length === 0) return 0;
    
    // This would need to be enhanced based on your actual data structure
    // For now, returning a placeholder count
    return appointments.length * 2; // Placeholder: assuming 2 docs per appointment
  }
}

export default AppointmentService;
