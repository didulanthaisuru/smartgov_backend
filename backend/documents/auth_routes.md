# Authentication Routes Documentation

## File: `backend/routes/auth.py`

### Overview
This module provides authentication endpoints for user registration, login, and token management. It handles user authentication using NIC (National Identity Card) and password, with JWT token-based authentication.

### Router Configuration
- **Prefix**: `/auth`
- **Tags**: `["Authentication"]`

### Dependencies
- **Services**: `services.auth_service`
- **Schemas**: `schemas.auth`
- **Models**: `models.UserInDB`
- **Dependencies**: `dependencies.auth`

---

## Endpoints

### 1. User Registration
**Endpoint**: `POST /auth/register`

**Description**: Registers a new user in the system.

**Request Model**: `UserRegister`
```json
{
  "first_name": "string",
  "last_name": "string",
  "nic": "string",
  "email": "string",
  "phone_number": "string",
  "passcode": "string"
}
```

**Response Model**: `UserResponse`
```json
{
  "first_name": "string",
  "last_name": "string",
  "nic": "string",
  "email": "string",
  "phone_number": "string"
}
```

**Status Code**: `201 Created`

**Service Function**: `auth_service.register_user_validation(user_data)`

---

### 2. User Sign In
**Endpoint**: `POST /auth/sign_in`

**Description**: Authenticates a user with NIC and password, returning a JWT token.

**Request Model**: `UserLogin`
```json
{
  "nic": "string",
  "passcode": "string"
}
```

**Response Model**: `Token`
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

**Service Function**: `auth_service.sign_in_validation(login_data)`

---

### 3. OAuth2 Token Endpoint
**Endpoint**: `POST /auth/token`

**Description**: OAuth2 compatible token endpoint for Swagger UI integration. Uses NIC as username.

**Request**: OAuth2 form data
- `username`: NIC number
- `password`: User password

**Response Model**: `Token`
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

**Dependencies**: `OAuth2PasswordRequestForm`

---

### 4. Get Current User Info
**Endpoint**: `GET /auth/me`

**Description**: Retrieves information about the currently authenticated user.

**Response Model**: `UserResponse`
```json
{
  "first_name": "string",
  "last_name": "string",
  "nic": "string",
  "email": "string",
  "phone_number": "string"
}
```

**Dependencies**: `get_current_user`

**Service Function**: `auth_service.get_current_user_info(current_user)`

---

### 5. Verify User Token
**Endpoint**: `GET /auth/verify`

**Description**: Verifies that the current user's JWT token is valid and returns user information.

**Response**:
```json
{
  "valid": true,
  "user": {
    "first_name": "string",
    "last_name": "string",
    "nic": "string",
    "email": "string",
    "phone_number": "string"
  }
}
```

**Dependencies**: `get_current_user`

---

## Authentication Flow

### Registration Flow
1. User submits registration data
2. System validates input data
3. Password is hashed
4. User is created in database
5. User data is returned (without password)

### Login Flow
1. User submits NIC and password
2. System validates credentials
3. JWT token is generated
4. Token is returned to user

### Token Verification Flow
1. Client includes JWT token in Authorization header
2. System validates token signature and expiration
3. User information is extracted from token
4. Request proceeds with authenticated user context

---

## Related Files

### Schemas
- **File**: `backend/schemas/auth.py`
- **Purpose**: Defines Pydantic models for authentication requests/responses

### Services
- **File**: `backend/services/auth_service.py`
- **Purpose**: Contains business logic for authentication operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for user data

### Dependencies
- **File**: `backend/dependencies/auth.py`
- **Purpose**: Authentication middleware and dependency injection

---

## Usage Examples

### Register New User
```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "nic": "1234567890123",
    "email": "john.doe@example.com",
    "phone_number": "+1234567890",
    "passcode": "securepassword123"
  }'
```

### User Login
```bash
curl -X POST "http://localhost:8000/auth/sign_in" \
  -H "Content-Type: application/json" \
  -d '{
    "nic": "1234567890123",
    "passcode": "securepassword123"
  }'
```

### Get Current User Info
```bash
curl -X GET "http://localhost:8000/auth/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Verify Token
```bash
curl -X GET "http://localhost:8000/auth/verify" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Security Features

### Password Security
- Passwords are hashed using secure algorithms
- Password validation ensures strong passwords
- No plain text passwords are stored

### JWT Token Security
- Tokens have expiration times
- Tokens are signed with secret keys
- Token validation on every protected request

### Input Validation
- All input data is validated using Pydantic models
- NIC format validation
- Email format validation
- Phone number format validation

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Invalid credentials or missing token
- **403 Forbidden**: Insufficient permissions
- **409 Conflict**: User already exists (registration)
- **422 Unprocessable Entity**: Validation errors

---

## Dependencies

- FastAPI for routing and HTTP handling
- FastAPI Security for OAuth2 integration
- JWT for token management
- Pydantic for data validation
- Custom auth service for business logic
- Password hashing libraries
