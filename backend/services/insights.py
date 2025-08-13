from motor.motor_asyncio import AsyncIOMotorDatabase
from models import DailyMetrics
from datetime import date

async def get_daily_subservice_wise_matrix(db: AsyncIOMotorDatabase, request):
    query = {}
    if request.date:
        query["date"] = request.date
    else:
        query["date"] = date.today()
    if request.service_id:
        query["service_id"] = request.service_id
    if request.main_service_id:
        query["main_service_id"] = request.main_service_id
    metrics_cursor = db["DailyMetrics"].find(query)
    metrics = []
    async for doc in metrics_cursor:
        metrics.append(DailyMetrics(**doc))
    return metrics


from schemas.insights import DailySubserviceMatrixRequest
from database_config import db

async def get_appointment_count(request: DailySubserviceMatrixRequest):
    query = {}
    if request.date:
        query["date"] = request.date
    if request.service_id:
        query["service_id"] = request.service_id
    if request.main_service_id:
        query["main_service_id"] = request.main_service_id
    metrics_cursor = db["DailyMetrics"].find(query)
    count = 0
    async for doc in metrics_cursor:
        count += doc.get("total_appointments", 0)
    return {"appointment_count": count}