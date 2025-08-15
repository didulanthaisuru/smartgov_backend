// MongoDB script to setup test data for User Appointment Endpoints
// Run this script in MongoDB shell or MongoDB Compass

// Switch to your database
use your_database_name; // Replace with your actual database name

// Clear existing test data
db.AppoinmentNew.deleteMany({"user_id": "user123"});
db.sub_services.deleteMany({
  "_id": {
    "$in": [
      ObjectId("689cd830ef2618d4dfe5a595"),
      ObjectId("689cd840ef2618d4dfe5a600"),
      ObjectId("689cd850ef2618d4dfe5a610")
    ]
  }
});
db.required_documents.deleteMany({
  "_id": {
    "$in": [
      ObjectId("689cd831ef2618d4dfe5a596"),
      ObjectId("689cd832ef2618d4dfe5a597"),
      ObjectId("689cd835ef2618d4dfe5a600"),
      ObjectId("689cd836ef2618d4dfe5a601")
    ]
  }
});
db.uploaded_documents.deleteMany({"user_id": "user123"});

print("Cleared existing test data");

// Insert required documents
db.required_documents.insertMany([
  {
    "_id": ObjectId("689cd831ef2618d4dfe5a596"),
    "doc_name": "Business Registration Certificate",
    "description": "Official business registration document"
  },
  {
    "_id": ObjectId("689cd832ef2618d4dfe5a597"),
    "doc_name": "Tax Identification Number",
    "description": "Valid TIN certificate"
  },
  {
    "_id": ObjectId("689cd835ef2618d4dfe5a600"),
    "doc_name": "Current Passport",
    "description": "Valid current passport"
  },
  {
    "_id": ObjectId("689cd836ef2618d4dfe5a601"),
    "doc_name": "Medical Certificate",
    "description": "Valid medical fitness certificate"
  }
]);

print("Inserted required documents");

// Insert sub services
db.sub_services.insertMany([
  {
    "_id": ObjectId("689cd830ef2618d4dfe5a595"),
    "service_name": "Business License Application",
    "payment_amount": 150.00,
    "required_docs": [
      ObjectId("689cd831ef2618d4dfe5a596"),
      ObjectId("689cd832ef2618d4dfe5a597")
    ],
    "description": "Complete business license application process"
  },
  {
    "_id": ObjectId("689cd840ef2618d4dfe5a600"),
    "service_name": "Passport Renewal",
    "payment_amount": 200.00,
    "required_docs": [
      ObjectId("689cd835ef2618d4dfe5a600")
    ],
    "description": "Passport renewal service"
  },
  {
    "_id": ObjectId("689cd850ef2618d4dfe5a610"),
    "service_name": "Driver's License Renewal",
    "payment_amount": 75.00,
    "required_docs": [
      ObjectId("689cd836ef2618d4dfe5a601")
    ],
    "description": "Driver's license renewal service"
  }
]);

print("Inserted sub services");

