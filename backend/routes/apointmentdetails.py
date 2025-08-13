from fastapi import APIRouter
from services.apointmentdetails_services import (
    get_appointment_by_id,
    get_document_metadata,
    approve_appointment,
    decline_appointment
)

router = APIRouter( tags=["appointments details"])

@router.get("/appointmentdetails/{appointment_id}")
async def get_appointment_detail(appointment_id: int):
    return await get_appointment_by_id(appointment_id)

@router.get("/api/admin/appointments/{appointment_id}/documents/{doc_id}")
async def get_document(appointment_id: int, doc_id: str):
    return await get_document_metadata(appointment_id, doc_id)

@router.patch("/api/admin/appointments/{appointment_id}/approve")
async def approve(appointment_id: int):
    return await approve_appointment(appointment_id)

@router.patch("/api/admin/appointments/{appointment_id}/decline")
async def decline(appointment_id: int):
    return await decline_appointment(appointment_id)
