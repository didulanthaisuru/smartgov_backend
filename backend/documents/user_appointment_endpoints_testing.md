# User Appointment Endpoints Testing Guide

## Database Example Data

### 1. Appointment Document (AppoinmentNew Collection)
```json
{
  "_id": {
    "$oid": "689db25103b6e08e79db7d7f"
  },
  "appointment_id": "APT-2024-001",
  "user_id": "user123",
  "sub_service_id": {
    "$oid": "689cd830ef2618d4dfe5a595"
  },
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
  "created_at": {
    "$date": "2024-08-14T09:53:54.109Z"
  },
  "is_fully_completed": false,
  "appointment_date": {
    "$date": "2024-12-15T10:00:00.000Z"
  },
  "appointment_time": {
    "$date": "2024-12-15T10:00:00.000Z"
  },
  "predicted_duration": 60,
  "payment_status": false,
  "appointment_confirmed": true
}
```

### 2. Sub Service Document (sub_services Collection)
```json
{
  "_id": {
    "$oid": "689cd830ef2618d4dfe5a595"
  },
  "service_name": "Business License Application",
  "payment_amount": 150.00,
  "required_docs": [
    {
      "$oid": "689cd831ef2618d4dfe5a596"
    },
    {
      "$oid": "689cd832ef2618d4dfe5a597"
    }
  ],
  "description": "Complete business license application process"
}
```

### 3. Required Documents (required_documents Collection)
```json
[
  {
    "_id": {
      "$oid": "689cd831ef2618d4dfe5a596"
    },
    "doc_name": "Business Registration Certificate",
    "description": "Official business registration document"
  },
  {
    "_id": {
      "$oid": "689cd832ef2618d4dfe5a597"
    },
    "doc_name": "Tax Identification Number",
    "description": "Valid TIN certificate"
  }
]
```

### 4. Uploaded Documents (uploaded_documents Collection)
```json
[
  {
    "_id": {
      "$oid": "689cd833ef2618d4dfe5a598"
    },
    "booking_id": "689db25103b6e08e79db7d7f",
    "required_doc_id": "689cd831ef2618d4dfe5a596",
    "user_id": "user123",
    "file_name": "business_registration.pdf",
    "file_path": "/uploads/user123/business_registration.pdf",
    "accuracy": 0.95,
    "doc_status": "Approved",
    "uploaded_at": {
      "$date": "2024-08-14T10:30:00.000Z"
    }
  },
  {
    "_id": {
      "$oid": "689cd834ef2618d4dfe5a599"
    },
    "booking_id": "689db25103b6e08e79db7d7f",
    "required_doc_id": "689cd832ef2618d4dfe5a597",
    "user_id": "user123",
    "file_name": "tin_certificate.pdf",
    "file_path": "/uploads/user123/tin_certificate.pdf",
    "accuracy": 0.88,
    "doc_status": "Pending",
    "uploaded_at": {
      "$date": "2024-08-14T11:15:00.000Z"
    }
  }
]
```

## Endpoint Testing

### 1. Get Ongoing Appointments
**Endpoint:** `POST /appointments_view/ongoing`

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Expected Response:**
```json
[
  {
    "appointment_id": "689db25103b6e08e79db7d7f",
    "service_name": "Business License Application",
    "appointment_date": "2024-12-15T10:00:00.000Z",
    "is_fully_completed": false
  }
]
```

**Database Query Check:**
```javascript
// MongoDB Query to verify data
db.AppoinmentNew.aggregate([
  {
    "$match": {
      "user_id": "user123",
      "appointment_date": {"$ne": null},
      "is_fully_completed": false,
      "appointment_confirmed": true
    }
  },
  {
    "$lookup": {
      "from": "sub_services",
      "localField": "sub_service_id",
      "foreignField": "_id",
      "as": "sub_service_info"
    }
  },
  {
    "$unwind": "$sub_service_info"
  },
  {
    "$project": {
      "_id": 0,
      "appointment_id": {"$toString": "$_id"},
      "service_name": "$sub_service_info.service_name",
      "appointment_date": 1,
      "is_fully_completed": 1
    }
  }
])
```

### 2. Get Incomplete Appointments
**Endpoint:** `POST /appointments_view/incomplete`

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Expected Response:**
```json
[
  {
    "appointment_id": "689db25203b6e08e79db7d80",
    "service_name": "Passport Renewal",
    "appointment_date": null,
    "is_fully_completed": false
  }
]
```

**Database Query Check:**
```javascript
// MongoDB Query to verify data
db.AppoinmentNew.aggregate([
  {
    "$match": {
      "user_id": "user123",
      "$or": [
        {"appointment_date": {"$eq": null}},
        {"appointment_confirmed": false}
      ]
    }
  },
  {
    "$lookup": {
      "from": "sub_services",
      "localField": "sub_service_id",
      "foreignField": "_id",
      "as": "sub_service_info"
    }
  },
  {
    "$unwind": "$sub_service_info"
  },
  {
    "$project": {
      "_id": 0,
      "appointment_id": {"$toString": "$_id"},
      "service_name": "$sub_service_info.service_name",
      "appointment_date": 1,
      "is_fully_completed": 1
    }
  }
])
```

