from pydantic import BaseModel
from typing import List

class TotalAppointmentsResponse(BaseModel):
    totalAppointments: int    

class AppointmentItem(BaseModel):
    bookingId: str
    userName: str
    time: str
    status: str
    predictedDuration: int

class AppointmentsListResponse(BaseModel):
    appointments: List[AppointmentItem]
    total: int