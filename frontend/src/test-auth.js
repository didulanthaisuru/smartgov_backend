// Test authentication flow
import { AuthService } from './services/index.js';

// Test authentication data
const testAuthData = {
  token: 'test-token',
  userRole: 'user',
  userData: {
    nic: '123456789013',
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com'
  }
};

// Test functions
export const testAuthFlow = async () => {
  console.log('=== Testing Authentication Flow ===');
  
  // Test 1: Save auth data
  console.log('1. Testing saveAuthData...');
  AuthService.saveAuthData(testAuthData);
  
  // Test 2: Get auth data
  console.log('2. Testing getAuthData...');
  const authData = AuthService.getAuthData();
  console.log('Retrieved auth data:', authData);
  
  // Test 3: Check if authenticated
  console.log('3. Testing isAuthenticated...');
  const isAuth = AuthService.isAuthenticated();
  console.log('Is authenticated:', isAuth);
  
  // Test 4: Test login with backend
  console.log('4. Testing login with backend...');
  try {
    const result = await AuthService.login({
      nic: '123456789013',
      passcode: 'password123'
    });
    console.log('Login result:', result);
  } catch (error) {
    console.error('Login test failed:', error);
  }
  
  // Test 5: Clear auth data
  console.log('5. Testing logout...');
  AuthService.logout();
  const afterLogout = AuthService.isAuthenticated();
  console.log('After logout - Is authenticated:', afterLogout);
  
  console.log('=== Authentication Flow Test Complete ===');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testAuthFlow = testAuthFlow;
}
