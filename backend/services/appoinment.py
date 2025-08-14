# services/appoinment.py - Working version
from bson import ObjectId
from fastapi import HTTPException
from database_config import collection_apointment, collection_sub_services
from schemas.appoinment import AppointmentAdd, EmptyAppointmentCreate, AppointmentUpdate
from datetime import datetime

async def get_appointments_by_user_service(user_id: str):
    """Get all appointments for a specific user"""
    if collection_apointment is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Find all appointments for the user
    appointments = await collection_apointment.find({"user_id": user_id}).to_list(1000)
    
    # Convert ObjectIds to strings for JSON serialization
    for appointment in appointments:
        appointment["_id"] = str(appointment["_id"])
        if "sub_service_id" in appointment:
            appointment["sub_service_id"] = str(appointment["sub_service_id"])

    return appointments

async def get_appointment_service(appointment_id: str):
    """Get appointment details by ID"""
    if collection_apointment is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Convert string to ObjectId
    try:
        appointment_object_id = ObjectId(appointment_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid appointment_id format: {str(e)}")

    # Find appointment by _id
    appointment = await collection_apointment.find_one({"_id": appointment_object_id})
    if not appointment:
        raise HTTPException(status_code=404, detail=f"Appointment not found with id: {appointment_id}")

    # Convert ObjectId to string for JSON serialization
    appointment["_id"] = str(appointment["_id"])
    if "sub_service_id" in appointment:
        appointment["sub_service_id"] = str(appointment["sub_service_id"])

    return appointment

async def create_empty_appointment_service(data: EmptyAppointmentCreate):
    """Create an empty appointment with minimal data and return the ObjectId"""
    if collection_apointment is None or collection_sub_services is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Convert string to ObjectId
    try:
        sub_service_object_id = ObjectId(data.sub_service_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid sub_service_id format: {str(e)}")

    # Verify that the sub-service exists
    sub_service = await collection_sub_services.find_one({"_id": sub_service_object_id})
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

    # Create minimal appointment document
    appointment_dict = {
        "user_id": data.user_id,
        "sub_service_id": sub_service_object_id,
        "sub_service_steps": steps_with_status,
        "created_at": datetime.now(),
        "is_fully_completed": False,
        "appointment_date": None,
        "appoinment_time": None,
        "predicted_duration": None,
        "payment_status": False
    }

    result = await collection_apointment.insert_one(appointment_dict)
    return {
        "appointment_id": str(result.inserted_id),
        "message": "Empty appointment created successfully"
    }

async def update_appointment_service(appointment_id: str, data: AppointmentUpdate):
    """Update an existing appointment with partial data"""
    if collection_apointment is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Convert string to ObjectId
    try:
        appointment_object_id = ObjectId(appointment_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid appointment_id format: {str(e)}")

    # Check if appointment exists
    existing_appointment = await collection_apointment.find_one({"_id": appointment_object_id})
    if not existing_appointment:
        raise HTTPException(status_code=404, detail=f"Appointment not found with id: {appointment_id}")

    # Build update data (only include fields that are not None)
    update_data = {}
    if data.appointment_date is not None:
        update_data["appointment_date"] = data.appointment_date
    if data.appoinment_time is not None:
        update_data["appoinment_time"] = data.appoinment_time
    if data.predicted_duration is not None:
        update_data["predicted_duration"] = data.predicted_duration
    if data.payment_status is not None:
        update_data["payment_status"] = data.payment_status
    if data.is_fully_completed is not None:
        update_data["is_fully_completed"] = data.is_fully_completed

    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields to update")

    # Update the appointment
    result = await collection_apointment.update_one(
        {"_id": appointment_object_id},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update appointment")

    return {
        "appointment_id": appointment_id,
        "message": "Appointment updated successfully"
    }

async def create_appointment_service(data: AppointmentAdd):
    if collection_apointment is None or collection_sub_services is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Convert string to ObjectId
    try:
        object_id = ObjectId(data.sub_service_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid sub_service_id format: {str(e)}")

    # Debug: Check what's in the collection
    all_docs = await collection_sub_services.find({}, {"_id": 1}).to_list(10)
    print(f"All IDs in collection: {[str(doc['_id']) for doc in all_docs]}")
    print(f"Looking for: {object_id}")
    
    # Find sub_service by _id
    sub_service = await collection_sub_services.find_one({"_id": object_id})
    
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

    result = await collection_apointment.insert_one(appointment_dict)
    return {
        "message": "Appointment created successfully", 
        "appointment_id": str(result.inserted_id),
        "steps_copied": len(steps)
    }