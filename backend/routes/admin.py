from fastapi import APIRouter, HTTPException
from schemas.admin import appointment_detail_card, appointment_detail_card_request, view_detailed_appointment_request, view_detailed_appointment_response, appointment_approval_request, appointment_approval_response, appointment_decline_request, appointment_decline_response
from services.admin import get_all_appointments_list, get_detailed_appointment

router = APIRouter()

@router.post("/get_all_appointments_list", response_model=list[appointment_detail_card])
async def appointments_list(query: appointment_detail_card_request):
    """
    Get all appointments for a specific date and service_id.
    
    This endpoint retrieves appointments filtered by appointment date and sub_service_id.
    Returns a list of appointment detail cards with status, duration, and user information.
    """
    try:
        return await get_all_appointments_list(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/view_all_detailes_of_selected_appointment", response_model=view_detailed_appointment_response)
async def view_all_detailes_of_selected_appointment(query: view_detailed_appointment_request):
    """
    View all details of a selected appointment.
    
    This endpoint retrieves detailed information about a specific appointment.
    Returns a view_detailed_appointment_response with appointment details.
    """
    try:
        return await get_detailed_appointment(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")