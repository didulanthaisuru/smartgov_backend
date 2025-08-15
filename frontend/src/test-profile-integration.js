// Test file for profile service integration
// This can be run in the browser console to test the services

import ProfileService from './services/profileService.js';
import AppointmentService from './services/appointmentService.js';
import MessageService from './services/messageService.js';

// Test function to verify service integration
export async function testProfileIntegration() {
  console.log('🧪 Testing Profile Service Integration...');
  
  try {
    // Test with a mock user ID
    const mockUserId = 'test-user-123';
    
    console.log('📊 Testing Appointment Service...');
    const appointmentStats = await AppointmentService.getAppointmentStatistics(mockUserId);
    console.log('Appointment Stats:', appointmentStats);
    
    console.log('💬 Testing Message Service...');
    const messageStats = await MessageService.getMessageStatistics(mockUserId);
    console.log('Message Stats:', messageStats);
    
    console.log('👤 Testing Profile Service...');
    const profileData = await ProfileService.getProfileData(mockUserId);
    console.log('Profile Data:', profileData);
    
    console.log('✅ All tests completed successfully!');
    return {
      success: true,
      appointmentStats,
      messageStats,
      profileData
    };
  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Test utility functions
export function testUtilityFunctions() {
  console.log('🔧 Testing Utility Functions...');
  
  // Test user display name
  const testUserData = {
    first_name: 'John',
    last_name: 'Doe',
    nic: '1234567890123'
  };
  
  const displayName = ProfileService.getUserDisplayName(testUserData);
  const maskedNIC = ProfileService.getMaskedNIC(testUserData.nic);
  
  console.log('Display Name:', displayName);
  console.log('Masked NIC:', maskedNIC);
  
  return {
    displayName,
    maskedNIC
  };
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testProfileIntegration = testProfileIntegration;
  window.testUtilityFunctions = testUtilityFunctions;
}
