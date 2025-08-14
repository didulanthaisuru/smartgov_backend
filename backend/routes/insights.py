from fastapi import APIRouter
from schemas.insights import InsightQuery, InsightDetail
from services.insights import get_insights_by_date_sub_service, get_insights_by_date_main_service
# New route: filter by date and main_service_id only
from services.insights import get_insights_by_date_main_service
from datetime import date






