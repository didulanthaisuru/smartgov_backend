from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List

# Import your schemas and database functions
from schemas.service_schemas import MainServiceInfoSchema, SubServiceInfoSchema, SubServiceDetailSchema
from services import service_operations
from database_config import get_database 

router = APIRouter(
    prefix="/services", # Add a prefix for all routes in this file
    tags=["Services"]     # Group these endpoints in the API docs
)

# --- Route 1: Get all main services for the dashboard ---
@router.get(
    "/",
    response_model=List[MainServiceInfoSchema],
    summary="Get All Main Services",
    description="Provides a list of all main service categories for the dashboard view."
)
async def get_main_services_list(db: AsyncIOMotorClient = Depends(get_database)):
    services = await service_operations.get_all_main_services(db)
    return services

# --- NEW Endpoint 1: Get list of sub-services for a main service ---
@router.get("/{main_service_id}/subservices", response_model=List[SubServiceInfoSchema])
async def get_sub_service_list(main_service_id: str, db: AsyncIOMotorClient = Depends(get_database)):
    """
    Provides a list of all sub-services available under a specific main service.
    """
    sub_services = await service_operations.get_sub_services_for_main_service(db, main_service_id)
    if sub_services is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Main service with ID {main_service_id} not found or has no sub-services."
        )
    return sub_services


# --- NEW Endpoint 2: Get details for a specific sub-service ---
@router.get("/{main_service_id}/subservices/{sub_service_id}", response_model=SubServiceDetailSchema)
async def get_sub_service_detail(main_service_id: str, sub_service_id: int, db: AsyncIOMotorClient = Depends(get_database)):
    """
    Retrieves the full details for a single sub-service, including required
    documents and payment amount.
    """
    details = await service_operations.get_sub_service_details(db, main_service_id, sub_service_id)
    if details is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sub-service with ID {sub_service_id} not found under main service {main_service_id}."
        )
    return details
