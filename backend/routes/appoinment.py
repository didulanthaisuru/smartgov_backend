from fastapi import APIRouter
from schemas.appoinment import AppointmentAdd
from services.appoinment import create_appointment_service

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post("/")
async def create_appointment(data: AppointmentAdd):
    return await create_appointment_service(data)
