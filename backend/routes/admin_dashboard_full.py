from fastapi import APIRouter, HTTPException

# Import the service function and the response schema
from services.admin_dashboard_full import get_appointments_by_sub_service_full, get_appointment_details_by_id, get_appointment_step_details, approve_uploaded_document
from schemas.admin_dashboard_full import AppointmentsFullResponse, AppointmentDetailsResponse, AppointmentStepDetailsResponse, DocumentApprovalResponse

# Create a new router for the admin dashboard full
router = APIRouter(
    prefix="/api/admin/dashboard-full",
    tags=["Admin Dashboard Full"]
)

@router.get("/appointments_by_subservice/{sub_service_id}", response_model=AppointmentsFullResponse)
async def get_appointments_by_sub_service_full_route(sub_service_id: str):
    """
    Gets full appointment details for a specific sub_service_id where appointment_confirmed is true.
    Includes user names by joining with the users collection.
    
    Args:
        sub_service_id (str): The sub service ID to get appointments for
        
    Returns:
        AppointmentsFullResponse: List of appointments with full details including appointment_id, 
        predicted_duration, all dates, and user name
    """
    appointments = await get_appointments_by_sub_service_full(sub_service_id=sub_service_id)
    
    return {"appointments": appointments}

@router.get("/appointment_details/{appointment_id}", response_model=AppointmentDetailsResponse)
async def get_appointment_details_by_id_route(appointment_id: str):
    """
    Gets complete appointment details for a specific appointment_id.
    Includes user name, required document details, and all uploaded document details.
    
    Args:
        appointment_id (str): The appointment ID to get details for
        
    Returns:
        AppointmentDetailsResponse: Complete appointment details including user name, 
        required documents, and uploaded documents
    """
    appointment_details = await get_appointment_details_by_id(appointment_id=appointment_id)
    
    if appointment_details is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    return appointment_details

@router.get("/appointment_step_details/{appointment_id}", response_model=AppointmentStepDetailsResponse)
async def get_appointment_step_details_route(appointment_id: str):
    """
    Gets step details for a specific appointment_id with proper mapping between sub-service steps and appointment step status.
    
    Args:
        appointment_id (str): The appointment ID to get step details for
        
    Returns:
        AppointmentStepDetailsResponse: Step details with proper mapping between sub-service steps and appointment status
    """
    step_details = await get_appointment_step_details(appointment_id=appointment_id)
    
    if step_details is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    return step_details

@router.put("/approve_document/{document_id}", response_model=DocumentApprovalResponse)
async def approve_document_route(document_id: str):
    """
    Approves an uploaded document by updating its status from 'pending' to 'approved'.
    """
    result = await approve_uploaded_document(document_id=document_id)
    
    if result is None:
        raise HTTPException(status_code=404, detail="Document not found or already approved")
    
    return result
