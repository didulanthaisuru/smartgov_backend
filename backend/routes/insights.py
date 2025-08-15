from fastapi import APIRouter, HTTPException
from schemas.insights import (
    InsightQuery, InsightDetail, MainServiceQuery, WeeklyInsightQuery, WeeklyMainServiceQuery,
    WeeklyCountQuery, WeeklyMainServiceCountQuery, WeeklyCountResponse
)
from services.insights import (
    get_insights_by_date_sub_service, 
    get_insights_by_date_main_service,
    get_weekly_insights_by_sub_service,
    get_weekly_insights_by_main_service,
    get_weekly_appointment_counts,
    get_weekly_appointment_counts_main_service
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

@router.post("/weekly-appointment-counts", response_model=WeeklyCountResponse)
async def get_weekly_counts(query: WeeklyCountQuery):
    """
    POST endpoint to retrieve appointment counts for each day of the week for a specific sub_service
    """
    try:
        return await get_weekly_appointment_counts(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/weekly-appointment-counts-mainservice", response_model=WeeklyCountResponse)
async def get_weekly_counts_mainservice(query: WeeklyMainServiceCountQuery):
    """
    POST endpoint to retrieve appointment counts for each day of the week for a specific sub_service and main_service
    """
    try:
        return await get_weekly_appointment_counts_main_service(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")








