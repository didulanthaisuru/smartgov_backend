# Admin Dashboard Full Routes Documentation

## Overview
The Admin Dashboard Full routes provide enhanced functionality for retrieving comprehensive appointment information with user details.

## Base URL
```
/api/admin/dashboard-full
```

## Endpoints

### 1. Get Appointments by Sub Service ID

**Endpoint:** `GET /appointments_by_subservice/{sub_service_id}`

**Description:** Retrieves all appointments for a specific sub-service where appointment_confirmed is true. Includes user names by joining with the users collection.

**Path Parameters:**
- `sub_service_id` (string, required): The sub-service ID to filter appointments

**Query Parameters:** None

**Request Body:** None

**Response:**
```json
{
  "appointments": [
    {
      "appointment_id": "689e179f0a2b385df7944b4d",
      "user_id": "689f4c15c5f5564c686445e2",
      "user_name": "avishka madu",
      "sub_service_id": "689cd830ef2618d4dfe5a594",
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
      "created_at": "2025-08-14T22:36:39.006Z",
      "is_fully_completed": false,
      "appointment_date": "2025-08-14T17:13:09.062Z",
      "appoinment_time": "2025-08-14T17:13:09.062Z",
      "predicted_duration": "2025-08-14T17:13:09.062Z",
      "payment_status": false,
      "appointment_confirmed": true,
      "completed_at": "2025-08-15T12:15:23.377Z",
      "updated_at": "2025-08-15T12:15:23.377Z"
    }
  ]
}
```

**Response Fields:**
- `appointments` (array): List of appointment objects
  - `appointment_id` (string): Unique appointment identifier
  - `user_id` (string): User ID who made the appointment
  - `user_name` (string): Full name of the user (first_name + last_name)
  - `sub_service_id` (string): Sub-service identifier
  - `sub_service_steps` (array): List of steps for the sub-service
    - `step_id` (integer): Step identifier
    - `step_name` (string): Name of the step
    - `status` (boolean): Whether the step is completed
    - `completed_by` (string, nullable): Who completed the step
  - `created_at` (datetime): When the appointment was created
  - `is_fully_completed` (boolean): Whether all steps are completed
  - `appointment_date` (datetime, nullable): Scheduled appointment date
  - `appoinment_time` (datetime, nullable): Scheduled appointment time
  - `predicted_duration` (datetime, nullable): Predicted duration of the service
  - `payment_status` (boolean): Whether payment is completed
  - `appointment_confirmed` (boolean): Whether appointment is confirmed
  - `completed_at` (datetime, nullable): When the appointment was completed
  - `updated_at` (datetime): Last update timestamp

**Filters Applied:**
- Only appointments where `appointment_confirmed` is `true`
- Only appointments for the specified `sub_service_id`

**Error Responses:**
- `404`: Sub-service not found
- `500`: Internal server error

**Example Usage:**
```bash
curl -X GET "http://localhost:8000/api/admin/dashboard-full/appointments_by_subservice/689cd830ef2618d4dfe5a594"
```

### 2. Get Appointment Details by Appointment ID

**Endpoint:** `GET /appointment_details/{appointment_id}`

**Description:** Retrieves complete appointment details for a specific appointment ID. Includes user name, required document details, and all uploaded document details.

**Path Parameters:**
- `appointment_id` (string, required): The appointment ID to get details for

**Query Parameters:** None

**Request Body:** None

**Response:**
```json
{
  "appointment": {
    "appointment_id": "689e179f0a2b385df7944b4d",
    "user_id": "689f4c15c5f5564c686445e2",
    "user_name": "avishka madu",
    "sub_service_id": "689cd830ef2618d4dfe5a594",
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
    "created_at": "2025-08-14T22:36:39.006Z",
    "is_fully_completed": false,
    "appointment_date": "2025-08-14T17:13:09.062Z",
    "appoinment_time": "2025-08-14T17:13:09.062Z",
    "predicted_duration": "2025-08-14T17:13:09.062Z",
    "payment_status": false,
    "appointment_confirmed": true,
    "completed_at": "2025-08-15T12:15:23.377Z",
    "updated_at": "2025-08-15T12:15:23.377Z"
  },
  "required_documents": [
    {
      "doc_id": "689cd830ef2618d4dfe5a58f",
      "doc_name": "Hospital Birth Report",
      "description": "A report issued by the hospital at the time of birth."
    },
    {
      "doc_id": "689cd830ef2618d4dfe5a590",
      "doc_name": "Parent ID Card",
      "description": "Valid ID card of the parent."
    }
  ],
  "uploaded_documents": [
         {
       "doc_id": "689cd830ef2618d4dfe5a59b",
       "appointment_id": "689e179f0a2b385df7944b4d",
       "required_doc_id": "689f2ebf0aadb8c7efe85429",
       "user_id": "689f4c15c5f5564c686445e2",
      "file_name": "hospital_report_scan.pdf",
      "file_path": "/uploads/user123/hbr_xyz.pdf",
      "accuracy": 92.4,
      "doc_status": "Pending",
      "uploaded_at": "2025-08-13T18:23:44.730Z"
    }
  ]
}
```

