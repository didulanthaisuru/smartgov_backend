from fastapi import APIRouter
from database_config import db
from services.insights import get_daily_subservice_wise_matrix
from services.insights import get_appointment_count
from schemas.insights import DailySubserviceMatrixRequest, DailySubserviceMatrixResponse
from motor.motor_asyncio import AsyncIOMotorDatabase


router = APIRouter()

@router.post("/daily_subservice_matrix", response_model=list[DailySubserviceMatrixResponse])
async def daily_subservice_matrix(request: DailySubserviceMatrixRequest):
	return await get_daily_subservice_wise_matrix(db, request)

@router.post("/appointment_count")
async def appointment_count(request: DailySubserviceMatrixRequest):
	return await get_appointment_count(request)