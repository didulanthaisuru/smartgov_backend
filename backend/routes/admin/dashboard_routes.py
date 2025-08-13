from fastapi import APIRouter, Depends

# Import the service function and the response schema
from services.admin_services import dashboard_service
from schemas.admin_services.dashboard_schemas import TotalAppointmentsResponse

# Create a new router for the dashboard
router = APIRouter(
    prefix="/api/admin/dashboard",
    tags=["Admin Dashboard"]  # This groups the endpoints in the API docs
)

@router.get("/total_appointment/{admin_id}", response_model=TotalAppointmentsResponse)
async def get_total_appointments_by_admin(admin_id: int):
    """
    Gets the total count of non-completed appointments for a specific admin.
    """
    count = await dashboard_service.get_total_appointments_count_for_admin(admin_id=admin_id)
    return {"totalAppointments": count}