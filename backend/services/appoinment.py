from typing import Dict
from schemas.appoinment import AppointmentAdd
from database_config import db, DB_NAME

async def create_appointment(appointment: AppointmentAdd) -> Dict:
    """
    Insert a new appointment into the AppointmentNew MongoDB collection.
    """
    if db.client is None:
        raise Exception("MongoDB client is not initialized. Please check your connection setup.")

    appointments_collection = db.client[DB_NAME]["AppointmentNew"]

    appointment_dict = appointment.dict()
    result = await appointments_collection.insert_one(appointment_dict)

    return {
        "id": str(result.inserted_id),
        "message": "Appointment created successfully"
    }
