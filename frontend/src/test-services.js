// Test file to verify service layer imports
import { ApiService, AuthService, UserService } from './services/index.js';

console.log('Testing service layer imports...');

// Test if services are properly imported
console.log('ApiService:', typeof ApiService);
console.log('AuthService:', typeof AuthService);
console.log('UserService:', typeof UserService);

// Test if methods exist
console.log('ApiService.get:', typeof ApiService.get);
console.log('AuthService.login:', typeof AuthService.login);
console.log('UserService.getProfile:', typeof UserService.getProfile);

// Test API base URL
console.log('API Base URL should be:', 'http://localhost:8000/api/v1');

export default {
  ApiService,
  AuthService,
  UserService
};
