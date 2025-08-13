from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime
from uuid import uuid4
from typing import List
from typing import Dict
from datetime import date, time


 
class user(BaseModel):
    first_name: str
    last_name: str
    nic: str
    phone_number: str
    passcode: str
    user_id: int
    email: str

class services(BaseModel):
    service_name: str
    service_id: int
    main_service: str
    department_id: int
    required_documents: List[str]  # list of document names

class booking(BaseModel):
    booking_id: int
    service_id: int
    document_list: List[str]  
    date: date
    time: time
    booking_state: str
    predicted_duration: time


class Appointment(BaseModel):
    appointment_id: Optional[int] = Field(default=None, description="Unique identifier for the appointment")
    user_id: int = Field(..., description="ID of the user making the appointment")
    sub_service_id: int = Field(..., description="ID of the service being booked")
    created_at: datetime = Field(default_factory=datetime.now, description="Timestamp when the appointment was created")
    doc_states: dict = Field(..., description="Dictionary of document states required for the appointment")
    sub_service_state: str = Field(..., description="State of the service (e.g., 'active', 'inactive')")
    is_fully_complered: Optional[bool] = Field(..., description="Flag indicating if the appointment is fully completed")
    appointment_date: Optional[datetime] = Field(..., description="Date and time of the appointment")
    appoinment_time: Optional[datetime] = Field(..., description="Time of the appointment")
    predicted_duration: Optional[datetime] = Field(..., description="Predicted duration of the appointment")  
