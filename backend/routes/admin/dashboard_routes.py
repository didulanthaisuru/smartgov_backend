from fastapi import APIRouter, Depends

# Import the service function and the response schema
from services.admin_services import dashboard_service
from schemas.admin_services.dashboard_schemas import TotalAppointmentsResponse

# Create a new router for the dashboard
router = APIRouter(
    prefix="/api/admin/dashboard",
    tags=["Admin Dashboard"]  # This groups the endpoints in the API docs
)


@router.get("/total_appointment", response_model=TotalAppointmentsResponse)
def get_total_appointments():
    """
    Gets the total count of all appointments.
    """
    count = dashboard_service.get_total_appointments_count()
    return {"totalAppointments": count}