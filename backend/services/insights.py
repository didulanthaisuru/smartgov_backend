from database_config import collection_apointment, collection_sub_services, collection_main_services
from schemas.insights import InsightQuery, MainServiceQuery, SubServiceInsightResponse, MainServiceInsightResponse
from datetime import date
from typing import List
import asyncio

async def get_insights_by_date_sub_service(query: InsightQuery) -> SubServiceInsightResponse:
    """
    Get appointment count and IDs for a specific sub_service and date
    """
    try:
        # Convert date to datetime for MongoDB query
        start_date = query.date
        end_date = date(query.date.year, query.date.month, query.date.day + 1)
        
        # Query appointments for the specific sub_service and date
        pipeline = [
            {
                "$match": {
                    "sub_service_id": query.sub_service_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lt": end_date
                    }
                }
            },
            {
                "$project": {
                    "appointment_id": 1,
                    "user_id": 1,
                    "sub_service_id": 1,
                    "appointment_date": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Extract appointment IDs
        appointment_ids = [appointment["appointment_id"] for appointment in appointments]
        total_count = len(appointment_ids)
        
        return SubServiceInsightResponse(
            sub_service_id=query.sub_service_id,
            date=query.date,
            total_appointments=total_count,
            appointment_ids=appointment_ids
        )
        
    except Exception as e:
        raise Exception(f"Error getting insights by sub_service and date: {str(e)}")

async def get_insights_by_date_main_service(query: MainServiceQuery) -> MainServiceInsightResponse:
    """
    Get appointment count and IDs for a specific sub_service, main_service and date
    """
    try:
        # First, get the main_service_id from sub_services collection
        sub_service = await collection_sub_services.find_one({"service_sub_id": query.sub_service_id})
        if not sub_service:
            raise ValueError(f"Sub-service with ID {query.sub_service_id} not found")
        
        # Verify that the sub_service belongs to the specified main_service
        if sub_service.get("service_id") != query.main_service_id:
            raise ValueError(f"Sub-service {query.sub_service_id} does not belong to main-service {query.main_service_id}")
        
        # Convert date to datetime for MongoDB query
        start_date = query.date
        end_date = date(query.date.year, query.date.month, query.date.day + 1)
        
        # Query appointments for the specific sub_service and date
        pipeline = [
            {
                "$match": {
                    "sub_service_id": query.sub_service_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lt": end_date
                    }
                }
            },
            {
                "$project": {
                    "appointment_id": 1,
                    "user_id": 1,
                    "sub_service_id": 1,
                    "appointment_date": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Extract appointment IDs
        appointment_ids = [appointment["appointment_id"] for appointment in appointments]
        total_count = len(appointment_ids)
        
        return MainServiceInsightResponse(
            sub_service_id=query.sub_service_id,
            main_service_id=query.main_service_id,
            date=query.date,
            total_appointments=total_count,
            appointment_ids=appointment_ids
        )
        
    except Exception as e:
        raise Exception(f"Error getting insights by main_service and date: {str(e)}")

# Legacy functions for backward compatibility
def get_insights_by_date_sub_service_sync(query: InsightQuery):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_date_sub_service(query))

def get_insights_by_date_main_service_sync(query: MainServiceQuery):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_date_main_service(query))
