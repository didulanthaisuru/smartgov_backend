from fastapi import FastAPI
from .routes import appointments, apointmentdetails

app = FastAPI(title="SmartGov API")

app.include_router(appointments.router)
app.include_router(apointmentdetails.router)

@app.get("/")
def root():
    return {"message": "SmartGov API is running"}
