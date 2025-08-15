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

class EmptyAppointmentCreate(BaseModel):
    user_id: str = Field(..., description="ID of the user making the appointment")
    sub_service_id: str = Field(..., description="ID of the sub-service being booked")

class EmptyAppointmentResponse(BaseModel):
    appointment_id: str = Field(..., description="The ObjectId of the created appointment")
    message: str = Field(..., description="Success message")

class AppointmentUpdate(BaseModel):
    appointment_date: Optional[datetime] = Field(None, description="Date and time of the appointment")
    appoinment_time: Optional[datetime] = Field(None, description="Time of the appointment")
    predicted_duration: Optional[datetime] = Field(None, description="Predicted duration of the appointment")
    payment_status: Optional[bool] = Field(default=False, description="Payment status of the appointment")
    is_fully_completed: Optional[bool] = Field(default=False, description="Flag indicating if the appointment is fully completed")

class AppointmentUpdateResponse(BaseModel):
    appointment_id: str = Field(..., description="The ObjectId of the updated appointment")
    message: str = Field(..., description="Success message")

class AppointmentStep(BaseModel):
    step_id: int = Field(..., description="Step identifier")
    step_name: str = Field(..., description="Name of the step")
    status: bool = Field(..., description="Whether the step is completed")
    completed_by: Optional[str] = Field(None, description="ID of the user who completed the step")

class AppointmentResponse(BaseModel):
    id: str = Field(..., alias="_id", description="Appointment ObjectId")
    user_id: str = Field(..., description="ID of the user")
    sub_service_id: str = Field(..., description="ID of the sub-service")
    sub_service_steps: List[AppointmentStep] = Field(..., description="List of steps with their status")
    created_at: datetime = Field(..., description="Creation timestamp")
    is_fully_completed: bool = Field(..., description="Whether the appointment is fully completed")
    appointment_date: Optional[datetime] = Field(None, description="Appointment date")
    appoinment_time: Optional[datetime] = Field(None, description="Appointment time")
    predicted_duration: Optional[datetime] = Field(None, description="Predicted duration")
    payment_status: bool = Field(..., description="Payment status")

    class Config:
        populate_by_name = True
        validate_by_name = True

class AppointmentCreateResponse(BaseModel):
    message: str = Field(..., description="Success message")
    appointment_id: str = Field(..., description="The ObjectId of the created appointment")
    steps_copied: int = Field(..., description="Number of steps copied from sub-service")

class AppointmentConfirmUpdate(BaseModel):
    appointment_confirmed: bool = Field(..., description="Whether the appointment is confirmed")

class AppointmentConfirmResponse(BaseModel):
    appointment_id: str = Field(..., description="The ObjectId of the confirmed appointment")
    message: str = Field(..., description="Success message")
    appointment_confirmed: bool = Field(..., description="Updated confirmation status")
    sub_service_name: str | None = Field(None, description="Name of the sub-service")
    appointment_date: datetime | None = Field(None, description="Date and time of the appointment")
    predicted_duration: datetime | None = Field(None, description="Predicted duration of the appointment")