from fastapi import APIRouter, HTTPException, Query
from schemas.insights_derect import (
    InsightDirectQuery, InsightDirectResponse, InsightDirectListResponse
)
from services.insights_derect import (
    get_insights_direct,
    get_insights_by_sub_service,
    get_insights_by_main_service,
    get_insights_by_service
)
from datetime import date
from typing import Optional

router = APIRouter(prefix="/insights-direct", tags=["insights-direct"])

@router.get("/", response_model=InsightDirectListResponse)
async def get_insights_direct_endpoint(
    service_id: Optional[str] = Query(None, description="Service ID to filter by"),
    sub_service_id: Optional[str] = Query(None, description="Sub-service ID to filter by"),
    main_service_id: Optional[str] = Query(None, description="Main service ID to filter by"),
    query_date: Optional[date] = Query(None, description="Date to filter by (YYYY-MM-DD)")
):
    """
    GET endpoint to retrieve insights data based on service_id, sub_service_id, main_service_id, and date
    """
    try:
        query = InsightDirectQuery(
            service_id=service_id,
            sub_service_id=sub_service_id,
            main_service_id=main_service_id,
            date=query_date
        )
        return await get_insights_direct(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/sub-service/{sub_service_id}", response_model=InsightDirectListResponse)
async def get_insights_by_sub_service_endpoint(
    sub_service_id: str,
    query_date: Optional[date] = Query(None, description="Date to filter by (YYYY-MM-DD)")
):
    """
    GET endpoint to retrieve insights data for a specific sub_service_id
    """
    try:
        return await get_insights_by_sub_service(sub_service_id, query_date)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/main-service/{main_service_id}", response_model=InsightDirectListResponse)
async def get_insights_by_main_service_endpoint(
    main_service_id: str,
    query_date: Optional[date] = Query(None, description="Date to filter by (YYYY-MM-DD)")
):
    """
    GET endpoint to retrieve insights data for a specific main_service_id
    """
    try:
        return await get_insights_by_main_service(main_service_id, query_date)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/service/{service_id}", response_model=InsightDirectListResponse)
async def get_insights_by_service_endpoint(
    service_id: str,
    query_date: Optional[date] = Query(None, description="Date to filter by (YYYY-MM-DD)")
):
    """
    GET endpoint to retrieve insights data for a specific service_id
    """
    try:
        return await get_insights_by_service(service_id, query_date)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/sub-service/{sub_service_id}/main-service/{main_service_id}", response_model=InsightDirectListResponse)
async def get_insights_by_sub_and_main_service_endpoint(
    sub_service_id: str,
    main_service_id: str,
    query_date: Optional[date] = Query(None, description="Date to filter by (YYYY-MM-DD)")
):
    """
    GET endpoint to retrieve insights data for a specific sub_service_id and main_service_id combination
    """
    try:
        query = InsightDirectQuery(
            sub_service_id=sub_service_id,
            main_service_id=main_service_id,
            date=query_date
        )
        return await get_insights_direct(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/date/{query_date}", response_model=InsightDirectListResponse)
async def get_insights_by_date_endpoint(
    query_date: date,
    service_id: Optional[str] = Query(None, description="Service ID to filter by"),
    sub_service_id: Optional[str] = Query(None, description="Sub-service ID to filter by"),
    main_service_id: Optional[str] = Query(None, description="Main service ID to filter by")
):
    """
    GET endpoint to retrieve insights data for a specific date with optional service filters
    """
    try:
        query = InsightDirectQuery(
            service_id=service_id,
            sub_service_id=sub_service_id,
            main_service_id=main_service_id,
            date=query_date
        )
        return await get_insights_direct(query)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
