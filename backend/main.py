from fastapi import FastAPI
from routes import appointments, apointmentdetails,chat_routes
from routes.admin import admin_view_completed
from fastapi.middleware.cors import CORSMiddleware
from routes.qr_scanner import router as qr_scanner_router
from routes.admin import dashboard_routes,appointment_routes



app = FastAPI(
    title="SmartGov",
    description="Smart Government app for managing citizen services and government operations.",
    version="1.0.0",    
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include API routes
app.include_router(qr_scanner_router)
app.include_router(dashboard_routes.router)
app.include_router(appointment_routes.router)
app.include_router(chat_routes.router)
app.include_router(appointments.router)
app.include_router(apointmentdetails.router)
app.include_router(admin_view_completed.router) 


@app.get("/")
def root():
    return {"message": "SmartGov API is running"}




