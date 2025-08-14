from fastapi import APIRouter, HTTPException
from schemas.admin_portal import (
    appointment_detail_card, appointment_detail_card_request, 
    view_detailed_appointment_request, view_detailed_appointment_response, 
    appointment_approval_request, appointment_approval_response, 
    appointment_decline_request, appointment_decline_response,
    get_subservice_details_request, get_subservice_details_response,
    get_selected_appoinment_details_with_pdf_states_request, get_selected_appoinment_details_with_pdf_states_response
)
from services.admin_portal import get_all_appointments_list, get_detailed_appointment, get_subservice_details, get_selected_appoinment_details_with_pdf_states

router = APIRouter(
    prefix="/admin", # Add a prefix for all routes in this file
    tags=["admin"]     # Group these endpoints in the API docs
)
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

@router.post("/get_selected_appoinment_details_with_pdf_states", response_model=get_selected_appoinment_details_with_pdf_states_response)
async def get_selected_appoinment_details_with_pdf_states(query: get_selected_appoinment_details_with_pdf_states_request):
    """
    Get selected appoinment details with pdf states.
    """
    try:
        return await get_selected_appoinment_details_with_pdf_states(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/get_subservice_details", response_model=get_subservice_details_response)
async def get_subservice_details_endpoint(query: get_subservice_details_request):
    """
    Get detailed information about a sub-service including required documents and steps.
    
    This endpoint retrieves comprehensive sub-service details including:
    - Basic sub-service information (name, payment amount)
    - Required documents with descriptions
    - Service steps/process flow
    
    Args:
        query: get_subservice_details_request containing subservice_id
        
    Returns:
        get_subservice_details_response: Detailed sub-service information
    """
    try:
        return await get_subservice_details(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")