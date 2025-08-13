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


class required_documents(BaseModel):
    doc_id: str = Field(...)
    doc_name: str = Field(...)
    description: Optional[str] = None

# Model for an individual sub-service
class sub_service(BaseModel):
    service_sub_id: str = Field(...)
    service_id: str
    service_name: str = Field(...)
    required_docs: List[str] = []
    payment_amount: float = Field(default=0.0) 

# Model for the main service document that will be stored in the database
class main_service(BaseModel):
    service_main_id:  str = Field(...) # The unique ID for the main-service
    service_name: str = Field(...)
    department_id: str = Field(...)
    icon_name: Optional[str] = None # For the UI icon
    sub_services: List[str] = []

class admin(BaseModel):
    admin_id: int
    admin_name: str
    service_id: str


# Placeholder for SubServiceStepState
class SubServiceStepState(BaseModel):
    step_name: str
    completed: bool = False

class Appointment(BaseModel):
    # This model is for the AppointmentNew collection.
    # It is now much simpler and only tracks the overall process.
    appointment_id: str
    user_id: str = Field(...)
    sub_service_id: str # Links to the sub_service
    created_at: datetime = Field(default_factory=datetime.utcnow)
    sub_service_states: List[SubServiceStepState] = []
    is_fully_completed: bool = Field(default=False)
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    predicted_duration: Optional[int] = None

class DailyMetrics(BaseModel):
    matrics_id: str = Field(..., alias="matrics_id")
    date: date
    day_of_week: str
    service_id: int
    main_service_id: int
    average_processing_time: time
    no_show_count: int