// Insert appointments
db.AppoinmentNew.insertMany([
  {
    "_id": ObjectId("689db25103b6e08e79db7d7f"),
    "appointment_id": "APT-2024-001",
    "user_id": "user123",
    "sub_service_id": ObjectId("689cd830ef2618d4dfe5a595"),
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
    "created_at": new Date("2024-08-14T09:53:54.109Z"),
    "is_fully_completed": false,
    "appointment_date": new Date("2024-12-15T10:00:00.000Z"),
    "appointment_time": new Date("2024-12-15T10:00:00.000Z"),
    "predicted_duration": 60,
    "payment_status": false,
    "appointment_confirmed": true
  },
  {
    "_id": ObjectId("689db25203b6e08e79db7d80"),
    "appointment_id": "APT-2024-002",
    "user_id": "user123",
    "sub_service_id": ObjectId("689cd840ef2618d4dfe5a600"),
    "sub_service_steps": [
      {
        "step_id": 1,
        "step_name": "Document Review",
        "status": false,
        "completed_by": null
      }
    ],
    "created_at": new Date("2024-08-14T10:00:00.000Z"),
    "is_fully_completed": false,
    "appointment_date": null,
    "appointment_time": null,
    "predicted_duration": 45,
    "payment_status": false,
    "appointment_confirmed": false
  },
  {
    "_id": ObjectId("689db25303b6e08e79db7d81"),
    "appointment_id": "APT-2024-003",
    "user_id": "user123",
    "sub_service_id": ObjectId("689cd850ef2618d4dfe5a610"),
    "sub_service_steps": [
      {
        "step_id": 1,
        "step_name": "Medical Check",
        "status": true,
        "completed_by": "doctor123"
      },
      {
        "step_id": 2,
        "step_name": "License Issuance",
        "status": true,
        "completed_by": "admin123"
      }
    ],
    "created_at": new Date("2024-07-10T09:00:00.000Z"),
    "is_fully_completed": true,
    "appointment_date": new Date("2024-07-15T14:30:00.000Z"),
    "appointment_time": new Date("2024-07-15T14:30:00.000Z"),
    "predicted_duration": 30,
    "payment_status": true,
    "appointment_confirmed": true
  }
]);

print("Inserted appointments");

// Insert uploaded documents
db.uploaded_documents.insertMany([
  {
    "_id": ObjectId("689cd833ef2618d4dfe5a598"),
    "booking_id": "689db25103b6e08e79db7d7f",
    "required_doc_id": "689cd831ef2618d4dfe5a596",
    "user_id": "user123",
    "file_name": "business_registration.pdf",
    "file_path": "/uploads/user123/business_registration.pdf",
    "accuracy": 0.95,
    "doc_status": "Approved",
    "uploaded_at": new Date("2024-08-14T10:30:00.000Z")
  },
  {
    "_id": ObjectId("689cd834ef2618d4dfe5a599"),
    "booking_id": "689db25103b6e08e79db7d7f",
    "required_doc_id": "689cd832ef2618d4dfe5a597",
    "user_id": "user123",
    "file_name": "tin_certificate.pdf",
    "file_path": "/uploads/user123/tin_certificate.pdf",
    "accuracy": 0.88,
    "doc_status": "Pending",
    "uploaded_at": new Date("2024-08-14T11:15:00.000Z")
  },
  {
    "_id": ObjectId("689cd837ef2618d4dfe5a602"),
    "booking_id": "689db25303b6e08e79db7d81",
    "required_doc_id": "689cd836ef2618d4dfe5a601",
    "user_id": "user123",
    "file_name": "medical_certificate.pdf",
    "file_path": "/uploads/user123/medical_certificate.pdf",
    "accuracy": 0.92,
    "doc_status": "Approved",
    "uploaded_at": new Date("2024-07-10T09:00:00.000Z")
  }
]);

print("Inserted uploaded documents");

// Verify data setup
print("\n=== Data Verification ===");

print("Appointments count:", db.AppoinmentNew.countDocuments({"user_id": "user123"}));
print("Sub services count:", db.sub_services.countDocuments());
print("Required documents count:", db.required_documents.countDocuments());
print("Uploaded documents count:", db.uploaded_documents.countDocuments({"user_id": "user123"}));

print("\n=== Sample Queries for Testing ===");

// Test ongoing appointments query
print("\n1. Ongoing Appointments Query:");
var ongoingResult = db.AppoinmentNew.aggregate([
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
]).toArray();

printjson(ongoingResult);

// Test incomplete appointments query
print("\n2. Incomplete Appointments Query:");
var incompleteResult = db.AppoinmentNew.aggregate([
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
]).toArray();

printjson(incompleteResult);

// Test previous appointments query
print("\n3. Previous Appointments Query:");
var previousResult = db.AppoinmentNew.aggregate([
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
]).toArray();

printjson(previousResult);

print("\nTest data setup completed successfully!");
print("You can now test your API endpoints with this data.");
