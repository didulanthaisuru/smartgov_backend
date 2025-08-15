#!/usr/bin/env python3
"""
Test script for User Appointment Endpoints
This script provides functions to test all endpoints in user_appointment_get.py
"""

import asyncio
import json
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from datetime import datetime

# Database connection
DATABASE_URL = "mongodb://localhost:27017"
DATABASE_NAME = "your_database_name"  # Replace with your actual database name

# Collection names
SUB_SERVICES_COLLECTION = "sub_services"
APPOINTMENTS_COLLECTION = "AppoinmentNew"
UPLOADED_DOCS_COLLECTION = "uploaded_documents"
REQUIRED_DOCS_COLLECTION = "required_documents"

class AppointmentTester:
    def __init__(self):
        self.client = AsyncIOMotorClient(DATABASE_URL)
        self.db = self.client[DATABASE_NAME]
        
    async def setup_test_data(self):
        """Setup test data in the database"""
        print("Setting up test data...")
        
        # Clear existing test data
        await self.db[APPOINTMENTS_COLLECTION].delete_many({"user_id": "user123"})
        await self.db[SUB_SERVICES_COLLECTION].delete_many({"_id": {"$in": [
            ObjectId("689cd830ef2618d4dfe5a595"),
            ObjectId("689cd840ef2618d4dfe5a600"),
            ObjectId("689cd850ef2618d4dfe5a610")
        ]}})
        await self.db[REQUIRED_DOCS_COLLECTION].delete_many({"_id": {"$in": [
            ObjectId("689cd831ef2618d4dfe5a596"),
            ObjectId("689cd832ef2618d4dfe5a597"),
            ObjectId("689cd835ef2618d4dfe5a600"),
            ObjectId("689cd836ef2618d4dfe5a601")
        ]}})
        await self.db[UPLOADED_DOCS_COLLECTION].delete_many({"user_id": "user123"})
        
        # Insert required documents
        required_docs = [
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
        ]
        await self.db[REQUIRED_DOCS_COLLECTION].insert_many(required_docs)
        
        # Insert sub services
        sub_services = [
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
        ]
        await self.db[SUB_SERVICES_COLLECTION].insert_many(sub_services)
        
        # Insert appointments
        appointments = [
            {
                "_id": ObjectId("689db25103b6e08e79db7d7f"),
                "appointment_id": "APT-2024-001",
                "user_id": "user123",
                "sub_service_id": ObjectId("689cd830ef2618d4dfe5a595"),
                "sub_service_steps": [
                    {
                        "step_id": 1,
                        "step_name": "Document Verification",
                        "status": False,
                        "completed_by": None
                    },
                    {
                        "step_id": 2,
                        "step_name": "Certificate Issuance",
                        "status": False,
                        "completed_by": None
                    }
                ],
                "created_at": datetime(2024, 8, 14, 9, 53, 54, 109000),
                "is_fully_completed": False,
                "appointment_date": datetime(2024, 12, 15, 10, 0, 0),
                "appointment_time": datetime(2024, 12, 15, 10, 0, 0),
                "predicted_duration": 60,
                "payment_status": False,
                "appointment_confirmed": True
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
                        "status": False,
                        "completed_by": None
                    }
                ],
                "created_at": datetime(2024, 8, 14, 10, 0, 0),
                "is_fully_completed": False,
                "appointment_date": None,
                "appointment_time": None,
                "predicted_duration": 45,
                "payment_status": False,
                "appointment_confirmed": False
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
                        "status": True,
                        "completed_by": "doctor123"
                    },
                    {
                        "step_id": 2,
                        "step_name": "License Issuance",
                        "status": True,
                        "completed_by": "admin123"
                    }
                ],
                "created_at": datetime(2024, 7, 10, 9, 0, 0),
                "is_fully_completed": True,
                "appointment_date": datetime(2024, 7, 15, 14, 30, 0),
                "appointment_time": datetime(2024, 7, 15, 14, 30, 0),
                "predicted_duration": 30,
                "payment_status": True,
                "appointment_confirmed": True
            }
        ]
        await self.db[APPOINTMENTS_COLLECTION].insert_many(appointments)
        
        # Insert uploaded documents
        uploaded_docs = [
            {
                "_id": ObjectId("689cd833ef2618d4dfe5a598"),
                "booking_id": "689db25103b6e08e79db7d7f",
                "required_doc_id": "689cd831ef2618d4dfe5a596",
                "user_id": "user123",
                "file_name": "business_registration.pdf",
                "file_path": "/uploads/user123/business_registration.pdf",
                "accuracy": 0.95,
                "doc_status": "Approved",
                "uploaded_at": datetime(2024, 8, 14, 10, 30, 0)
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
                "uploaded_at": datetime(2024, 8, 14, 11, 15, 0)
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
                "uploaded_at": datetime(2024, 7, 10, 9, 0, 0)
            }
        ]
        await self.db[UPLOADED_DOCS_COLLECTION].insert_many(uploaded_docs)
        
        print("Test data setup completed!")
        
    async def test_ongoing_appointments(self):
        """Test the ongoing appointments endpoint"""
        print("\n=== Testing Ongoing Appointments ===")
        
        # Simulate the database query
        pipeline = [
            {
                "$match": {
                    "user_id": "user123",
                    "appointment_date": {"$ne": None},
                    "is_fully_completed": False,
                    "appointment_confirmed": True
                }
            },
            {
                "$lookup": {
                    "from": SUB_SERVICES_COLLECTION,
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
        ]
        
        result = await self.db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(None)
        print(f"Found {len(result)} ongoing appointments:")
        for appointment in result:
            print(f"  - {appointment['appointment_id']}: {appointment['service_name']}")
        
        return result
    
    async def test_incomplete_appointments(self):
        """Test the incomplete appointments endpoint"""
        print("\n=== Testing Incomplete Appointments ===")
        
        pipeline = [
            {
                "$match": {
                    "user_id": "user123",
                    "$or": [
                        {"appointment_date": {"$eq": None}},
                        {"appointment_confirmed": False}
                    ]
                }
            },
            {
                "$lookup": {
                    "from": SUB_SERVICES_COLLECTION,
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
        ]
        
        result = await self.db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(None)
        print(f"Found {len(result)} incomplete appointments:")
        for appointment in result:
            print(f"  - {appointment['appointment_id']}: {appointment['service_name']}")
        
        return result
    
    async def test_previous_appointments(self):
        """Test the previous appointments endpoint"""
        print("\n=== Testing Previous Appointments ===")
        
        pipeline = [
            {
                "$match": {
                    "user_id": "user123",
                    "is_fully_completed": True
                }
            },
            {
                "$lookup": {
                    "from": SUB_SERVICES_COLLECTION,
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
        ]
        
        result = await self.db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(None)
        print(f"Found {len(result)} previous appointments:")
        for appointment in result:
            print(f"  - {appointment['appointment_id']}: {appointment['service_name']}")
        
        return result
    
    async def test_appointment_details(self, appointment_id: str, appointment_type: str):
        """Test appointment details endpoints"""
        print(f"\n=== Testing {appointment_type} Appointment Details ===")
        
        if not ObjectId.is_valid(appointment_id):
            print(f"Invalid appointment ID: {appointment_id}")
            return None
        
        pipeline = [
            {
                "$match": {
                    "_id": ObjectId(appointment_id),
                    "user_id": "user123"
                }
            },
            {
                "$lookup": {
                    "from": SUB_SERVICES_COLLECTION,
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
                    "from": REQUIRED_DOCS_COLLECTION,
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
                    "from": UPLOADED_DOCS_COLLECTION,
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
                                "required_doc_id": {"$ifNull": ["$$doc.required_doc_id", None]},
                                "user_id": {"$ifNull": ["$$doc.user_id", None]},
                                "file_name": {"$ifNull": ["$$doc.file_name", None]},
                                "file_path": {"$ifNull": ["$$doc.file_path", None]},
                                "accuracy": {"$ifNull": ["$$doc.accuracy", None]},
                                "doc_status": {"$ifNull": ["$$doc.doc_status", "Pending"]},
                                "uploaded_at": {"$ifNull": ["$$doc.uploaded_at", None]}
                            }
                        }
                    },
                    "is_fully_completed": 1,
                    "appointment_date": 1,
                    "appointment_confirmed": 1,
                    "sub_service_steps": {"$ifNull": ["$sub_service_steps", []]}
                }
            }
        ]
        
        result = await self.db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(1)
        
        if result:
            appointment = result[0]
            print(f"Found appointment: {appointment['appointment_id']}")
            print(f"Service: {appointment['service_name']}")
            print(f"Payment: ${appointment['payment_amount']}")
            print(f"Required documents: {len(appointment['required_documents'])}")
            print(f"Uploaded documents: {len(appointment['uploaded_documents'])}")
            print(f"Steps: {len(appointment.get('sub_service_steps', []))}")
        else:
            print(f"No {appointment_type} appointment found with ID: {appointment_id}")
        
        return result[0] if result else None
    
    async def run_all_tests(self):
        """Run all tests"""
        print("Starting User Appointment Endpoints Testing")
        print("=" * 50)
        
        # Setup test data
        await self.setup_test_data()
        
        # Test list endpoints
        await self.test_ongoing_appointments()
        await self.test_incomplete_appointments()
        await self.test_previous_appointments()
        
        # Test detail endpoints
        await self.test_appointment_details("689db25103b6e08e79db7d7f", "Ongoing")
        await self.test_appointment_details("689db25203b6e08e79db7d80", "Incomplete")
        await self.test_appointment_details("689db25303b6e08e79db7d81", "Previous")
        
        # Test error cases
        print("\n=== Testing Error Cases ===")
        await self.test_appointment_details("invalid_id", "Invalid")
        await self.test_appointment_details("507f1f77bcf86cd799439011", "Non-existent")
        
        print("\nTesting completed!")
        
    async def cleanup(self):
        """Clean up test data"""
        print("\nCleaning up test data...")
        await self.db[APPOINTMENTS_COLLECTION].delete_many({"user_id": "user123"})
        await self.db[SUB_SERVICES_COLLECTION].delete_many({"_id": {"$in": [
            ObjectId("689cd830ef2618d4dfe5a595"),
            ObjectId("689cd840ef2618d4dfe5a600"),
            ObjectId("689cd850ef2618d4dfe5a610")
        ]}})
        await self.db[REQUIRED_DOCS_COLLECTION].delete_many({"_id": {"$in": [
            ObjectId("689cd831ef2618d4dfe5a596"),
            ObjectId("689cd832ef2618d4dfe5a597"),
            ObjectId("689cd835ef2618d4dfe5a600"),
            ObjectId("689cd836ef2618d4dfe5a601")
        ]}})
        await self.db[UPLOADED_DOCS_COLLECTION].delete_many({"user_id": "user123"})
        print("Cleanup completed!")
        
        await self.client.close()

async def main():
    """Main function to run the tests"""
    tester = AppointmentTester()
    try:
        await tester.run_all_tests()
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    # Update the database name before running
    DATABASE_NAME = "your_database_name"  # Replace with your actual database name
    
    asyncio.run(main())
