# Appointment Routes Documentation

## File: `backend/routes/appoinment.py`

### Overview
This module provides comprehensive appointment management endpoints, allowing users to create, update, retrieve, and confirm appointments. It supports both complete appointments with all details and empty appointments for later completion.

### Router Configuration
- **Prefix**: `/appointment_creation`
- **Tags**: `["AppointmentCreation"]`

### Dependencies
- **Services**: `services.appoinment`
- **Schemas**: `schemas.appoinment`

---

## Endpoints

### 1. Create Complete Appointment
**Endpoint**: `POST /appointment_creation/`

**Description**: Creates a complete appointment with all required details in a single request.

**Request Model**: `AppointmentAdd`
```json
{
  "user_id": "string",
  "sub_service_id": "string",
  "appointment_date": "datetime",
  "appointment_time": "datetime",
  "predicted_duration": "integer",
  "payment_status": "boolean",
  "additional_notes": "string"
}
```

**Response Model**: `AppointmentCreateResponse`
```json
{
  "appointment_id": "string",
  "message": "string",
  "status": "string"
}
```

**Service Function**: `create_appointment_service(data)`

---

### 2. Create Empty Appointment
**Endpoint**: `POST /appointment_creation/empty`

**Description**: Creates an empty appointment with minimal data and returns the ObjectId for later completion.

**Request Model**: `EmptyAppointmentCreate`
```json
{
  "user_id": "string",
  "sub_service_id": "string"
}
```

**Response Model**: `EmptyAppointmentResponse`
```json
{
  "appointment_id": "string",
  "message": "string"
}
```

**Service Function**: `create_empty_appointment_service(data)`

---

### 3. Get User Appointments
**Endpoint**: `GET /appointment_creation/user/{user_id}`

**Description**: Retrieves all appointments for a specific user.

**Parameters**:
- `user_id` (path): The unique identifier of the user

**Response Model**: `List[AppointmentResponse]`
```json
[
  {
    "appointment_id": "string",
    "user_id": "string",
    "sub_service_id": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "predicted_duration": "integer",
    "payment_status": "boolean",
    "appointment_confirmed": "boolean",
    "is_fully_completed": "boolean",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
]
```

**Service Function**: `get_appointments_by_user_service(user_id)`

---

### 4. Get Appointment by ID
**Endpoint**: `GET /appointment_creation/{appointment_id}`

**Description**: Retrieves detailed information for a specific appointment.

**Parameters**:
- `appointment_id` (path): The unique identifier of the appointment

**Response Model**: `AppointmentResponse`
```json
{
  "appointment_id": "string",
  "user_id": "string",
  "sub_service_id": "string",
  "appointment_date": "datetime",
  "appointment_time": "datetime",
  "predicted_duration": "integer",
  "payment_status": "boolean",
  "appointment_confirmed": "boolean",
  "is_fully_completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**Service Function**: `get_appointment_service(appointment_id)`

---

### 5. Update Appointment
**Endpoint**: `PATCH /appointment_creation/{appointment_id}`

**Description**: Updates an existing appointment with partial data.

**Parameters**:
- `appointment_id` (path): The unique identifier of the appointment

**Request Model**: `AppointmentUpdate`
```json
{
  "appointment_date": "datetime",
  "appointment_time": "datetime",
  "predicted_duration": "integer",
  "payment_status": "boolean",
  "additional_notes": "string"
}
```

**Response Model**: `AppointmentUpdateResponse`
```json
{
  "appointment_id": "string",
  "message": "string",
  "updated_fields": ["string"]
}
```

**Service Function**: `update_appointment_service(appointment_id, data)`

---

### 6. Confirm Appointment
**Endpoint**: `PUT /appointment_creation/{appointment_id}/confirm`

**Description**: Confirms an appointment by setting appointment_confirmed to True.

**Parameters**:
- `appointment_id` (path): The unique identifier of the appointment

**Response Model**: `AppointmentConfirmResponse`
```json
{
  "appointment_id": "string",
  "message": "string",
  "appointment_confirmed": "boolean"
}
```

**Service Function**: `confirm_appointment_service(appointment_id)`

---

## Appointment Lifecycle

### 1. Empty Appointment Creation
- User creates basic appointment with minimal data
- System generates appointment ID
- Appointment is marked as incomplete

### 2. Appointment Completion
- User updates appointment with full details
- System validates appointment data
- Appointment becomes ready for confirmation

### 3. Appointment Confirmation
- Admin or system confirms appointment
- Appointment status changes to confirmed
- User can proceed with service

### 4. Appointment Completion
- Service is provided
- Appointment is marked as fully completed
- User can provide ratings and feedback

---

## Related Files

### Schemas
- **File**: `backend/schemas/appoinment.py`
- **Purpose**: Defines Pydantic models for appointment requests/responses

### Services
- **File**: `backend/services/appoinment.py`
- **Purpose**: Contains business logic for appointment operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for appointment data

---

## Usage Examples

### Create Complete Appointment
```bash
curl -X POST "http://localhost:8000/appointment_creation/" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "sub_service_id": "service456",
    "appointment_date": "2024-01-15T10:00:00Z",
    "appointment_time": "2024-01-15T10:00:00Z",
    "predicted_duration": 60,
    "payment_status": true,
    "additional_notes": "First time visit"
  }'
```

### Create Empty Appointment
```bash
curl -X POST "http://localhost:8000/appointment_creation/empty" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "sub_service_id": "service456"
  }'
```

### Get User Appointments
```bash
curl -X GET "http://localhost:8000/appointment_creation/user/user123"
```

### Update Appointment
```bash
curl -X PATCH "http://localhost:8000/appointment_creation/appointment789" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment_date": "2024-01-16T14:00:00Z",
    "predicted_duration": 90
  }'
```

### Confirm Appointment
```bash
curl -X PUT "http://localhost:8000/appointment_creation/appointment789/confirm"
```

---

## Data Models

### Appointment States
- **Incomplete**: Empty appointment with minimal data
- **Complete**: Appointment with all required details
- **Confirmed**: Appointment approved and scheduled
- **Completed**: Service provided and finished

### Required Fields
- `user_id`: User identifier
- `sub_service_id`: Service identifier
- `appointment_date`: Scheduled date
- `appointment_time`: Scheduled time
- `predicted_duration`: Estimated duration in minutes

### Optional Fields
- `payment_status`: Payment completion status
- `additional_notes`: Additional information
- `appointment_confirmed`: Confirmation status
- `is_fully_completed`: Completion status

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid appointment data
- **404 Not Found**: Appointment not found
- **409 Conflict**: Appointment already exists
- **422 Unprocessable Entity**: Validation errors

---

## Business Rules

### Appointment Creation
- User must exist in the system
- Sub-service must be valid and active
- Appointment date must be in the future
- Duration must be positive

### Appointment Updates
- Only incomplete appointments can be updated
- Date changes require availability check
- Time changes must be within business hours

### Appointment Confirmation
- Only complete appointments can be confirmed
- Payment must be completed before confirmation
- Confirmation requires admin approval

---

## Dependencies

- FastAPI for routing and HTTP handling
- Pydantic for data validation
- Custom appointment service for business logic
- Database models for data persistence
