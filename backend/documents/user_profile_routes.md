# User Profile Routes Documentation

## File: `backend/routes/user_profile.py`

### Overview
This module provides user profile management functionality, allowing users to view and update their profile information including personal details, contact information, and profile pictures.

### Router Configuration
- **Prefix**: `/profile`
- **Tags**: `["UserProfile"]`

### Dependencies
- **Services**: `services.user_profile`
- **Schemas**: `schemas.usr_profile`

---

## Endpoints

### 1. Get User Profile
**Endpoint**: `GET /profile/user/{nic}`

**Description**: Retrieves the profile information for a specific user by their NIC (National Identity Card) number.

**Parameters**:
- `nic` (path): The NIC number of the user

**Response Model**: `UserProfile`
```json
{
  "nic": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone_number": "string",
  "address": "string",
  "profile_picture": "string"
}
```

**Service Function**: `get_user(nic)`

---

### 2. Update User Profile
**Endpoint**: `PUT /profile/user/{nic}`

**Description**: Updates the profile information for a specific user, supporting partial updates of profile fields.

**Parameters**:
- `nic` (path): The NIC number of the user

**Request**: Form data with optional fields
- `first_name` (Form, optional): User's first name
- `phone_number` (Form, optional): User's phone number
- `address` (Form, optional): User's address
- `profile_picture` (File, optional): User's profile picture

**Response**:
```json
{
  "message": "Profile updated successfully",
  "updated_fields": ["string"],
  "user_profile": {
    "nic": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone_number": "string",
    "address": "string",
    "profile_picture": "string"
  }
}
```

**Service Function**: `update_user(nic, first_name, phone_number, address, profile_picture)`

---

## Profile Management Features

### Profile Retrieval
- **NIC-based Access**: Profiles accessed by NIC number
- **Complete Information**: Full profile details returned
- **Secure Access**: User authentication required
- **Profile Picture Support**: Image URL included in response

### Profile Updates
- **Partial Updates**: Only specified fields are updated
- **File Upload**: Profile picture upload support
- **Validation**: Input validation for all fields
- **Flexible Fields**: Optional field updates

---

## Related Files

### Schemas
- **File**: `backend/schemas/usr_profile.py`
- **Purpose**: Defines Pydantic models for user profile requests/responses

### Services
- **File**: `backend/services/user_profile.py`
- **Purpose**: Contains business logic for profile operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for user data

---

## Usage Examples

### Get User Profile
```bash
curl -X GET "http://localhost:8000/profile/user/1234567890123"
```

### Update User Profile (Text Fields)
```bash
curl -X PUT "http://localhost:8000/profile/user/1234567890123" \
  -F "first_name=John" \
  -F "phone_number=+1234567890" \
  -F "address=123 Main Street, City"
```

### Update User Profile with Picture
```bash
curl -X PUT "http://localhost:8000/profile/user/1234567890123" \
  -F "first_name=John" \
  -F "profile_picture=@profile.jpg"
```

---

## Profile Data Structure

### Required Fields
- **NIC**: National Identity Card number (unique identifier)
- **First Name**: User's first name
- **Last Name**: User's last name
- **Email**: User's email address

### Optional Fields
- **Phone Number**: Contact phone number
- **Address**: User's address
- **Profile Picture**: Profile image file

### Profile Picture Handling
- **File Upload**: Multipart form data support
- **Image Processing**: Automatic image processing
- **Storage**: Secure file storage
- **URL Generation**: Accessible image URLs

---

## Business Rules

### Profile Access
- Users can only access their own profile
- NIC number is the primary identifier
- Profile data is protected by authentication
- Admin access for user management

### Profile Updates
- Partial updates are supported
- Only valid fields can be updated
- Profile picture is optional
- Validation ensures data integrity

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid profile data
- **404 Not Found**: User not found
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: File upload errors

---

## Security Considerations

### Access Control
- User authentication required
- NIC-based profile access
- Profile ownership validation
- Secure file upload handling

### Data Privacy
- Personal information protection
- Secure profile picture storage
- Data encryption for sensitive fields
- GDPR compliance considerations

---

## Performance Considerations

### Database Optimization
- Indexed queries on NIC
- Efficient profile retrieval
- Optimized update operations
- Caching for frequently accessed profiles

### File Handling
- Efficient image processing
- Optimized file storage
- Image compression and resizing
- CDN integration for images

---

## Dependencies

- FastAPI for routing and HTTP handling
- Pydantic for data validation
- File upload handling
- Custom user profile service for business logic
- Database models for data persistence
- Image processing libraries

---

## Future Enhancements

### Planned Features
- **Profile Verification**: Email/phone verification
- **Profile Privacy**: Privacy settings and controls
- **Profile Analytics**: Profile completion metrics
- **Profile Templates**: Predefined profile templates

### Advanced Features
- **Profile Import/Export**: Data portability
- **Profile History**: Change tracking
- **Profile Backup**: Automatic profile backups
- **Profile Sharing**: Controlled profile sharing
