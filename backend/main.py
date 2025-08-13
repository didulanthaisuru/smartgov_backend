from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.notification_service import manager
from routes import appointments, apointmentdetails, notifications
from services import apointmentdetails_services

app = FastAPI(title="SmartGov API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Wrap approve/decline to send WebSocket notifications
original_approve = apointmentdetails_services.approve_appointment
original_decline = apointmentdetails_services.decline_appointment

async def approve_with_notification(appointment_id: int):
    result = await original_approve(appointment_id)
    await manager.broadcast({
        "type": "appointment_status",
        "appointment_id": appointment_id,
        "status": "approved"
    })
    return result

async def decline_with_notification(appointment_id: int):
    result = await original_decline(appointment_id)
    await manager.broadcast({
        "type": "appointment_status",
        "appointment_id": appointment_id,
        "status": "declined"
    })
    return result

apointmentdetails_services.approve_appointment = approve_with_notification
apointmentdetails_services.decline_appointment = decline_with_notification

app.include_router(appointments.router)
app.include_router(apointmentdetails.router)
app.include_router(notifications.router)

@app.get("/")
def root():
    return {"message": "SmartGov API is running"}
