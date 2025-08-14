from fastapi import APIRouter
from schemas.appoinment import (
    AppointmentAdd, EmptyAppointmentCreate, EmptyAppointmentResponse, 
    AppointmentUpdate, AppointmentUpdateResponse, AppointmentResponse, AppointmentCreateResponse, AppointmentConfirmUpdate, AppointmentConfirmResponse
)
from services.appoinment import (
    create_appointment_service, create_empty_appointment_service, 
    update_appointment_service, get_appointment_service, 
    get_appointments_by_user_service, confirm_appointment_service
)
from typing import List

router = APIRouter(prefix="/appointment_creation", tags=["AppointmentCreation"])

@router.post("/", response_model=AppointmentCreateResponse)
async def create_appointment(data: AppointmentAdd):
    """Create a complete appointment with all details"""
    return await create_appointment_service(data)

@router.post("/empty", response_model=EmptyAppointmentResponse)
async def create_empty_appointment(data: EmptyAppointmentCreate):
    """Create an empty appointment with minimal data and return the ObjectId"""
    return await create_empty_appointment_service(data)

@router.get("/user/{user_id}", response_model=List[AppointmentResponse])
async def get_user_appointments(user_id: str):
    """Get all appointments for a specific user"""
    return await get_appointments_by_user_service(user_id)

@router.get("/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(appointment_id: str):
    """Get appointment details by ID"""
    return await get_appointment_service(appointment_id)

@router.patch("/{appointment_id}", response_model=AppointmentUpdateResponse)
async def update_appointment(appointment_id: str, data: AppointmentUpdate):
    """Update an existing appointment with partial data"""
    return await update_appointment_service(appointment_id, data)

@router.put("/{appointment_id}/confirm", response_model=AppointmentConfirmResponse)
async def confirm_appointment(appointment_id: str):
    """Confirm an appointment by setting appointment_confirmed to True"""
    return await confirm_appointment_service(appointment_id)
