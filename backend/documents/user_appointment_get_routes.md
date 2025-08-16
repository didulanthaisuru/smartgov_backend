# User Appointment Get Routes Documentation

## File: `backend/routes/user_appointment_get.py`

### Overview
This module provides comprehensive appointment retrieval functionality for users, allowing them to view their appointments categorized by status (ongoing, incomplete, and previous). It supports both summary lists and detailed appointment information.

### Router Configuration
- **Prefix**: `/appointments_view`
- **Tags**: `["AppointmentsView"]`

### Dependencies
- **Services**: `services.user_appointment_get`
- **Schemas**: `schemas.user_appointment_get`
- **Database**: `database_config.db`

---

## Endpoints

### 1. Get Ongoing Appointments
**Endpoint**: `POST /appointments_view/ongoing`

**Description**: Retrieves a list of user's ongoing appointments where a date has been set.

**Request Model**: `user_request`
```json
{
  "user_id": "string"
}
```

**Response Model**: `List[appointment_summary_response]`
```json
[
  {
    "appointment_id": "string",
    "sub_service_name": "string",
    "main_service_name": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "status": "string",
    "payment_status": "boolean"
  }
]
```

**Service Function**: `get_user_appointments_by_status(db, user_req.user_id, is_ongoing=True)`

---

### 2. Get Incomplete Appointments
**Endpoint**: `POST /appointments_view/incomplete`

**Description**: Retrieves a list of user's incomplete appointments where a date has NOT been set.

**Request Model**: `user_request`
```json
{
  "user_id": "string"
}
```

**Response Model**: `List[appointment_summary_response]`
```json
[
  {
    "appointment_id": "string",
    "sub_service_name": "string",
    "main_service_name": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "status": "string",
    "payment_status": "boolean"
  }
]
```

**Service Function**: `get_user_appointments_by_status(db, user_req.user_id, is_ongoing=False)`

---

### 3. Get Previous Appointments
**Endpoint**: `POST /appointments_view/previous`

**Description**: Retrieves a list of user's previous (fully completed) appointments.

**Request Model**: `user_request`
```json
{
  "user_id": "string"
}
```

**Response Model**: `List[appointment_summary_response]`
```json
[
  {
    "appointment_id": "string",
    "sub_service_name": "string",
    "main_service_name": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "status": "string",
    "payment_status": "boolean"
  }
]
```

**Service Function**: `get_previous_appointments(db, user_req.user_id)`

---

### 4. Get Ongoing Appointment Details
**Endpoint**: `POST /appointments_view/ongoing/{appointment_id}`

**Description**: Retrieves detailed information for a specific ongoing appointment.

**Parameters**:
- `appointment_id` (path): The unique identifier of the appointment

**Request Model**: `user_request`
```json
{
  "user_id": "string"
}
```

**Response Model**: `appointment_detail_response`
```json
{
  "appointment_id": "string",
  "user_info": {
    "user_id": "string",
    "user_name": "string",
    "user_email": "string",
    "user_phone": "string"
  },
  "service_info": {
    "sub_service_id": "string",
    "sub_service_name": "string",
    "main_service_name": "string",
    "payment_amount": "float"
  },
  "appointment_info": {
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "duration": "integer",
    "status": "string",
    "payment_status": "boolean"
  },
  "documents": [
    {
      "document_id": "string",
      "document_name": "string",
      "upload_status": "string"
    }
  ]
}
```

**Error Responses**:
- `404`: Ongoing appointment not found for this user

**Service Function**: `get_ongoing_appointment_details(db, appointment_id, user_req.user_id)`

---

### 5. Get Incomplete Appointment Details
**Endpoint**: `POST /appointments_view/incomplete/{appointment_id}`

**Description**: Retrieves detailed information for a specific incomplete appointment.

**Parameters**:
- `appointment_id` (path): The unique identifier of the appointment

**Request Model**: `user_request`
```json
{
  "user_id": "string"
}
```

**Response Model**: `appointment_detail_response`
```json
{
  "appointment_id": "string",
  "user_info": {...},
  "service_info": {...},
  "appointment_info": {...},
  "documents": [...]
}
```

**Error Responses**:
- `404`: Incomplete appointment not found for this user

**Service Function**: `get_incomplete_appointment_details(db, appointment_id, user_req.user_id)`

---

### 6. Get Previous Appointment Details
**Endpoint**: `POST /appointments_view/previous/{appointment_id}`

**Description**: Retrieves detailed information for a specific previous (completed) appointment.

**Parameters**:
- `appointment_id` (path): The unique identifier of the appointment

**Request Model**: `user_request`
```json
{
  "user_id": "string"
}
```

**Response Model**: `appointment_detail_response`
```json
{
  "appointment_id": "string",
  "user_info": {...},
  "service_info": {...},
  "appointment_info": {...},
  "documents": [...]
}
```

**Error Responses**:
- `404`: Previous appointment not found for this user

**Service Function**: `get_previous_appointment_details(db, appointment_id, user_req.user_id)`

---

## Appointment Status Categories

### Ongoing Appointments
- **Definition**: Appointments with scheduled dates
- **Status**: Active and confirmed
- **Use Case**: Upcoming appointments to attend
- **Actions**: View details, prepare documents

### Incomplete Appointments
- **Definition**: Appointments without scheduled dates
- **Status**: Pending completion
- **Use Case**: Appointments needing completion
- **Actions**: Complete booking, schedule date

### Previous Appointments
- **Definition**: Fully completed appointments
- **Status**: Finished and archived
- **Use Case**: Historical records
- **Actions**: View history, provide ratings

---

## Related Files

### Schemas
- **File**: `backend/schemas/user_appointment_get.py`
- **Purpose**: Defines Pydantic models for appointment requests/responses

### Services
- **File**: `backend/services/user_appointment_get.py`
- **Purpose**: Contains business logic for appointment retrieval

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for appointments and users

---

## Usage Examples

### Get Ongoing Appointments
```bash
curl -X POST "http://localhost:8000/appointments_view/ongoing" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123"
  }'
```

### Get Incomplete Appointments
```bash
curl -X POST "http://localhost:8000/appointments_view/incomplete" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123"
  }'
```

### Get Previous Appointments
```bash
curl -X POST "http://localhost:8000/appointments_view/previous" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123"
  }'
```

### Get Ongoing Appointment Details
```bash
curl -X POST "http://localhost:8000/appointments_view/ongoing/appointment789" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123"
  }'
```

---

## Data Models

### Appointment Summary
- Basic appointment information for list views
- Service names and appointment timing
- Status and payment information
- Quick overview for user dashboard

### Appointment Details
- Complete appointment information
- User profile details
- Service information and pricing
- Document upload status
- Comprehensive appointment view

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid user ID or request data
- **404 Not Found**: Appointment not found for user
- **500 Internal Server Error**: Database connection issues

---

## Security Considerations

### Access Control
- User authentication required
- User can only access their own appointments
- Appointment ownership validation
- Secure data transmission

### Data Privacy
- User-specific appointment filtering
- Protected appointment information
- Secure user identification
- Privacy-compliant data handling

---

## Performance Considerations

### Database Optimization
- Efficient user-specific queries
- Indexed searches on user_id and appointment_id
- Optimized joins for detailed views
- Pagination for large appointment lists

### Caching Strategy
- Cache frequently accessed appointment lists
- Cache user appointment summaries
- Implement cache invalidation on updates
- Optimize for mobile app performance

---

## Dependencies

- FastAPI for routing and HTTP handling
- Motor for async MongoDB operations
- Pydantic for data validation
- Custom user appointment service for business logic
- Database configuration for MongoDB connection
