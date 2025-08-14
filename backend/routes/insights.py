from fastapi import APIRouter, HTTPException
from schemas.insights import (
    InsightQuery, InsightDetail, MainServiceQuery, 
    SubServiceInsightResponse, MainServiceInsightResponse
)
from services.insights import (
    get_insights_by_date_sub_service, 
    get_insights_by_date_main_service
)
from datetime import date

router = APIRouter(	prefix="/insights", tags=["insights"])

@router.post("/view-service_insights", response_model=list[InsightDetail])
def view_insights(query: InsightQuery):
    return get_insights_by_date_sub_service(query)

@router.post("/view-mainservice-insights", response_model=list[InsightDetail])
def view_mainservice_insights(query: MainServiceQuery):
    return get_insights_by_date_main_service(query)

@router.get("/appointments/count/sub-service/{sub_service_id}/date/{appointment_date}", response_model=SubServiceInsightResponse)
async def get_appointment_count_by_sub_service(sub_service_id: str, appointment_date: date):
    """
    GET endpoint to get appointment count and IDs for a specific sub_service and date
    """
    try:
        query = InsightQuery(sub_service_id=sub_service_id, date=appointment_date)
        return await get_insights_by_date_sub_service(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/appointments/count/sub-service/{sub_service_id}/main-service/{main_service_id}/date/{appointment_date}", response_model=MainServiceInsightResponse)
async def get_appointment_count_by_main_service(sub_service_id: str, main_service_id: str, appointment_date: date):
    """
    GET endpoint to get appointment count and IDs for a specific sub_service, main_service and date
    """
    try:
        query = MainServiceQuery(
            sub_service_id=sub_service_id, 
            main_service_id=main_service_id, 
            date=appointment_date
        )
        return await get_insights_by_date_main_service(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")






