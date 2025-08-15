from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from datetime import datetime

from schemas.admin_appointment_updates import (
    appointment_steps_update_request,
    appointment_completion_update_request
)
from services.admin_appointment_updates import update_appointment_steps, update_appointment_completion
from database_config import get_database

# Router for admin appointment updates
router = APIRouter(prefix="/admin/appointments", tags=["AdminAppointmentUpdates"])

@router.put("/steps")
async def update_appointment_steps_endpoint(
    update_request: appointment_steps_update_request,
    db: AsyncIOMotorClient = Depends(get_database)
):
    """
    Updates the status and completion details for specific steps in an appointment.
    Admin can mark individual steps as completed.
    """
    try:
        result = await update_appointment_steps(db, update_request)
        return {"message": "Appointment steps updated successfully", "updated_steps": result}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update appointment steps: {str(e)}"
        )

@router.put("/completion")
async def update_appointment_completion_endpoint(
    update_request: appointment_completion_update_request,
    db: AsyncIOMotorClient = Depends(get_database)
):
    """
    Updates the overall completion status of an appointment.
    Admin can mark the entire appointment as fully completed.
    """
    try:
        result = await update_appointment_completion(db, update_request)
        return {"message": "Appointment completion status updated successfully", "updated_appointment": result}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update appointment completion: {str(e)}"
        )