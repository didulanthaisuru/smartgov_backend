# Admin Dashboard Routes Documentation

## File: `backend/routes/admin_dashboard.py`

### Overview
This module provides API endpoints for the admin dashboard functionality, allowing administrators to manage appointments, view service information, handle document uploads, and approve documents.

### Router Configuration
- **Prefix**: `/api/admin/dashboard`
- **Tags**: `["Admin Dashboard"]`

### Dependencies
- **Services**: `services.admin_dashboard`
- **Schemas**: `schemas.admin_services.dashboard_schemas`

---

## Endpoints

### 1. Get Admin Service Information
**Endpoint**: `GET /api/admin/dashboard/admin_service_info/{admin_id}`

**Description**: Retrieves service information (service_id and admin_name) for a specific admin.

**Parameters**:
- `admin_id` (path): The unique identifier of the admin

**Response Model**: `AdminServiceInfoResponse`
```json
{
  "service_id": "string",
  "admin_name": "string"
}
```

**Error Responses**:
- `404`: Admin not found

**Service Function**: `get_admin_service_info(admin_id: str)`

---

### 2. Get Appointments by Sub-Service
**Endpoint**: `GET /api/admin/dashboard/appointments_by_subservice/{sub_service_id}`

**Description**: Retrieves full appointment details for a specific sub-service where appointments are confirmed.

**Parameters**:
- `sub_service_id` (path): The sub-service ID to get appointments for

**Response Model**: `AppointmentsResponse`
```json
{
  "appointments": [
    {
      "_id": "string",
      "user_id": "string",
      "user_name": "string",
      "sub_service_id": "string",
      "sub_service_steps": [...],
      "created_at": "datetime",
      "is_fully_completed": "boolean",
      "appointment_date": "datetime",
      "appoinment_time": "datetime",
      "predicted_duration": "datetime",
      "payment_status": "boolean",
      "appointment_confirmed": "boolean",
      "completed_at": "datetime",
      "updated_at": "datetime"
    }
  ]
}
```

**Service Function**: `get_appointments_by_sub_service(sub_service_id: str)`

---

### 3. Get Required Documents by Sub-Service
**Endpoint**: `GET /api/admin/dashboard/required_documents/{sub_service_id}`

**Description**: Retrieves required document IDs and names for a specific sub-service.

**Parameters**:
- `sub_service_id` (path): The sub-service ID

**Response Model**: `RequiredDocumentsResponse`
```json
{
  "documents": [
    {
      "_id": "string",
      "doc_name": "string",
      "description": "string"
    }
  ]
}
```

**Service Function**: `get_required_documents_by_sub_service(sub_service_id: str)`

---

### 4. Get Required Documents (Raw Response)
**Endpoint**: `GET /api/admin/dashboard/required_documents_raw/{sub_service_id}`

**Description**: Same as above but returns raw response without schema validation.

**Parameters**:
- `sub_service_id` (path): The sub-service ID

**Response**: Raw JSON without schema validation

---

### 5. Get Uploaded Document Details
**Endpoint**: `GET /api/admin/dashboard/uploaded_document/{required_doc_id}/{appointment_id}`

**Description**: Retrieves uploaded document details for a specific required document and appointment.

**Parameters**:
- `required_doc_id` (path): The required document ID
- `appointment_id` (path): The appointment ID

**Response Model**: `UploadedDocumentResponse`
```json
{
  "uploaded_document": {
    "_id": "string",
    "booking_id": "string",
    "doc_id": "string",
    "required_doc_id": "string",
    "file_name": "string",
    "original_filename": "string",
    "stored_filename": "string",
    "file_path": "string",
    "file_size": "integer",
    "content_type": "string",
    "accuracy": "float",
    "doc_status": "string",
    "uploaded_at": "datetime"
  }
}
```

**Error Responses**:
- `404`: Uploaded document not found

**Service Function**: `get_uploaded_document_details(required_doc_id: str, appointment_id: str)`

---

### 6. Approve Document
**Endpoint**: `PUT /api/admin/dashboard/approve_document/{document_id}`

**Description**: Approves an uploaded document by updating its status from 'pending' to 'approved'.

**Parameters**:
- `document_id` (path): The document ID to approve

**Response Model**: `DocumentApprovalResponse`
```json
{
  "message": "string",
  "document_id": "string"
}
```

**Error Responses**:
- `404`: Document not found or already approved

**Service Function**: `approve_uploaded_document(document_id: str)`

---

## Related Files

### Schemas
- **File**: `backend/schemas/admin_services/dashboard_schemas.py`
- **Purpose**: Defines Pydantic models for request/response validation

### Services
- **File**: `backend/services/admin_dashboard.py`
- **Purpose**: Contains business logic for admin dashboard operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for appointments, documents, and admin data

---

## Usage Examples

### Get Admin Service Info
```bash
curl -X GET "http://localhost:8000/api/admin/dashboard/admin_service_info/admin123"
```

### Get Appointments for Sub-Service
```bash
curl -X GET "http://localhost:8000/api/admin/dashboard/appointments_by_subservice/subservice456"
```

### Approve Document
```bash
curl -X PUT "http://localhost:8000/api/admin/dashboard/approve_document/doc789"
```

---

## Error Handling

The module implements comprehensive error handling:
- **404 Not Found**: When admin, appointment, or document is not found
- **400 Bad Request**: For invalid input parameters
- **500 Internal Server Error**: For unexpected server errors

---

## Security Considerations

- All endpoints should be protected with admin authentication
- Document approval requires proper authorization
- File paths and document access should be validated

---

## Dependencies

- FastAPI for routing and HTTP handling
- Motor for async MongoDB operations
- Pydantic for data validation
- Custom admin dashboard service for business logic
