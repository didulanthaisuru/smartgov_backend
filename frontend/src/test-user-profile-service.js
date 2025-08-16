// Test file for UserProfileService
// Run this in browser console to test the service

import UserProfileService from './services/userProfileService.js';

// Test function to verify service functionality
async function testUserProfileService() {
  console.log('🧪 Testing UserProfileService...');
  
  try {
    // Test 1: Get current user profile
    console.log('\n📋 Test 1: Getting current user profile...');
    const profileResult = await UserProfileService.getCurrentUserProfile();
    console.log('Profile result:', profileResult);
    
    // Test 2: Get profile with fallback
    console.log('\n📋 Test 2: Getting profile with fallback...');
    const fallbackResult = await UserProfileService.getUserProfileWithFallback();
    console.log('Fallback result:', fallbackResult);
    
    // Test 3: Validate sample data
    console.log('\n📋 Test 3: Validating sample data...');
    const sampleData = {
      first_name: 'John',
      phone_number: '+94 77 123 4567',
      address: 'No. 123, Main Street, Colombo'
    };
    const validation = UserProfileService.validateProfileData(sampleData);
    console.log('Validation result:', validation);
    
    // Test 4: Format profile data
    console.log('\n📋 Test 4: Formatting profile data...');
    const formattedData = UserProfileService.formatProfileData(sampleData);
    console.log('Formatted data:', formattedData);
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Export for use in browser console
window.testUserProfileService = testUserProfileService;

// Auto-run test if this file is loaded directly
if (typeof window !== 'undefined') {
  console.log('🔧 UserProfileService test file loaded. Run testUserProfileService() to test.');
}
