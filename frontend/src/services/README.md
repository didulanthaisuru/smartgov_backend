# Services Layer Documentation

This directory contains the service layer for the SmartGov frontend application. The services are designed to handle all API communication and data processing logic.

## Service Architecture

### Core Services

#### 1. **ApiService** (`api.js`)
- Base service for HTTP requests
- Handles authentication headers
- Provides centralized error handling
- Base URL configuration

#### 2. **AuthService** (`authService.js`)
- User authentication and authorization
- Token management
- User data storage and retrieval
- Login/logout functionality

#### 3. **AppointmentService** (`appointmentService.js`)
- Appointment-related API calls
- Appointment statistics and calculations
- Progress tracking
- Document counting utilities

#### 4. **MessageService** (`messageService.js`)
- Message-related functionality
- Unread message counting
- Message status management
- Mock data for development

#### 5. **ProfileService** (`profileService.js`)
- **Main orchestrator service**
- Combines data from multiple services
- Profile page data aggregation
- Utility functions for UI display

#### 6. **UserService** (`userService.js`)
- User profile management
- User data updates
- User preferences

## Service Integration Flow

```
ProfilePage.jsx
    ↓
ProfileService.getProfileData()
    ↓
├── AppointmentService.getAppointmentStatistics()
├── MessageService.getMessageStatistics()
└── AuthService.getAuthData()
    ↓
Returns combined profile data
```

## Key Features

### 1. **Data Aggregation**
- `ProfileService.getProfileData()` fetches all necessary data in parallel
- Combines appointments, messages, and user data
- Provides fallback values for error scenarios

### 2. **Real-time Calculations**
- Progress percentages for ongoing activities
- Document requirement counts
- Unread message counts
- Dynamic menu item generation

### 3. **Error Handling**
- Graceful degradation when services fail
- Fallback data structures
- User-friendly error messages

### 4. **Performance Optimization**
- Parallel API calls using `Promise.all()`
- Caching strategies (can be implemented)
- Efficient data processing

## Usage Examples

### Basic Profile Data Fetching
```javascript
import ProfileService from '../services/profileService';

const profileData = await ProfileService.getProfileData(userId);
if (profileData.success) {
  // Use profileData.data
  const { user, appointments, messages } = profileData.data;
}
```

### Menu Item Generation
```javascript
import ProfileService from '../services/profileService';

const menuItems = ProfileService.generateMenuItems(profileData, navigate);
```

### Utility Functions
```javascript
import ProfileService from '../services/profileService';

const displayName = ProfileService.getUserDisplayName(userData);
const maskedNIC = ProfileService.getMaskedNIC(userData.nic);
```

## API Endpoints Used

### Appointment Endpoints
- `POST /appointments_view/ongoing` - Get ongoing appointments
- `POST /appointments_view/incomplete` - Get incomplete appointments
- `POST /appointments_view/previous` - Get completed appointments
- `POST /appointments_view/ongoing/{id}` - Get ongoing appointment details
- `POST /appointments_view/incomplete/{id}` - Get incomplete appointment details
- `POST /appointments_view/previous/{id}` - Get completed appointment details

### Message Endpoints (Planned)
- `GET /messages` - Get user messages
- `GET /messages/unread-count` - Get unread count
- `PUT /messages/{id}/read` - Mark message as read

## Development Notes

### Mock Data
- MessageService currently uses mock data
- Replace with actual API endpoints when available
- Maintain same data structure for seamless transition

### Error Handling
- All services return consistent error format
- `{ success: boolean, error?: string, data?: any }`
- Components should check `success` before using `data`

### Testing
- Use `test-profile-integration.js` for service testing
- Run in browser console: `testProfileIntegration()`
- Test utility functions: `testUtilityFunctions()`

## Future Enhancements

1. **Caching Layer**
   - Implement service worker for offline support
   - Add Redis-like caching for frequently accessed data

2. **Real-time Updates**
   - WebSocket integration for live updates
   - Push notifications for new messages

3. **Advanced Analytics**
   - User behavior tracking
   - Performance metrics
   - Error reporting

4. **Service Worker**
   - Offline functionality
   - Background sync
   - Push notifications
