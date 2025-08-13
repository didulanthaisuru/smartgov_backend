from fastapi import APIRouter, HTTPException
from services.appoinment import create_appointment
from schemas.appoinment import AppointmentAdd

router = APIRouter()

@router.post("/appointments")
async def add_appointment(appointment: AppointmentAdd):
    try:
        return await create_appointment(appointment)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
