# services/appoinment.py - Working version
from bson import ObjectId
from fastapi import HTTPException
from database_config import db, DB_NAME
from schemas.appoinment import AppointmentAdd
from datetime import datetime

async def create_appointment_service(data: AppointmentAdd):
    if db.client is None:
        raise HTTPException(status_code=500, detail="MongoDB client is not initialized.")

    appointments_collection = db.client[DB_NAME]["AppoinmentNew"]
    sub_services_collection = db.client[DB_NAME]["sub_services"]

    # Convert string to ObjectId
    try:
        object_id = ObjectId(data.sub_service_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid sub_service_id format: {str(e)}")

    # Debug: Check what's in the collection
    all_docs = await sub_services_collection.find({}, {"_id": 1}).to_list(10)
    print(f"All IDs in collection: {[str(doc['_id']) for doc in all_docs]}")
    print(f"Looking for: {object_id}")
    
    # Find sub_service by _id
    sub_service = await sub_services_collection.find_one({"_id": object_id})
    
    if not sub_service:
        raise HTTPException(status_code=404, detail=f"Sub-service not found with id: {data.sub_service_id}")

    # Get steps from sub_service and add status/completed_by
    steps = sub_service.get("steps", [])
    steps_with_status = []
    for step in steps:
        step_copy = dict(step)  # Make a copy to avoid mutating the original
        step_copy["status"] = False
        step_copy["completed_by"] = None
        steps_with_status.append(step_copy)

    # Create appointment document
    appointment_dict = {
        "appointment_id": data.appointment_id,
        "user_id": data.user_id,
        "sub_service_id": object_id,
        "sub_service_steps": steps_with_status,  # Store the steps array from sub_service with status/completed_by
        "created_at": data.created_at if data.created_at else datetime.now(),
        "is_fully_completed": data.is_fully_completed if data.is_fully_completed is not None else False,
        "appointment_date": data.appointment_date,
        "appoinment_time": data.appoinment_time,
        "predicted_duration": data.predicted_duration,
        "payment_status": data.payment_status
    }

    result = await appointments_collection.insert_one(appointment_dict)
    return {
        "message": "Appointment created successfully", 
        "appointment_id": str(result.inserted_id),
        "steps_copied": len(steps)
    }