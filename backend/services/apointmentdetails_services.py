from fastapi import HTTPException
from datetime import datetime
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from database_config import db

load_dotenv()

# Async MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["SmartGov"]
appointment_collection = db["appointmentdetails"]

def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

async def get_appointment_by_id(appointment_id: int):
    doc = await appointment_collection.find_one({"appointment_id": appointment_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return serialize_doc(doc)

async def get_document_metadata(appointment_id: int, doc_id: str):
    appointment = await appointment_collection.find_one({"appointment_id": appointment_id})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    document = next((doc for doc in appointment.get("documents", []) if doc.get("doc_id") == doc_id), None)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

async def approve_appointment(appointment_id: int):
    appointment = await appointment_collection.find_one({"appointment_id": appointment_id})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_result = await appointment_collection.update_one(
        {"appointment_id": appointment_id},
        {
            "$set": {
                "status": "approved",
                "approved_at": datetime.utcnow().isoformat()
            }
        }
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to approve appointment")

    return {
        "message": "Appointment approved successfully",
        "appointment_id": appointment_id,
        "status": "approved",
        "approved_at": datetime.utcnow().isoformat()
    }

async def decline_appointment(appointment_id: int):
    appointment = await appointment_collection.find_one({"appointment_id": appointment_id})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_result = await appointment_collection.update_one(
        {"appointment_id": appointment_id},
        {
            "$set": {
                "status": "declined",
                "declined_at": datetime.utcnow().isoformat()
            }
        }
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to decline appointment")

    return {
        "message": "Appointment declined successfully",
        "appointment_id": appointment_id,
        "status": "declined",
        "declined_at": datetime.utcnow().isoformat()
    }
