from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List

from schemas.user_appointment_get import (
    appointment_summary_response,
    user_request,
    appointment_detail_response
)
from services import user_appointment_get
from database_config import db

# Router for appointment-related actions
router = APIRouter(prefix="/appointments_view", tags=["AppointmentsView"])


@router.post("/ongoing", response_model=List[appointment_summary_response])
async def get_ongoing_appointments(user_req: user_request, db: AsyncIOMotorClient = Depends(lambda: db)):
    """Gets a list of a user's ONGOING appointments (date has been set)."""
    return await user_appointment_get.get_user_appointments_by_status(db, user_req.user_id, is_ongoing=True)

@router.post("/incomplete", response_model=List[appointment_summary_response])
async def get_incomplete_appointments(user_req: user_request, db: AsyncIOMotorClient = Depends(lambda: db)):
    """Gets a list of a user's INCOMPLETE appointments (date has NOT been set)."""
    return await user_appointment_get.get_user_appointments_by_status(db, user_req.user_id, is_ongoing=False)

@router.post("/previous", response_model=List[appointment_summary_response])
async def get_previous_appointments(user_req: user_request, db: AsyncIOMotorClient = Depends(lambda: db)):
    """Gets a list of a user's PREVIOUS (fully completed) appointments."""
    return await user_appointment_get.get_previous_appointments(db, user_req.user_id)


@router.post("/ongoing/{appointment_id}", response_model=appointment_detail_response)
async def get_ongoing_appointment_details(
    appointment_id: str, 
    user_req: user_request, 
    db: AsyncIOMotorClient = Depends(lambda: db)
):
    """Gets detailed information for a specific ongoing appointment."""
    appointment = await user_appointment_get.get_ongoing_appointment_details(db, appointment_id, user_req.user_id)
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ongoing appointment not found for this user."
        )
    return appointment

@router.post("/incomplete/{appointment_id}", response_model=appointment_detail_response)
async def get_incomplete_appointment_details(
    appointment_id: str, 
    user_req: user_request, 
    db: AsyncIOMotorClient = Depends(lambda: db)
):
    """Gets detailed information for a specific incomplete appointment."""
    appointment = await user_appointment_get.get_incomplete_appointment_details(db, appointment_id, user_req.user_id)
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incomplete appointment not found for this user."
        )
    return appointment

@router.post("/previous/{appointment_id}", response_model=appointment_detail_response)
async def get_previous_appointment_details(
    appointment_id: str, 
    user_req: user_request, 
    db: AsyncIOMotorClient = Depends(lambda: db)
):
    """Gets detailed information for a specific previous (completed) appointment."""
    appointment = await user_appointment_get.get_previous_appointment_details(db, appointment_id, user_req.user_id)
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Previous appointment not found for this user."
        )
    return appointment