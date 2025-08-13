from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List

from schemas.user_appointment_get import (
    appointment_summary_response,
    user_request
)
from services import user_appointment_get
from database_config import get_database

# Router for appointment-related actions
router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.post("/ongoing", response_model=List[appointment_summary_response])
async def get_ongoing_appointments(user_req: user_request, db: AsyncIOMotorClient = Depends(get_database)):
    """Gets a list of a user's ONGOING appointments (date has been set)."""
    return await user_appointment_get.get_user_appointments_by_status(db, user_req.user_id, is_ongoing=True)

@router.post("/incomplete", response_model=List[appointment_summary_response])
async def get_incomplete_appointments(user_req: user_request, db: AsyncIOMotorClient = Depends(get_database)):
    """Gets a list of a user's INCOMPLETE appointments (date has NOT been set)."""
    return await user_appointment_get.get_user_appointments_by_status(db, user_req.user_id, is_ongoing=False)

# @router.post("/{appointment_id}/details", response_model=AppointmentDetailResponse)
# async def get_user_appointment(appointment_id: str, user_req: UserRequest, db: AsyncIOMotorClient = Depends(get_database)):
#     """Retrieves the detailed state of a specific appointment for a specific user."""
#     appointment_details = await appointment_services.get_appointment_details(db, appointment_id)
    
#     # Security check: Ensure the appointment belongs to the user in the request body
#     if not appointment_details or appointment_details.get("user_id") != user_req.user_id:
#         raise HTTPException(status_code=404, detail="Appointment not found for this user.")
        
#     return appointment_details