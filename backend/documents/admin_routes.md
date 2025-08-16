# Admin Routes Documentation

## File: `backend/routes/admin.py`

### Overview
This module provides authentication and management endpoints for administrators. It handles admin registration, login, token management, and dashboard access with JWT-based authentication.

### Router Configuration
- **Prefix**: `/admin`
- **Tags**: `["Admin Authentication"]`

### Dependencies
- **Services**: `services.admin_auth_service`
- **Schemas**: `schemas.admin`
- **Models**: `models.AdminInDB`
- **Dependencies**: `dependencies.admin_auth`

---

## Endpoints

### 1. Register Admin
**Endpoint**: `POST /admin/register`

**Description**: Registers a new administrator in the system.

**Request Model**: `AdminRegister`
```json
{
  "admin_name": "string",
  "email": "string",
  "passcode": "string",
  "service_id": "string"
}
```

**Response Model**: `AdminResponse`
```json
{
  "admin_id": "string",
  "admin_name": "string",
  "email": "string",
  "service_id": "string"
}
```

**Status Code**: `201 Created`

**Service Function**: `admin_auth_service.register_admin_validation(admin_data)`

---

### 2. Admin Sign In
**Endpoint**: `POST /admin/sign_in`

**Description**: Authenticates an admin with email and password, returning a JWT token.

**Request Model**: `AdminLogin`
```json
{
  "email": "string",
  "passcode": "string"
}
```

**Response Model**: `AdminToken`
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

**Service Function**: `admin_auth_service.admin_sign_in_validation(login_data)`

---

### 3. OAuth2 Admin Token Endpoint
**Endpoint**: `POST /admin/token`

**Description**: OAuth2 compatible token endpoint for Swagger UI integration. Uses email as username.

**Request**: OAuth2 form data
- `username`: Admin email
- `password`: Admin password

**Response Model**: `AdminToken`
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

**Dependencies**: `OAuth2PasswordRequestForm`

---

### 4. Get Current Admin Info
**Endpoint**: `GET /admin/me`

**Description**: Retrieves information about the currently authenticated admin.

**Response Model**: `AdminResponse`
```json
{
  "admin_id": "string",
  "admin_name": "string",
  "email": "string",
  "service_id": "string"
}
```

**Dependencies**: `get_current_admin`

**Service Function**: `admin_auth_service.get_current_admin_info(current_admin)`

---

### 5. Admin Dashboard
**Endpoint**: `GET /admin/dashboard`

**Description**: Protected admin dashboard endpoint that requires authentication.

**Response**:
```json
{
  "message": "Welcome to admin dashboard, AdminName",
  "admin_id": "string",
  "service_id": "string",
  "role": "admin"
}
```

**Dependencies**: `get_current_admin`

---

### 6. Verify Admin Token
**Endpoint**: `GET /admin/verify`

**Description**: Verifies that the current admin's JWT token is valid and returns admin information.

**Response**:
```json
{
  "valid": true,
  "admin": {
    "admin_id": "string",
    "admin_name": "string",
    "service_id": "string",
    "email": "string"
  }
}
```

**Dependencies**: `get_current_admin`

---

## Admin Authentication Flow

### Registration Flow
1. Admin submits registration data
2. System validates input data
3. Password is hashed
4. Admin is created in database
5. Admin data is returned (without password)

### Login Flow
1. Admin submits email and password
2. System validates credentials
3. JWT token is generated
4. Token is returned to admin

### Token Verification Flow
1. Client includes JWT token in Authorization header
2. System validates token signature and expiration
3. Admin information is extracted from token
4. Request proceeds with authenticated admin context

---

## Related Files

### Schemas
- **File**: `backend/schemas/admin.py`
- **Purpose**: Defines Pydantic models for admin authentication requests/responses

### Services
- **File**: `backend/services/admin_auth_service.py`
- **Purpose**: Contains business logic for admin authentication operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for admin data

### Dependencies
- **File**: `backend/dependencies/admin_auth.py`
- **Purpose**: Admin authentication middleware and dependency injection

---

## Usage Examples

### Register New Admin
```bash
curl -X POST "http://localhost:8000/admin/register" \
  -H "Content-Type: application/json" \
  -d '{
    "admin_name": "John Admin",
    "email": "admin@example.com",
    "passcode": "securepassword123",
    "service_id": "service456"
  }'
```

### Admin Login
```bash
curl -X POST "http://localhost:8000/admin/sign_in" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "passcode": "securepassword123"
  }'
```

### Get Current Admin Info
```bash
curl -X GET "http://localhost:8000/admin/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Access Admin Dashboard
```bash
curl -X GET "http://localhost:8000/admin/dashboard" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Verify Admin Token
```bash
curl -X GET "http://localhost:8000/admin/verify" \
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
- Email format validation
- Service ID validation
- Admin name validation

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Invalid credentials or missing token
- **403 Forbidden**: Insufficient permissions
- **409 Conflict**: Admin already exists (registration)
- **422 Unprocessable Entity**: Validation errors

---

## Dependencies

- FastAPI for routing and HTTP handling
- FastAPI Security for OAuth2 integration
- JWT for token management
- Pydantic for data validation
- Custom admin auth service for business logic
- Password hashing libraries

---

## Future Enhancements

### Planned Features
- **Admin Role Management**: Different admin roles and permissions
- **Admin Profile Management**: Admin profile updates
- **Admin Activity Logging**: Track admin actions
- **Admin Password Reset**: Password recovery functionality

### Advanced Features
- **Multi-factor Authentication**: Additional security layers
- **Admin Session Management**: Session tracking and control
- **Admin Audit Trails**: Comprehensive activity logging
- **Admin Performance Metrics**: Admin activity analytics
