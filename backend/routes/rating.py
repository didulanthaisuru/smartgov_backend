from fastapi import APIRouter
from schemas.rating import RatingCreate, RatingResponse
from services.rating import (
    create_rating_service, 
    get_rating_by_appointment_service, 
    get_all_ratings_service
)
from typing import List

router = APIRouter(prefix="/ratings", tags=["Ratings"])

@router.post("/", response_model=RatingResponse)
async def create_rating(data: RatingCreate):
    """Create a new rating for an appointment"""
    return await create_rating_service(data)

@router.get("/appointment/{appointment_id}")
async def get_rating_by_appointment(appointment_id: str):
    """Get rating for a specific appointment"""
    return await get_rating_by_appointment_service(appointment_id)

@router.get("/", response_model=List[dict])
async def get_all_ratings():
    """Get all ratings (for admin purposes)"""
    return await get_all_ratings_service()
