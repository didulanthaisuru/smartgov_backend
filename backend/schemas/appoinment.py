from pydantic import BaseModel, Field
from typing import Optional,List
from datetime import datetime

class AppointmentAdd(BaseModel):
    appointment_id: Optional[str] = Field(default=None, description="Unique identifier for the appointment")
    user_id: str = Field(..., description="ID of the user making the appointment")
    sub_service_id: str = Field(..., description="ID of the service being booked")  # <-- Change to str
    created_at: Optional[datetime] = Field(default_factory=datetime.now, description="Timestamp when the appointment was created")
    is_fully_completed: Optional[bool] = Field(..., description="Flag indicating if the appointment is fully completed")
    appointment_date: Optional[datetime] = Field(..., description="Date and time of the appointment")
    appoinment_time: Optional[datetime] = Field(..., description="Time of the appointment")
    predicted_duration: Optional[datetime] = Field(..., description="Predicted duration of the appointment")
    payment_status: Optional[bool] = Field(default=False, description="Payment status of the appointment")


