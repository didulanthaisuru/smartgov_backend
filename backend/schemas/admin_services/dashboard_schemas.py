from pydantic import BaseModel

class TotalAppointmentsResponse(BaseModel):
    totalAppointments: int