# Service Layer Architecture

This directory contains the service layer for the SmartGov frontend application, following standard practices and maintaining good code quality.

## 📁 File Structure

```
services/
├── api.js              # Base API service with HTTP methods and error handling
├── authService.js      # Authentication-related API calls
├── userService.js      # User-related API calls
├── index.js           # Centralized exports for easy importing
└── README.md          # This documentation file
```

## 🏗️ Architecture Overview

### Base API Service (`api.js`)
- **Purpose**: Provides common HTTP methods and error handling
- **Features**:
  - Automatic token management
  - Centralized error handling
  - Response status code handling
  - Network error detection
  - Automatic logout on 401 errors

### Authentication Service (`authService.js`)
- **Purpose**: Handles all authentication-related operations
- **Methods**:
  - `login()` - User login
  - `register()` - User registration
  - `verifyToken()` - Verify user token
  - `getCurrentUser()` - Get current user info
  - `adminLogin()` - Admin login
  - `adminRegister()` - Admin registration
  - `verifyAdminToken()` - Verify admin token
  - `logout()` - Client-side logout
  - `isAuthenticated()` - Check auth status
  - `getAuthData()` - Get stored auth data
  - `saveAuthData()` - Save auth data

### User Service (`userService.js`)
- **Purpose**: Handles user-related operations
- **Methods**:
  - `getProfile()` - Get user profile
  - `updateProfile()` - Update user profile
  - `changePassword()` - Change password
  - `requestPasswordReset()` - Request password reset
  - `resetPassword()` - Reset password
  - `getActivities()` - Get user activities
  - `getAppointments()` - Get user appointments
  - `getDocuments()` - Get user documents
  - `uploadDocument()` - Upload document
  - `deleteDocument()` - Delete document

## 🚀 Usage Examples

### Basic Import
```javascript
import { AuthService, UserService, ApiService } from '../services';
```

### Authentication
```javascript
// Login
const result = await AuthService.login({
  nic: '123456789012',
  passcode: 'password123'
});

if (result.success) {
  // Handle successful login
  console.log(result.data);
} else {
  // Handle error
  console.error(result.error);
}

// Registration
const registerResult = await AuthService.register({
  first_name: 'John',
  last_name: 'Doe',
  nic: '123456789012',
  phone_number: '+1234567890',
  email: 'john@example.com',
  passcode: 'password123'
});
```

### User Operations
```javascript
// Get user profile
const profileResult = await UserService.getProfile();

// Update profile
const updateResult = await UserService.updateProfile({
  first_name: 'Jane',
  last_name: 'Smith'
});

// Get user activities
const activitiesResult = await UserService.getActivities();
```

### Direct API Calls
```javascript
// GET request
const data = await ApiService.get('/some-endpoint');

// POST request
const response = await ApiService.post('/some-endpoint', {
  key: 'value'
});

// PUT request
const updateResponse = await ApiService.put('/some-endpoint', {
  key: 'new-value'
});
```

## 🔧 Configuration

### API Base URL
The API base URL is configured in `api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api/v1';
```

### Authentication Headers
Authentication headers are automatically added to requests when `includeAuth` is not set to `false`:
```javascript
// With auth header (default)
await ApiService.get('/protected-endpoint');

// Without auth header
await ApiService.get('/public-endpoint', { includeAuth: false });
```

## 🛡️ Error Handling

All services return consistent error responses:
```javascript
{
  success: false,
  error: 'Error message'
}
```

### Common Error Scenarios
- **401 Unauthorized**: Automatic logout and redirect to login
- **403 Forbidden**: Access denied error
- **404 Not Found**: Resource not found error
- **500+ Server Error**: Server error message
- **Network Error**: Connection error message

## 📝 Best Practices

### 1. Always Check Success Status
```javascript
const result = await AuthService.login(credentials);
if (result.success) {
  // Handle success
} else {
  // Handle error
  console.error(result.error);
}
```

### 2. Use Try-Catch for Error Handling
```javascript
try {
  const result = await UserService.getProfile();
  // Handle result
} catch (error) {
  console.error('Unexpected error:', error);
}
```

### 3. Consistent Response Format
All service methods return objects with `success` and either `data` or `error` properties.

### 4. Automatic Token Management
The service layer automatically:
- Adds authentication headers
- Handles token expiration
- Redirects to login on authentication failures

## 🔄 Integration with Components

### Login Component
```javascript
import { AuthService } from '../../services';

const handleLogin = async () => {
  const result = await AuthService.login({
    nic: nicNumber,
    passcode: password
  });
  
  if (result.success) {
    login(result.data.user, 'user', result.data.access_token);
    navigate('/services');
  } else {
    setError(result.error);
  }
};
```

### SignUp Component
```javascript
import { AuthService } from '../../services';

const handleSignUp = async () => {
  const result = await AuthService.register(formData);
  
  if (result.success) {
    setSuccess('Account created successfully!');
    // Auto-login logic...
  } else {
    setError(result.error);
  }
};
```

## 🧪 Testing

The service layer is designed to be easily testable:
- Mock the `ApiService` for unit tests
- Test error scenarios
- Verify response format consistency

## 📈 Future Enhancements

- Add request/response interceptors
- Implement request caching
- Add request retry logic
- Support for different API environments (dev, staging, prod)
- Add request/response logging
- Implement offline support