### 3. Get Previous Appointments
**Endpoint:** `POST /appointments_view/previous`

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Expected Response:**
```json
[
  {
    "appointment_id": "689db25303b6e08e79db7d81",
    "service_name": "Driver's License Renewal",
    "appointment_date": "2024-07-15T14:30:00.000Z",
    "is_fully_completed": true
  }
]
```

**Database Query Check:**
```javascript
// MongoDB Query to verify data
db.AppoinmentNew.aggregate([
  {
    "$match": {
      "user_id": "user123",
      "is_fully_completed": true
    }
  },
  {
    "$lookup": {
      "from": "sub_services",
      "localField": "sub_service_id",
      "foreignField": "_id",
      "as": "sub_service_info"
    }
  },
  {
    "$unwind": "$sub_service_info"
  },
  {
    "$project": {
      "_id": 0,
      "appointment_id": {"$toString": "$_id"},
      "service_name": "$sub_service_info.service_name",
      "appointment_date": 1,
      "is_fully_completed": 1
    }
  }
])
```

### 4. Get Ongoing Appointment Details
**Endpoint:** `POST /appointments_view/ongoing/{appointment_id}`

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Expected Response:**
```json
{
  "appointment_id": "689db25103b6e08e79db7d7f",
  "user_id": "user123",
  "service_name": "Business License Application",
  "payment_amount": 150.00,
  "required_documents": [
    {
      "required_doc_id": "689cd831ef2618d4dfe5a596",
      "doc_name": "Business Registration Certificate",
      "description": "Official business registration document"
    },
    {
      "required_doc_id": "689cd832ef2618d4dfe5a597",
      "doc_name": "Tax Identification Number",
      "description": "Valid TIN certificate"
    }
  ],
  "uploaded_documents": [
    {
      "uploaded_document_id": "689cd833ef2618d4dfe5a598",
      "appointment_id": "689db25103b6e08e79db7d7f",
      "required_doc_id": "689cd831ef2618d4dfe5a596",
      "user_id": "user123",
      "file_name": "business_registration.pdf",
      "file_path": "/uploads/user123/business_registration.pdf",
      "accuracy": 0.95,
      "doc_status": "Approved",
      "uploaded_at": "2024-08-14T10:30:00.000Z"
    },
    {
      "uploaded_document_id": "689cd834ef2618d4dfe5a599",
      "appointment_id": "689db25103b6e08e79db7d7f",
      "required_doc_id": "689cd832ef2618d4dfe5a597",
      "user_id": "user123",
      "file_name": "tin_certificate.pdf",
      "file_path": "/uploads/user123/tin_certificate.pdf",
      "accuracy": 0.88,
      "doc_status": "Pending",
      "uploaded_at": "2024-08-14T11:15:00.000Z"
    }
  ],
  "is_fully_completed": false,
  "appointment_date": "2024-12-15T10:00:00.000Z",
  "sub_service_steps": [
    {
      "step_id": 1,
      "step_name": "Document Verification",
      "status": false,
      "completed_by": null,
      "is_currently_happening": true
    },
    {
      "step_id": 2,
      "step_name": "Certificate Issuance",
      "status": false,
      "completed_by": null,
      "is_currently_happening": false
    }
  ]
}
```

**Database Query Check:**
```javascript
// MongoDB Query to verify data
db.AppoinmentNew.aggregate([
  {
    "$match": {
      "_id": ObjectId("689db25103b6e08e79db7d7f"),
      "user_id": "user123"
    }
  },
  {
    "$lookup": {
      "from": "sub_services",
      "localField": "sub_service_id",
      "foreignField": "_id",
      "as": "sub_service_info"
    }
  },
  {
    "$unwind": "$sub_service_info"
  },
  {
    "$lookup": {
      "from": "required_documents",
      "let": {"req_ids": "$sub_service_info.required_docs"},
      "pipeline": [
        {
          "$match": {
            "$expr": {"$in": ["$_id", "$$req_ids"]}
          }
        },
        {
          "$project": {
            "_id": 0,
            "required_doc_id": {"$toString": "$_id"},
            "doc_name": 1,
            "description": 1
          }
        }
      ],
      "as": "required_docs_info"
    }
  },
  {
    "$lookup": {
      "from": "uploaded_documents",
      "let": {"appointmentIdStr": {"$toString": "$_id"}},
      "pipeline": [
        {
          "$match": {
            "$expr": {"$eq": ["$booking_id", "$$appointmentIdStr"]}
          }
        }
      ],
      "as": "uploaded_docs"
    }
  },
  {
    "$project": {
      "_id": 0,
      "appointment_id": {"$toString": "$_id"},
      "user_id": 1,
      "service_name": "$sub_service_info.service_name",
      "payment_amount": {"$ifNull": ["$sub_service_info.payment_amount", 0.0]},
      "required_documents": {"$ifNull": ["$required_docs_info", []]},
      "uploaded_documents": {
        "$map": {
          "input": {"$ifNull": ["$uploaded_docs", []]},
          "as": "doc",
          "in": {
            "uploaded_document_id": {"$toString": "$$doc._id"},
            "appointment_id": "$$doc.booking_id",
            "required_doc_id": {"$ifNull": ["$$doc.required_doc_id", null]},
            "user_id": {"$ifNull": ["$$doc.user_id", null]},
            "file_name": {"$ifNull": ["$$doc.file_name", null]},
            "file_path": {"$ifNull": ["$$doc.file_path", null]},
            "accuracy": {"$ifNull": ["$$doc.accuracy", null]},
            "doc_status": {"$ifNull": ["$$doc.doc_status", "Pending"]},
            "uploaded_at": {"$ifNull": ["$$doc.uploaded_at", null]}
          }
        }
      },
      "is_fully_completed": 1,
      "appointment_date": 1,
      "sub_service_steps": {"$ifNull": ["$sub_service_steps", []]}
    }
  }
])
```

