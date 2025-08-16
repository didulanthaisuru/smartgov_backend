# Profile Page Backend-Frontend Integration Guide

## Overview
This document explains the integration between the backend appointment APIs and the frontend ProfilePage component.

## Backend APIs Used

### 1. Appointment Summary Endpoints
All endpoints require a `user_request` with `user_id` in the request body.

#### GET Ongoing Appointments
- **Endpoint**: `POST /appointments_view/ongoing`
- **Purpose**: Get appointments with dates set and not fully completed
- **Response**: `List[appointment_summary_response]`

#### GET Incomplete Appointments  
- **Endpoint**: `POST /appointments_view/incomplete`
- **Purpose**: Get appointments without dates set or not confirmed
- **Response**: `List[appointment_summary_response]`

#### GET Previous Appointments
- **Endpoint**: `POST /appointments_view/previous`
- **Purpose**: Get fully completed appointments
- **Response**: `List[appointment_summary_response]`

### 2. Appointment Detail Endpoints

#### GET Ongoing Appointment Details
- **Endpoint**: `POST /appointments_view/ongoing/{appointment_id}`
- **Purpose**: Get detailed info for specific ongoing appointment
- **Response**: `appointment_detail_response`

#### GET Incomplete Appointment Details
- **Endpoint**: `POST /appointments_view/incomplete/{appointment_id}`
- **Purpose**: Get detailed info for specific incomplete appointment
- **Response**: `appointment_detail_response`

#### GET Previous Appointment Details
- **Endpoint**: `POST /appointments_view/previous/{appointment_id}`
- **Purpose**: Get detailed info for specific completed appointment
- **Response**: `appointment_detail_response`

## Frontend Implementation

### 1. AppointmentService (`frontend/src/services/appointmentService.js`)
Created a service class that handles all appointment-related API calls:

- `getOngoingAppointments(userId)` - Fetches ongoing appointments
- `getIncompleteAppointments(userId)` - Fetches incomplete appointments  
- `getPreviousAppointments(userId)` - Fetches previous appointments
- `getOngoingAppointmentDetails(appointmentId, userId)` - Fetches detailed ongoing appointment
- `getIncompleteAppointmentDetails(appointmentId, userId)` - Fetches detailed incomplete appointment
- `getPreviousAppointmentDetails(appointmentId, userId)` - Fetches detailed previous appointment
- `calculateProgress(appointments)` - Calculates progress percentage
- `countRequiredDocuments(appointments)` - Counts required documents

### 2. Updated ProfilePage (`frontend/src/pages/ProfilePage.jsx`)
The ProfilePage now:

- **Fetches real data** from backend APIs instead of using hardcoded values
- **Shows loading states** while data is being fetched
- **Handles errors** gracefully with user-friendly error messages
- **Displays dynamic counts** for each activity type
- **Calculates real progress** based on appointment completion status
- **Shows user information** from authentication data

### 3. Test Component (`frontend/src/components/ProfileTest.jsx`)
Created a test component to verify API connectivity and data flow.

## Data Flow

1. **User Authentication**: ProfilePage gets user data from `AuthService.getAuthData()`
2. **API Calls**: Makes parallel calls to fetch ongoing, incomplete, and previous appointments
3. **Data Processing**: Calculates progress and document counts
4. **UI Updates**: Displays real data with appropriate loading and error states

## Key Features

### Dynamic Data Display
- **Ongoing Activities**: Shows real progress percentage and count
- **Incomplete Activities**: Shows actual count and required documents
- **Previous Activities**: Shows completed activities count
- **Messages**: Placeholder for future message integration

### Error Handling
- Network errors
- Authentication errors
- API errors
- Missing user data

### Loading States
- Spinner while fetching data
- Graceful error recovery
- Retry functionality

## Testing

### 1. Using ProfileTest Component
1. Navigate to the ProfileTest component
2. Enter a user ID (optional - will use logged in user if empty)
3. Click "Run API Tests"
4. Review the results for each API endpoint

### 2. Manual Testing
1. Login to the application
2. Navigate to the Profile page
3. Verify that real data is displayed
4. Check that counts and progress are accurate
5. Test error scenarios (disconnect backend, invalid user ID, etc.)

## Configuration

### API Base URL
The API base URL is configured in `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api/v1';
```

### Authentication
The service uses JWT tokens stored in localStorage for authentication.

## Future Enhancements

1. **Real-time Updates**: Implement WebSocket connections for live updates
2. **Caching**: Add client-side caching for better performance
3. **Pagination**: Handle large numbers of appointments
4. **Filtering**: Add filters for date ranges, service types, etc.
5. **Export**: Allow users to export their appointment data
6. **Notifications**: Real-time notifications for appointment updates

## Troubleshooting

### Common Issues

1. **"User data not found" Error**
   - Ensure user is logged in
   - Check localStorage for valid auth data
   - Verify user ID format

2. **API Connection Errors**
   - Check if backend server is running
   - Verify API base URL configuration
   - Check CORS settings

3. **Empty Data**
   - Verify user has appointments in the database
   - Check appointment status values
   - Ensure proper user ID is being used

4. **Progress Calculation Issues**
   - Verify `is_fully_completed` field in appointment data
   - Check appointment status logic

### Debug Steps

1. Use browser developer tools to check network requests
2. Use ProfileTest component to isolate API issues
3. Check console logs for error messages
4. Verify backend API responses using tools like Postman

## File Structure

```
frontend/src/
├── services/
│   ├── api.js                    # Base API service
│   ├── authService.js            # Authentication service
│   └── appointmentService.js     # Appointment API service
├── pages/
│   └── ProfilePage.jsx           # Updated profile page
├── components/
│   └── ProfileTest.jsx           # Test component
└── documents/
    └── profile-integration-guide.md  # This guide
```

## API Response Examples

### Appointment Summary Response
```json
{
  "appointment_id": "507f1f77bcf86cd799439011",
  "service_name": "Birth Certificate",
  "appointment_date": "2024-01-15T10:00:00Z",
  "is_fully_completed": false
}
```

### Appointment Detail Response
```json
{
  "appointment_id": "507f1f77bcf86cd799439011",
  "user_id": "user123",
  "service_name": "Birth Certificate",
  "payment_amount": 500.0,
  "required_documents": [
    {
      "required_doc_id": "doc1",
      "doc_name": "ID Card",
      "description": "Valid government ID"
    }
  ],
  "uploaded_documents": [
    {
      "uploaded_document_id": "upload1",
      "file_name": "id_card.pdf",
      "doc_status": "Approved",
      "uploaded_at": "2024-01-10T09:00:00Z"
    }
  ],
  "is_fully_completed": false,
  "appointment_date": "2024-01-15T10:00:00Z"
}
```

