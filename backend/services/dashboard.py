from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List, Dict, Any, Optional

# Get all main services 
async def get_all_main_services(db: AsyncIOMotorClient) -> List[Dict[str, Any]]:
    """Retrieves a list of all main services."""
    if db is None:
        return []
    collection_main_services = db["main_services"]
    services = await collection_main_services.find({}, {"_id": 1, "service_name": 1, "icon_name": 1}).to_list(1000)

    # Convert ObjectId to string
    for service in services:
        service["_id"] = str(service["_id"])
    
    return services

# Get sub-service list for a main service 
async def get_sub_services_for_main_service(db: AsyncIOMotorClient, main_service_id: str) -> Optional[List[Dict[str, Any]]]:
    """Finds a main service and joins its sub-services using $lookup."""
    if db is None or not ObjectId.is_valid(main_service_id):
        return None
    collection_main_services = db["main_services"]
    
    pipeline = [
        {"$match": {"_id": ObjectId(main_service_id)}},
        {"$lookup": {"from": "sub_services", "localField": "sub_services", "foreignField": "_id", "as": "sub_services_full"}},
        {"$project": {"_id": 0, "sub_services": "$sub_services_full"}}
    ]
    result = await collection_main_services.aggregate(pipeline).to_list(1)
    
    if result:
        sub_services = result[0].get("sub_services", [])
        # Convert ObjectId to string for each sub-service
        for sub_service in sub_services:
            if "_id" in sub_service:
                sub_service["_id"] = str(sub_service["_id"])
            # Only convert required_docs if it exists and is a list
            if "required_docs" in sub_service and isinstance(sub_service["required_docs"], list):
                sub_service["required_docs"] = [str(doc_id) for doc_id in sub_service["required_docs"]]
        return sub_services
    return None

# Get details for a specific sub-service 
async def get_sub_service_details(db: AsyncIOMotorClient, main_service_id: str, sub_service_id: str) -> Optional[Dict[str, Any]]:
    """Finds a sub-service and joins its required documents using $lookup."""
    if db is None or not ObjectId.is_valid(sub_service_id):
        return None
    collection_sub_services = db["sub_services"]
        
    pipeline = [
        {"$match": {"_id": ObjectId(sub_service_id)}},
        {"$lookup": {"from": "required_documents", "localField": "required_docs", "foreignField": "_id", "as": "required_docs_full"}},
        {"$project": {
            "_id": 1, 
            "service_name": 1, 
            "payment_amount": 1, 
            "required_docs": "$required_docs_full"
        }}
    ]
    result = await collection_sub_services.aggregate(pipeline).to_list(1)
    
    if result:
        service = result[0]
        # Convert ObjectId to string
        service["_id"] = str(service["_id"])
        
        # Convert ObjectId to string for required documents
        for doc in service.get("required_docs", []):
            if "_id" in doc:
                doc["_id"] = str(doc["_id"])
        
        return service
    return None