### 5. Get Incomplete Appointment Details
**Endpoint:** `POST /appointments_view/incomplete/{appointment_id}`

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Expected Response:**
```json
{
  "appointment_id": "689db25203b6e08e79db7d80",
  "user_id": "user123",
  "service_name": "Passport Renewal",
  "payment_amount": 200.00,
  "required_documents": [
    {
      "required_doc_id": "689cd835ef2618d4dfe5a600",
      "doc_name": "Current Passport",
      "description": "Valid current passport"
    }
  ],
  "uploaded_documents": [],
  "is_fully_completed": false,
  "appointment_date": null
}
```

### 6. Get Previous Appointment Details
**Endpoint:** `POST /appointments_view/previous/{appointment_id}`

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Expected Response:**
```json
{
  "appointment_id": "689db25303b6e08e79db7d81",
  "user_id": "user123",
  "service_name": "Driver's License Renewal",
  "payment_amount": 75.00,
  "required_documents": [
    {
      "required_doc_id": "689cd836ef2618d4dfe5a601",
      "doc_name": "Medical Certificate",
      "description": "Valid medical fitness certificate"
    }
  ],
  "uploaded_documents": [
    {
      "uploaded_document_id": "689cd837ef2618d4dfe5a602",
      "appointment_id": "689db25303b6e08e79db7d81",
      "required_doc_id": "689cd836ef2618d4dfe5a601",
      "user_id": "user123",
      "file_name": "medical_certificate.pdf",
      "file_path": "/uploads/user123/medical_certificate.pdf",
      "accuracy": 0.92,
      "doc_status": "Approved",
      "uploaded_at": "2024-07-10T09:00:00.000Z"
    }
  ],
  "is_fully_completed": true,
  "appointment_date": "2024-07-15T14:30:00.000Z"
}
```

## Error Cases Testing

### 1. Invalid Appointment ID
**Endpoint:** `POST /appointments_view/ongoing/invalid_id`

**Request Body:**
```json
{
  "user_id": "user123"
}
```

**Expected Response:**
```json
{
  "detail": "Ongoing appointment not found for this user."
}
```

### 2. Wrong User ID
**Endpoint:** `POST /appointments_view/ongoing/689db25103b6e08e79db7d7f`

**Request Body:**
```json
{
  "user_id": "wrong_user"
}
```

**Expected Response:**
```json
{
  "detail": "Ongoing appointment not found for this user."
}
```

### 3. Non-existent User
**Endpoint:** `POST /appointments_view/ongoing`

**Request Body:**
```json
{
  "user_id": "non_existent_user"
}
```

**Expected Response:**
```json
[]
```

## Testing Checklist

### Data Setup
- [ ] Create test appointments with different statuses (ongoing, incomplete, completed)
- [ ] Create sub_services with required_docs references
- [ ] Create required_documents
- [ ] Create uploaded_documents linked to appointments
- [ ] Ensure proper ObjectId references between collections

### Endpoint Testing
- [ ] Test ongoing appointments endpoint
- [ ] Test incomplete appointments endpoint
- [ ] Test previous appointments endpoint
- [ ] Test ongoing appointment details endpoint
- [ ] Test incomplete appointment details endpoint
- [ ] Test previous appointment details endpoint

### Error Handling
- [ ] Test with invalid appointment IDs
- [ ] Test with wrong user IDs
- [ ] Test with non-existent users
- [ ] Test with malformed request bodies

### Data Validation
- [ ] Verify appointment_date filtering works correctly
- [ ] Verify is_fully_completed filtering works correctly
- [ ] Verify appointment_confirmed filtering works correctly
- [ ] Verify sub_service_steps processing works correctly
- [ ] Verify document linking works correctly
