from database_config import collection_insights
from schemas.insights_derect import InsightDirectQuery, InsightDirectResponse, InsightDirectListResponse
from datetime import date, datetime
from typing import List, Optional
import asyncio

async def get_insights_by_date_and_sub_service(sub_service_id: str, query_date: date) -> InsightDirectListResponse:
    """
    Get insights data for a specific sub_service_id and date
    """
    try:
        # Convert date to datetime for MongoDB query
        start_date = datetime.combine(query_date, datetime.min.time())
        end_date = datetime.combine(query_date, datetime.max.time())
        
        # Query insights collection
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_id,
                    "date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
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
            # Convert MongoDB date to Python date
            insight_date = data.get("date")
            if isinstance(insight_date, datetime):
                insight_date = insight_date.date()
            elif isinstance(insight_date, dict) and "$date" in insight_date:
                # Handle MongoDB extended JSON format
                insight_date = datetime.fromisoformat(insight_date["$date"].replace("Z", "+00:00")).date()
            
            insight = InsightDirectResponse(
                date=insight_date or date.today(),
                sub_service_id=data.get("sub_service_id", ""),
                main_service_id=data.get("main_service_id", ""),
                average_processing_time=data.get("average_processing_time", "00:00:00"),
                no_show_count=data.get("no_show_count", 0),
                predicted_number_of_visitors=data.get("predicted_number_of_visitors", 0)
            )
            insights.append(insight)
        
        return InsightDirectListResponse(
            insights=insights,
            total_count=len(insights)
        )
        
    except Exception as e:
        raise Exception(f"Error getting insights by date and sub_service: {str(e)}")

async def get_insights_by_date_and_main_service(main_service_id: str, query_date: date) -> InsightDirectListResponse:
    """
    Get insights data for a specific main_service_id and date
    """
    try:
        # Convert date to datetime for MongoDB query
        start_date = datetime.combine(query_date, datetime.min.time())
        end_date = datetime.combine(query_date, datetime.max.time())
        
        # Query insights collection
        pipeline = [
            {
                "$match": {
                    "main_service_id": main_service_id,
                    "date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
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
            # Convert MongoDB date to Python date
            insight_date = data.get("date")
            if isinstance(insight_date, datetime):
                insight_date = insight_date.date()
            elif isinstance(insight_date, dict) and "$date" in insight_date:
                # Handle MongoDB extended JSON format
                insight_date = datetime.fromisoformat(insight_date["$date"].replace("Z", "+00:00")).date()
            
            insight = InsightDirectResponse(
                date=insight_date or date.today(),
                sub_service_id=data.get("sub_service_id", ""),
                main_service_id=data.get("main_service_id", ""),
                average_processing_time=data.get("average_processing_time", "00:00:00"),
                no_show_count=data.get("no_show_count", 0),
                predicted_number_of_visitors=data.get("predicted_number_of_visitors", 0)
            )
            insights.append(insight)
        
        return InsightDirectListResponse(
            insights=insights,
            total_count=len(insights)
        )
        
    except Exception as e:
        raise Exception(f"Error getting insights by date and main_service: {str(e)}")

async def get_insights_by_sub_service_main_service_date(sub_service_id: str, main_service_id: str, query_date: date) -> InsightDirectListResponse:
    """
    Get insights data for a specific sub_service_id, main_service_id and date
    """
    try:
        # Convert date to datetime for MongoDB query
        start_date = datetime.combine(query_date, datetime.min.time())
        end_date = datetime.combine(query_date, datetime.max.time())
        
        # Query insights collection
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_id,
                    "main_service_id": main_service_id,
                    "date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
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
            # Convert MongoDB date to Python date
            insight_date = data.get("date")
            if isinstance(insight_date, datetime):
                insight_date = insight_date.date()
            elif isinstance(insight_date, dict) and "$date" in insight_date:
                # Handle MongoDB extended JSON format
                insight_date = datetime.fromisoformat(insight_date["$date"].replace("Z", "+00:00")).date()
            
            insight = InsightDirectResponse(
                date=insight_date or date.today(),
                sub_service_id=data.get("sub_service_id", ""),
                main_service_id=data.get("main_service_id", ""),
                average_processing_time=data.get("average_processing_time", "00:00:00"),
                no_show_count=data.get("no_show_count", 0),
                predicted_number_of_visitors=data.get("predicted_number_of_visitors", 0)
            )
            insights.append(insight)
        
        return InsightDirectListResponse(
            insights=insights,
            total_count=len(insights)
        )
        
    except Exception as e:
        raise Exception(f"Error getting insights by sub_service, main_service and date: {str(e)}")

# Legacy functions for backward compatibility
def get_insights_by_date_and_sub_service_sync(sub_service_id: str, query_date: date):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_date_and_sub_service(sub_service_id, query_date))

def get_insights_by_date_and_main_service_sync(main_service_id: str, query_date: date):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_date_and_main_service(main_service_id, query_date))

def get_insights_by_sub_service_main_service_date_sync(sub_service_id: str, main_service_id: str, query_date: date):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_sub_service_main_service_date(sub_service_id, main_service_id, query_date))
