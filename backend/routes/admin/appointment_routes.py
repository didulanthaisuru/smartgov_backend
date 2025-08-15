from fastapi import APIRouter, Query
from typing import Optional
from services.admin_services.appointments_service import get_appointments_list
from schemas.admin_services.appointment_schemas import AppointmentsListResponse

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin Appointments"]
)

@router.get("/appointments", response_model=AppointmentsListResponse)
async def list_appointments(
    date: Optional[str] = None
):
    """
    Get a paginated list of appointments, with optional filters for date and status.
    """
    result = await get_appointments_list(
        date=date
    )
    return result