from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import Dict, Any, Optional, List
from datetime import datetime

# Collection names
SUB_SERVICES_COLLECTION = "sub_services"
APPOINTMENTS_COLLECTION = "AppoinmentNew"
UPLOADED_DOCS_COLLECTION = "uploaded_documents"
REQUIRED_DOCS_COLLECTION = "required_documents"

async def get_user_appointments_by_status(db: AsyncIOMotorClient, user_id: str, is_ongoing: bool) -> List[Dict[str, Any]]:
    """
    Gets a list of a user's appointments, filtered by status.
    is_ongoing = True for "Ongoing Activities" (date is set AND not fully completed)
    is_ongoing = False for "Incomplete Activities" (date is null)
    """
    if is_ongoing:
        # For ongoing: date is set AND not fully completed
        match_condition = {
            "appointment_date": {"$ne": None},
            "is_fully_completed": False
        }
    else:
        # For incomplete: date is null
        match_condition = {"appointment_date": {"$eq": None}}

    pipeline = [
        # Find all appointments for the user that match the condition
        {"$match": {"user_id": user_id, **match_condition}},
        # Join with sub_services to get the service name
        {"$lookup": {
            "from": SUB_SERVICES_COLLECTION,
            "localField": "sub_service_id",
            "foreignField": "_id",
            "as": "sub_service_info"
        }},
        {"$unwind": "$sub_service_info"},
        # Project the summary shape
        {"$project": {
            "_id": 0, # Exclude the original _id
            "appointment_id": {"$toString": "$_id"},
            "service_name": "$sub_service_info.service_name",
            "appointment_date": 1,
            "is_fully_completed": 1
        }}
    ]
    return await db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(None)

async def get_previous_appointments(db: AsyncIOMotorClient, user_id: str) -> List[Dict[str, Any]]:
    """Gets a list of a user's PREVIOUS (fully completed) appointments."""
    pipeline = [
        # Find all appointments for the user that are fully completed
        {"$match": {"user_id": user_id, "is_fully_completed": True}},
        # Join with sub_services to get the service name
        {"$lookup": {
            "from": SUB_SERVICES_COLLECTION,
            "localField": "sub_service_id",
            "foreignField": "_id",
            "as": "sub_service_info"
        }},
        {"$unwind": "$sub_service_info"},
        # Project the summary shape
        {"$project": {
            "_id": 0, "appointment_id": {"$toString": "$_id"}, "service_name": "$sub_service_info.service_name",
            "appointment_date": 1, "is_fully_completed": 1
        }}
    ]
    return await db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(None)

async def get_appointment_details_by_id(db: AsyncIOMotorClient, appointment_id: str, user_id: str) -> Optional[Dict[str, Any]]:
    """
    Gets detailed information for a specific appointment including required documents,
    payment amount, and uploaded documents.
    """
    if not ObjectId.is_valid(appointment_id):
        return None
        
    pipeline = [
        {"$match": {"_id": ObjectId(appointment_id), "user_id": user_id}},

        # Join sub_service info
        {"$lookup": {
            "from": SUB_SERVICES_COLLECTION,
            "localField": "sub_service_id",
            "foreignField": "_id",
            "as": "sub_service_info"
        }},
        {"$unwind": "$sub_service_info"},

        # Resolve required_docs (array of ObjectIds) to their details
        {"$lookup": {
            "from": "required_documents",
            "let": {"req_ids": "$sub_service_info.required_docs"},
            "pipeline": [
                {"$match": {"$expr": {"$in": ["$_id", "$$req_ids"]}}},
                {"$project": {
                    "_id": 0,
                    "required_doc_id": {"$toString": "$_id"},
                    "doc_name": 1,
                    "description": 1
                }}
            ],
            "as": "required_docs_info"
        }},

        # Join uploaded documents by matching string(appointment _id) to uploaded_docs.booking_id
        {"$lookup": {
            "from": UPLOADED_DOCS_COLLECTION,
            "let": {"appointmentIdStr": {"$toString": "$_id"}},
            "pipeline": [
                {"$match": {"$expr": {"$eq": ["$booking_id", "$$appointmentIdStr"]}}}
            ],
            "as": "uploaded_docs"
        }},

        # Final projection
        {"$project": {
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
            "appointment_date": 1
        }}
    ]
    
    result = await db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(1)
    return result[0] if result else None

async def get_ongoing_appointment_details(db: AsyncIOMotorClient, appointment_id: str, user_id: str) -> Optional[Dict[str, Any]]:
    """
    Gets detailed information for an ongoing appointment (date is set).
    """
    appointment = await get_appointment_details_by_id(db, appointment_id, user_id)
    if appointment and appointment.get("appointment_date"):
        return appointment
    return None

async def get_incomplete_appointment_details(db: AsyncIOMotorClient, appointment_id: str, user_id: str) -> Optional[Dict[str, Any]]:
    """
    Gets detailed information for an incomplete appointment (date is not set).
    """
    appointment = await get_appointment_details_by_id(db, appointment_id, user_id)
    if appointment and not appointment.get("appointment_date"):
        return appointment
    return None

async def get_previous_appointment_details(db: AsyncIOMotorClient, appointment_id: str, user_id: str) -> Optional[Dict[str, Any]]:
    """
    Gets detailed information for a previous (completed) appointment.
    """
    appointment = await get_appointment_details_by_id(db, appointment_id, user_id)
    if appointment and appointment.get("is_fully_completed"):
        return appointment
    return None
