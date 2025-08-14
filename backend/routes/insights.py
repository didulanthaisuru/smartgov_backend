from fastapi import APIRouter, HTTPException
from schemas.insights import (
    InsightQuery, InsightDetail, MainServiceQuery, WeeklyInsightQuery, WeeklyMainServiceQuery
)
from services.insights import (
    get_insights_by_date_sub_service, 
    get_insights_by_date_main_service,
    get_weekly_insights_by_sub_service,
    get_weekly_insights_by_main_service
)
from datetime import date

router = APIRouter(prefix="/insights", tags=["insights"])

@router.post("/view-service_insights", response_model=list[InsightDetail])
async def view_insights(query: InsightQuery):
    """
    POST endpoint to retrieve full appointment details for a specific sub_service and date
    """
    try:
        return await get_insights_by_date_sub_service(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/view-mainservice-insights", response_model=list[InsightDetail])
async def view_mainservice_insights(query: MainServiceQuery):
    """
    POST endpoint to retrieve full appointment details for a specific sub_service, main_service and date
    """
    try:
        return await get_insights_by_date_main_service(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/view-weekly-service_insights", response_model=list[InsightDetail])
async def view_weekly_service_insights(query: WeeklyInsightQuery):
    """
    POST endpoint to retrieve full appointment details for a specific sub_service and week (based on the given date)
    """
    try:
        return await get_weekly_insights_by_sub_service(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/view-weekly-mainservice-insights", response_model=list[InsightDetail])
async def view_weekly_mainservice_insights(query: WeeklyMainServiceQuery):
    """
    POST endpoint to retrieve full appointment details for a specific sub_service, main_service and week (based on the given date)
    """
    try:
        return await get_weekly_insights_by_main_service(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")








