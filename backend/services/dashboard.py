from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List, Dict, Any, Optional

COLLECTION_NAME = "services"

# --- Route 1 Operation ---
async def get_all_main_services(db: AsyncIOMotorClient) -> List[Dict[str, Any]]:
    """
    Retrieves a list of all main services for the dashboard.
    It only fetches the fields needed for the main service list.
    """
    projection = {"_id": 1, "service_name": 1, "icon_name": 1}
    services = await db[COLLECTION_NAME].find({}, projection).to_list(1000)
    # Rename '_id' to 'id' to match the Pydantic schema
    for service in services:
        service['id'] = str(service['_id'])
    return services

# Operation for Endpoint 1: Get sub-service list
async def get_sub_services_for_main_service(db: AsyncIOMotorClient, main_service_id: str) -> Optional[List[Dict[str, Any]]]:
    """
    Finds a main service by its ID and returns its list of sub-services.
    """
    if not ObjectId.is_valid(main_service_id):
        return None
    
    main_service = await db[COLLECTION_NAME].find_one(
        {"_id": ObjectId(main_service_id)},
        {"sub_services": 1, "_id": 0} # Projection: only get the sub_services array
    )
    return main_service.get("sub_services") if main_service else None


# Operation for Endpoint 2: Get single sub-service details
async def get_sub_service_details(db: AsyncIOMotorClient, main_service_id: str, sub_service_id: int) -> Optional[Dict[str, Any]]:
    """
    Finds a specific sub-service within a main service document.
    """
    if not ObjectId.is_valid(main_service_id):
        return None

    # This query finds the main document and filters the sub_services array
    # to return only the element that matches the sub_service_id.
    main_service = await db[COLLECTION_NAME].find_one(
        {"_id": ObjectId(main_service_id), "sub_services.service_sub_id": sub_service_id},
        {"sub_services.$": 1, "_id": 0} # Projection: get only the matching sub-service
    )

    if main_service and "sub_services" in main_service and len(main_service["sub_services"]) > 0:
        return main_service["sub_services"][0] # Return the first (and only) element
    return None

