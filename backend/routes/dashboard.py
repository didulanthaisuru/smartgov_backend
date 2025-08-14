from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List

# Import your schemas and database functions
from schemas.dashboard import main_service_info_response, sub_service_info_response, sub_service_detail_response
from services import dashboard
from database_config import db 

router = APIRouter(
    prefix="/services", # Add a prefix for all routes in this file
    tags=["Services"]     # Group these endpoints in the API docs
)

# Get all main services for the dashboard
@router.get("/", response_model=List[main_service_info_response])
async def get_main_services_list(database: AsyncIOMotorClient = Depends(lambda: db)):
    """
    Provides a list of all main services in the landing page.
    """
    services = await dashboard.get_all_main_services(database)
    return services

#  Get list of sub-services for a main service 
@router.get("/{main_service_id}/subservices", response_model=List[sub_service_info_response])
async def get_sub_service_list(main_service_id: str, database: AsyncIOMotorClient = Depends(lambda: db)):
    """
    Provides a list of all sub-services available under a specific main service.
    """
    # Validate ObjectId format
    if not main_service_id or len(main_service_id) != 24:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid main service ID format"
        )
    
    sub_services = await dashboard.get_sub_services_for_main_service(database, main_service_id)
    if sub_services is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Main service with ID {main_service_id} not found or has no sub-services."
        )
    return sub_services


# Get details for a specific sub-service 
@router.get("/{main_service_id}/subservices/{sub_service_id}", response_model=sub_service_detail_response)
async def get_sub_service_detail(main_service_id: str, sub_service_id: str, database: AsyncIOMotorClient = Depends(lambda: db)):
    """
    Retrieves the full details for a single sub-service, including required
    documents and payment amount.
    """
    details = await dashboard.get_sub_service_details(database, main_service_id, sub_service_id)
    if details is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sub-service with ID {sub_service_id} not found under main service {main_service_id}."
        )
    return details
