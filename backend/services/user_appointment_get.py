from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import Dict, Any, Optional, List
from datetime import datetime

# Collection names
SUB_SERVICES_COLLECTION = "sub_services"
APPOINTMENTS_COLLECTION = "AppointmentNew1"
# UPLOADED_DOCS_COLLECTION = "uploaded_documents"

# async def get_appointment_details(db: AsyncIOMotorClient, appointment_id: str) -> Optional[Dict[str, Any]]:
#     """
#     Constructs the detailed appointment view by joining data from multiple collections.
#     This is the core logic for the user's checklist view.
#     """
#     if not ObjectId.is_valid(appointment_id): return None
        
#     pipeline = [
#         {"$match": {"_id": ObjectId(appointment_id)}},
#         {"$lookup": {"from": SUB_SERVICES_COLLECTION, "localField": "sub_service_id", "foreignField": "_id", "as": "sub_service_info"}},
#         {"$unwind": "$sub_service_info"},
#         {"$lookup": {"from": UPLOADED_DOCS_COLLECTION, "localField": "_id", "foreignField": "appointment_id", "as": "uploaded_docs_info"}},
#         {"$project": {
#             "appointment_id": {"$toString": "$_id"},
#             "user_id": 1, "service_name": "$sub_service_info.service_name", "sub_service_states": 1,
#             "is_fully_completed": 1, "appointment_date": 1,
#             "document_checklist": {
#                 "$map": {
#                     "input": "$sub_service_info.required_docs", "as": "required",
#                     "in": {
#                         "$let": {
#                             "vars": {"uploaded_doc": {"$first": {"$filter": {"input": "$uploaded_docs_info", "as": "uploaded", "cond": {"$eq": ["$$uploaded.required_doc_id", "$$required.doc_id"]}}}}},
#                             "in": {
#                                 "required_doc_id": "$$required.doc_id",
#                                 "doc_name": "$$required.doc_name",
#                                 "description": "$$required.description",
#                                 "is_uploaded": {"$ne": ["$$uploaded_doc", None]},
#                                 "accuracy": {"$ifNull": ["$$uploaded_doc.accuracy", None]},
#                                 "doc_status": {"$ifNull": ["$$uploaded_doc.doc_status", "Not Uploaded"]},
#                                 "file_path": {"$ifNull": ["$$uploaded_doc.file_path", None]}
#                             }
#                         }
#                     }
#                 }
#             }
#         }}
#     ]
#     result = await db[APPOINTMENTS_COLLECTION].aggregate(pipeline).to_list(1)
#     return result[0] if result else None


async def get_user_appointments_by_status(db: AsyncIOMotorClient, user_id: str, is_ongoing: bool) -> List[Dict[str, Any]]:
    """
    Gets a list of a user's appointments, filtered by status.
    is_ongoing = True for "Ongoing Activities" (date is set)
    is_ongoing = False for "Incomplete Activities" (date is null)
    """
    match_condition = {"$ne": None} if is_ongoing else {"$eq": None}

    pipeline = [
        # Find all appointments for the user that match the condition
        {"$match": {"user_id": user_id, "appointment_date": match_condition}},
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

