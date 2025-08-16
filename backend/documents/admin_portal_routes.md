# Admin Portal Routes Documentation

## File: `backend/routes/admin_portal.py`

### Overview
This module provides comprehensive admin portal functionality for managing appointments, viewing detailed appointment information, and accessing sub-service details. It serves as the main interface for administrators to handle appointment workflows and service management.

### Router Configuration
- **Prefix**: `/admin`
- **Tags**: `["admin"]`

### Dependencies
- **Services**: `services.admin_portal`
- **Schemas**: `schemas.admin_portal`

---

## Endpoints

### 1. Get All Appointments List
**Endpoint**: `POST /admin/get_all_appointments_list`

**Description**: Retrieves all appointments for a specific date and service_id, filtered by appointment date and sub_service_id.

**Request Model**: `appointment_detail_card_request`
```json
{
  "appointment_date": "date",
  "sub_service_id": "string"
}
```

**Response Model**: `List[appointment_detail_card]`
```json
[
  {
    "appointment_id": "string",
    "user_name": "string",
    "appointment_time": "datetime",
    "status": "string",
    "duration": "integer",
    "user_phone": "string",
    "user_email": "string"
  }
]
```

**Error Responses**:
- `400`: Invalid request parameters
- `500`: Internal server error

**Service Function**: `get_all_appointments_list(query)`

---

### 2. View Detailed Appointment
**Endpoint**: `POST /admin/view_all_detailes_of_selected_appointment`

**Description**: Retrieves detailed information about a specific appointment including all relevant data.

**Request Model**: `view_detailed_appointment_request`
```json
{
  "appointment_id": "string"
}
```

**Response Model**: `view_detailed_appointment_response`
```json
{
  "appointment_details": {
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
      "main_service_name": "string"
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
        "upload_status": "string",
        "file_path": "string"
      }
    ]
  }
}
```

**Error Responses**:
- `400`: Invalid appointment ID
- `500`: Internal server error

**Service Function**: `get_detailed_appointment(query)`

---

### 3. Get Selected Appointment Details with PDF States
**Endpoint**: `POST /admin/get_selected_appoinment_details_with_pdf_states`

**Description**: Retrieves appointment details along with the current state of uploaded PDF documents.

**Request Model**: `get_selected_appoinment_details_with_pdf_states_request`
```json
{
  "appointment_id": "string"
}
```

**Response Model**: `get_selected_appoinment_details_with_pdf_states_response`
```json
{
  "appointment_details": {
    "appointment_id": "string",
    "user_info": {...},
    "service_info": {...},
    "appointment_info": {...},
    "uploaded_documents": [
      {
        "document_id": "string",
        "document_name": "string",
        "file_path": "string",
        "upload_status": "string",
        "accuracy_score": "float",
        "uploaded_at": "datetime"
      }
    ]
  }
}
```

**Error Responses**:
- `400`: Invalid appointment ID
- `500`: Internal server error

**Service Function**: `get_selected_appoinment_details_with_pdf_states(query)`

---

### 4. Get Sub-Service Details
**Endpoint**: `POST /admin/get_subservice_details`

**Description**: Retrieves comprehensive sub-service details including required documents and service steps.

**Request Model**: `get_subservice_details_request`
```json
{
  "subservice_id": "string"
}
```

**Response Model**: `get_subservice_details_response`
```json
{
  "sub_service_info": {
    "sub_service_id": "string",
    "sub_service_name": "string",
    "description": "string",
    "payment_amount": "float",
    "estimated_duration": "integer"
  },
  "required_documents": [
    {
      "document_id": "string",
      "document_name": "string",
      "description": "string",
      "is_required": "boolean"
    }
  ],
  "service_steps": [
    {
      "step_id": "integer",
      "step_name": "string",
      "description": "string",
      "estimated_time": "integer",
      "is_required": "boolean"
    }
  ]
}
```

**Error Responses**:
- `400`: Invalid sub-service ID
- `500`: Internal server error

**Service Function**: `get_subservice_details(query)`

---

## Admin Portal Workflow

### 1. Appointment Overview
- Admin views appointments for specific date and service
- Appointments are displayed as cards with key information
- Quick status overview for efficient management

### 2. Detailed Appointment Review
- Admin selects specific appointment for detailed view
- Complete appointment information is displayed
- Document upload status is shown

### 3. Document Management
- Admin can view uploaded documents
- Document accuracy scores are displayed
- PDF states and processing status are tracked

### 4. Service Information
- Admin accesses sub-service details
- Required documents and steps are listed
- Service workflow is clearly defined

---

## Related Files

### Schemas
- **File**: `backend/schemas/admin_portal.py`
- **Purpose**: Defines Pydantic models for admin portal requests/responses

### Services
- **File**: `backend/services/admin_portal.py`
- **Purpose**: Contains business logic for admin portal operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for appointments, users, and services

---

## Usage Examples

### Get Appointments for Date and Service
```bash
curl -X POST "http://localhost:8000/admin/get_all_appointments_list" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment_date": "2024-01-15",
    "sub_service_id": "service456"
  }'
```

### View Detailed Appointment
```bash
curl -X POST "http://localhost:8000/admin/view_all_detailes_of_selected_appointment" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment_id": "appointment789"
  }'
```

### Get Appointment with PDF States
```bash
curl -X POST "http://localhost:8000/admin/get_selected_appoinment_details_with_pdf_states" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment_id": "appointment789"
  }'
```

### Get Sub-Service Details
```bash
curl -X POST "http://localhost:8000/admin/get_subservice_details" \
  -H "Content-Type: application/json" \
  -d '{
    "subservice_id": "subservice123"
  }'
```

---

## Data Models

### Appointment Card
- Basic appointment information for list views
- User contact information
- Appointment timing and status
- Quick access to key details

### Detailed Appointment
- Complete appointment information
- User profile details
- Service information
- Document upload status
- Payment information

### Sub-Service Details
- Service description and requirements
- Required documents list
- Service workflow steps
- Pricing and duration information

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Appointment or service not found
- **500 Internal Server Error**: Database or service errors

---

## Security Considerations

### Access Control
- All endpoints require admin authentication
- Admin permissions are validated
- Service access is restricted to assigned services

### Data Privacy
- User information is protected
- Document access is controlled
- Audit trails for admin actions

---

## Performance Considerations

### Database Optimization
- Efficient queries for appointment lists
- Indexed searches by date and service
- Optimized joins for detailed views

### Caching Strategy
- Cache frequently accessed service details
- Cache appointment lists for active dates
- Implement cache invalidation on updates

---

## Dependencies

- FastAPI for routing and HTTP handling
- Pydantic for data validation
- Custom admin portal service for business logic
- Database models for data persistence
- Error handling middleware