**Response Fields:**
- `appointment` (object): Complete appointment details (same as first endpoint)
- `required_documents` (array): List of required documents for the sub-service
  - `doc_id` (string): Required document identifier
  - `doc_name` (string): Name of the required document
  - `description` (string, nullable): Description of the document
- `uploaded_documents` (array): List of uploaded documents for this appointment
  - `doc_id` (string): Uploaded document identifier
  - `appointment_id` (string): Associated appointment ID
     - `required_doc_id` (string): ID of the required document this upload satisfies
  - `user_id` (string): User who uploaded the document
  - `file_name` (string): Original filename
  - `file_path` (string): Path where file is stored
  - `accuracy` (float, nullable): Document accuracy score
  - `doc_status` (string): Status of the document (Pending, Approved, Rejected)
  - `uploaded_at` (datetime): When the document was uploaded

**Error Responses:**
- `404`: Appointment not found
- `500`: Internal server error

**Example Usage:**
```bash
curl -X GET "http://localhost:8000/api/admin/dashboard-full/appointment_details/689e179f0a2b385df7944b4d"
```

### 3. Get Appointment Step Details by Appointment ID

**Endpoint:** `GET /appointment_step_details/{appointment_id}`

**Description:** Retrieves step details for a specific appointment ID with proper mapping between sub-service steps and appointment step status.

**Path Parameters:**
- `appointment_id` (string, required): The appointment ID to get step details for

**Query Parameters:** None

**Request Body:** None

**Response:**
```json
{
  "appointment_id": "689e179f0a2b385df7944b4d",
  "sub_service_id": "689cd830ef2618d4dfe5a594",
  "sub_service_name": "New Born Certificate at hospital",
  "payment_amount": 250.0,
  "sub_service_steps": [
    {
      "step_id": 1,
      "step_name": "Document Verification"
    },
    {
      "step_id": 2,
      "step_name": "Certificate Issuance"
    }
  ],
  "appointment_step_status": [
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
  "is_fully_completed": false
}
```

**Response Fields:**
- `appointment_id` (string): The appointment identifier
- `sub_service_id` (string): The sub-service identifier
- `sub_service_name` (string): Name of the sub-service
- `payment_amount` (float): Payment amount for the service
- `sub_service_steps` (array): List of step definitions from sub-service (template)
  - `step_id` (integer): Step identifier
  - `step_name` (string): Name of the step
- `appointment_step_status` (array): List of step status for this appointment (actual status)
  - `step_id` (integer): Step identifier
  - `step_name` (string): Name of the step
  - `status` (boolean): Whether the step is completed
  - `completed_by` (string, nullable): Who completed the step
- `is_fully_completed` (boolean): Whether all steps are completed

**Error Responses:**
- `404`: Appointment not found
- `500`: Internal server error

**Example Usage:**
```bash
curl -X GET "http://localhost:8000/api/admin/dashboard-full/appointment_step_details/689e179f0a2b385df7944b4d"
```

### 4. Approve Uploaded Document

**Endpoint:** `PUT /approve_document/{document_id}`

**Description:** Approves an uploaded document by updating its status from 'pending' to 'approved'.

**Path Parameters:**
- `document_id` (string, required): The document ID to approve

**Query Parameters:** None

**Request Body:** None

**Response:**
```json
{
  "message": "Document approved successfully",
  "document_id": "689cd830ef2618d4dfe5a59b"
}
```

**Response Fields:**
- `message` (string): Success message
- `document_id` (string): The ID of the approved document

**Error Responses:**
- `404`: Document not found or already approved
- `500`: Internal server error

**Example Usage:**
```bash
curl -X PUT "http://localhost:8000/api/admin/dashboard-full/approve_document/689cd830ef2618d4dfe5a59b"
```

## Database Collections Used
- `appointments`: Main appointment data
- `users`: User information for name resolution
- `sub_services`: Sub-service information, steps, and required documents
- `required_documents`: Required document details
- `uploaded_documents`: Uploaded document details

## Notes
- The endpoints automatically join with the users collection to retrieve user names
- Only confirmed appointments are returned in the first endpoint
- All ObjectIds are converted to strings for JSON serialization
- User names are constructed by combining first_name and last_name
- If user details cannot be retrieved, "Unknown User" is used as the user_name
- The second endpoint retrieves all documents (required and uploaded) for a specific appointment
- The third endpoint provides proper mapping between sub-service step definitions and appointment step status
