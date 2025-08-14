from fastapi import APIRouter, HTTPException
from schemas.insights_derect import InsightDirectListResponse
from services.insights_derect import (
    get_insights_by_date_and_sub_service,
    get_insights_by_date_and_main_service,
    get_insights_by_sub_service_main_service_date
)
from datetime import date

router = APIRouter(prefix="/insights-direct", tags=["insights-direct"])

@router.get("/sub-service/{sub_service_id}/date/{query_date}", response_model=InsightDirectListResponse)
async def get_insights_by_date_and_sub_service_endpoint(
    sub_service_id: str,
    query_date: date
):
    """
    GET endpoint to retrieve insights data for a specific sub_service_id and date
    """
    try:
        return await get_insights_by_date_and_sub_service(sub_service_id, query_date)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/main-service/{main_service_id}/date/{query_date}", response_model=InsightDirectListResponse)
async def get_insights_by_date_and_main_service_endpoint(
    main_service_id: str,
    query_date: date
):
    """
    GET endpoint to retrieve insights data for a specific main_service_id and date
    """
    try:
        return await get_insights_by_date_and_main_service(main_service_id, query_date)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/sub-service/{sub_service_id}/main-service/{main_service_id}/date/{query_date}", response_model=InsightDirectListResponse)
async def get_insights_by_sub_service_main_service_date_endpoint(
    sub_service_id: str,
    main_service_id: str,
    query_date: date
):
    """
    GET endpoint to retrieve insights data for a specific sub_service_id, main_service_id and date
    """
    try:
        return await get_insights_by_sub_service_main_service_date(sub_service_id, main_service_id, query_date)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
