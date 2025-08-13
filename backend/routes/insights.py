from fastapi import APIRouter
from schemas.insights import InsightQuery, InsightDetail
from services.insights import get_insights_by_date_sub_service, get_insights_by_date_main_service

router = APIRouter()

@router.post("/view-service_insights", response_model=list[InsightDetail])
def view_insights(query: InsightQuery):
	return get_insights_by_date_sub_service(query)




# New route: filter by date and main_service_id only
from services.insights import get_insights_by_date_main_service
from datetime import date

from schemas.insights import MainServiceQuery

@router.post("/view-mainservice-insights", response_model=list[InsightDetail])
def view_mainservice_insights(query: MainServiceQuery):
	return get_insights_by_date_main_service(query)