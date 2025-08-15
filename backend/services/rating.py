from bson import ObjectId
from fastapi import HTTPException
from database_config import collection_apointment
from schemas.rating import RatingCreate, RatingInDB
from datetime import datetime

from database_config import collection_ratings

async def create_rating_service(data: RatingCreate):
    """Create a new rating for an appointment"""
    if collection_ratings is None or collection_apointment is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Validate appointment_id format
    try:
        appointment_object_id = ObjectId(data.appointment_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid appointment_id format: {str(e)}")

    # Check if appointment exists
    appointment = await collection_apointment.find_one({"_id": appointment_object_id})
    if not appointment:
        raise HTTPException(status_code=404, detail=f"Appointment not found with id: {data.appointment_id}")

    # Check if rating already exists for this appointment
    existing_rating = await collection_ratings.find_one({"appointment_id": data.appointment_id})
    if existing_rating:
        raise HTTPException(status_code=400, detail="Rating already exists for this appointment")

    # Create rating document
    rating_dict = {
        "appointment_id": data.appointment_id,
        "rating": data.rating,
        "feedback": data.feedback,
        "created_at": datetime.now()
    }

    # Insert rating into database
    result = await collection_ratings.insert_one(rating_dict)
    
    return {
        "rating_id": str(result.inserted_id),
        "appointment_id": data.appointment_id,
        "rating": data.rating,
        "feedback": data.feedback,
        "created_at": rating_dict["created_at"],
        "message": "Rating submitted successfully"
    }

async def get_rating_by_appointment_service(appointment_id: str):
    """Get rating for a specific appointment"""
    if collection_ratings is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Validate appointment_id format
    try:
        ObjectId(appointment_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid appointment_id format: {str(e)}")

    # Find rating for the appointment
    rating = await collection_ratings.find_one({"appointment_id": appointment_id})
    if not rating:
        raise HTTPException(status_code=404, detail=f"No rating found for appointment: {appointment_id}")

    # Convert ObjectId to string for JSON serialization
    rating["_id"] = str(rating["_id"])

    return rating

async def get_all_ratings_service():
    """Get all ratings (for admin purposes)"""
    if collection_ratings is None:
        raise HTTPException(status_code=500, detail="MongoDB collections are not initialized.")

    # Find all ratings
    ratings = await collection_ratings.find().to_list(1000)
    
    # Convert ObjectIds to strings for JSON serialization
    for rating in ratings:
        rating["_id"] = str(rating["_id"])

    return ratings
