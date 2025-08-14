from database_config import collection_apointment, collection_sub_services, collection_main_services, collection_insights
from schemas.insights_derect import InsightDirectQuery, InsightDirectResponse, InsightDirectListResponse
from datetime import date, datetime, timedelta
from typing import List, Optional
import asyncio

async def get_insights_direct(query: InsightDirectQuery) -> InsightDirectListResponse:
    """
    Get insights data based on service_id, sub_service_id, main_service_id, and date
    """
    try:
        # Build match conditions based on provided parameters
        match_conditions = {}
        
        if query.sub_service_id:
            match_conditions["sub_service_id"] = query.sub_service_id
            
        if query.main_service_id:
            match_conditions["main_service_id"] = query.main_service_id
            
        if query.date:
            # Convert date to datetime for MongoDB query
            start_date = query.date
            end_date = date(query.date.year, query.date.month, query.date.day + 1)
            match_conditions["date"] = {
                "$gte": start_date,
                "$lt": end_date
            }
        
        # If service_id is provided, we need to find related sub_services first
        if query.service_id:
            # Find sub_services that belong to this service_id
            sub_services_cursor = collection_sub_services.find({"service_id": query.service_id})
            sub_services = await sub_services_cursor.to_list(length=None)
            
            if sub_services:
                sub_service_ids = [sub_service["service_sub_id"] for sub_service in sub_services]
                match_conditions["sub_service_id"] = {"$in": sub_service_ids}
            else:
                # No sub_services found for this service_id
                return InsightDirectListResponse(insights=[], total_count=0)
        
        # Query insights collection
        pipeline = [
            {"$match": match_conditions} if match_conditions else {},
            {
                "$project": {
                    "date": 1,
                    "sub_service_id": 1,
                    "main_service_id": 1,
                    "average_processing_time": 1,
                    "no_show_count": 1,
                    "predicted_number_of_visitors": 1
                }
            },
            {"$sort": {"date": -1}}
        ]
        
        cursor = collection_insights.aggregate(pipeline)
        insights_data = await cursor.to_list(length=None)
        
        # Convert to response format
        insights = []
        for data in insights_data:
            # Format average_processing_time as HH:MM:SS
            processing_time = data.get("average_processing_time", "00:00:00")
            if isinstance(processing_time, (int, float)):
                # Convert minutes to HH:MM:SS format
                minutes = int(processing_time)
                hours = minutes // 60
                remaining_minutes = minutes % 60
                processing_time = f"{hours:02d}:{remaining_minutes:02d}:00"
            elif isinstance(processing_time, str) and ":" not in processing_time:
                # If it's a string number, convert to HH:MM:SS
                try:
                    minutes = int(processing_time)
                    hours = minutes // 60
                    remaining_minutes = minutes % 60
                    processing_time = f"{hours:02d}:{remaining_minutes:02d}:00"
                except ValueError:
                    processing_time = "00:00:00"
            
            insight = InsightDirectResponse(
                date=data.get("date", date.today()),
                sub_service_id=data.get("sub_service_id", ""),
                main_service_id=data.get("main_service_id", ""),
                average_processing_time=processing_time,
                no_show_count=data.get("no_show_count", 0),
                predicted_number_of_visitors=data.get("predicted_number_of_visitors", 0)
            )
            insights.append(insight)
        
        return InsightDirectListResponse(
            insights=insights,
            total_count=len(insights)
        )
        
    except Exception as e:
        raise Exception(f"Error getting insights direct: {str(e)}")

async def get_insights_by_sub_service(sub_service_id: str, query_date: Optional[date] = None) -> InsightDirectListResponse:
    """
    Get insights for a specific sub_service_id
    """
    query = InsightDirectQuery(sub_service_id=sub_service_id, date=query_date)
    return await get_insights_direct(query)

async def get_insights_by_main_service(main_service_id: str, query_date: Optional[date] = None) -> InsightDirectListResponse:
    """
    Get insights for a specific main_service_id
    """
    query = InsightDirectQuery(main_service_id=main_service_id, date=query_date)
    return await get_insights_direct(query)

async def get_insights_by_service(service_id: str, query_date: Optional[date] = None) -> InsightDirectListResponse:
    """
    Get insights for a specific service_id
    """
    query = InsightDirectQuery(service_id=service_id, date=query_date)
    return await get_insights_direct(query)

# Legacy functions for backward compatibility
def get_insights_direct_sync(query: InsightDirectQuery):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_direct(query))

def get_insights_by_sub_service_sync(sub_service_id: str, query_date: Optional[date] = None):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_sub_service(sub_service_id, query_date))

def get_insights_by_main_service_sync(main_service_id: str, query_date: Optional[date] = None):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_main_service(main_service_id, query_date))

def get_insights_by_service_sync(service_id: str, query_date: Optional[date] = None):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_service(service_id, query_date))
