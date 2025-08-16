# Admin Dashboard API Endpoints

This document describes the admin dashboard API endpoints for managing appointments and documents.

## Base URL
```
/api/v1/api/admin/dashboard
```

## Endpoints

### 1. Get Appointments by Sub Service

**Endpoint:** `GET /appointments_by_subservice/{sub_service_id}`

**Description:** Gets full appointment details for a specific sub_service_id where appointment_confirmed is true.

**Parameters:**
- `sub_service_id` (string, required): The sub service ID to get appointments for

**Response:**
```json
{
  "appointments": [
    {
      "appointment_id": "string",
      "user_id": "string", 
      "user_name": "string",
      "sub_service_id": "string",
             "sub_service_steps": [
         {
           "step_id": 1,
           "step_name": "Document Verification",
           "status": false,
           "completed_by": null
         },
         {
           "step_id": 2,
           "step_name": "Certificate Issuance", 
           "status": false,
           "completed_by": null
         }
       ],
      "created_at": "2025-08-15T19:58:55.819Z",
      "is_fully_completed": true,
      "appointment_date": "2025-08-15T19:58:55.819Z",
      "appoinment_time": "2025-08-15T19:58:55.819Z", 
      "predicted_duration": "2025-08-15T19:58:55.819Z",
      "payment_status": true,
      "appointment_confirmed": true,
      "completed_at": "2025-08-15T19:58:55.819Z",
      "updated_at": "2025-08-15T19:58:55.819Z"
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET "http://localhost:8000/api/v1/api/admin/dashboard/appointments_by_subservice/507f1f77bcf86cd799439011"
```

**Example Response:**
```json
{
  "appointments": [
    {
      "appointment_id": "507f1f77bcf86cd799439012",
      "user_id": "507f1f77bcf86cd799439013",
      "user_name": "John Doe",
      "sub_service_id": "507f1f77bcf86cd799439011",
             "sub_service_steps": [
         {
           "step_id": 1,
           "step_name": "Document Verification",
           "status": false,
           "completed_by": null
         },
         {
           "step_id": 2,
           "step_name": "Certificate Issuance",
           "status": false,
           "completed_by": null
         }
       ],
      "created_at": "2025-01-15T10:30:00.000Z",
      "is_fully_completed": false,
      "appointment_date": "2025-01-20T14:00:00.000Z",
      "appoinment_time": "2025-01-20T14:00:00.000Z",
      "predicted_duration": "2025-01-20T15:00:00.000Z",
      "payment_status": true,
      "appointment_confirmed": true,
      "completed_at": null,
      "updated_at": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Get Admin Service Info

**Endpoint:** `GET /admin_service_info/{admin_id}`

**Description:** Gets admin service information (service_id and admin_name) for a specific admin_id.

**Parameters:**
- `admin_id` (string, required): The admin ID to get information for

**Response:**
```json
{
  "service_id": "string",
  "admin_name": "string"
}
```

### 3. Get Required Documents

**Endpoint:** `GET /required_documents/{sub_service_id}`

**Description:** Gets required document IDs and names for a specific sub_service_id.

**Parameters:**
- `sub_service_id` (string, required): The sub service ID to get documents for

**Response:**
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

### 4. Get Uploaded Document Details

**Endpoint:** `GET /uploaded_document/{required_doc_id}/{appointment_id}`

**Description:** Gets uploaded document details for a specific required document ID and appointment ID.

**Parameters:**
- `required_doc_id` (string, required): The required document ID
- `appointment_id` (string, required): The appointment ID

**Response:**
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
    "file_size": 0,
    "content_type": "string",
    "accuracy": 0.0,
    "doc_status": "string",
    "uploaded_at": "2025-08-15T19:58:55.819Z"
  }
}
```

### 5. Approve Document

**Endpoint:** `PUT /approve_document/{document_id}`

**Description:** Approves an uploaded document by updating its status from 'pending' to 'approved'.

**Parameters:**
- `document_id` (string, required): The uploaded document ID to approve

**Response:**
```json
{
  "message": "Successfully approved",
  "document_id": "string"
}
```

## Error Responses

All endpoints may return the following error responses:

**404 Not Found:**
```json
{
  "detail": "Admin not found"
}
```

**500 Internal Server Error:**
```json
{
  "detail": "Internal server error"
}
```

## Notes

- All appointment IDs are returned as strings (converted from MongoDB ObjectId)
- The `appointment_id` field in the response corresponds to the `_id` field in the database
- Only appointments with `appointment_confirmed: true` are returned
- User names are fetched from the users collection and combined from first_name and last_name fields
- All datetime fields are returned in ISO 8601 format
