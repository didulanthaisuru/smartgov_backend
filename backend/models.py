from bson import ObjectId
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


class required_documents(BaseModel):
    doc_id: str = Field(...)
    doc_name: str = Field(...)
    description: Optional[str] = None

class sub_service_step(BaseModel):
    step_id: str = Field(...) #Unique ID for step in a service
    step_name: str = Field(...)
    step_description: Optional[str] = None

# Model for an individual sub-service
class sub_service(BaseModel):
    service_sub_id: str = Field(...) # The unique ID for the sub-service
    service_name: str = Field(...)
    required_docs: List[required_documents] = []
    payment_amount: float = Field(default=0.0) 
    steps: List[sub_service_step] = []

# Model for the main service
class main_service(BaseModel):
    service_main_id:  str = Field(...) # The unique ID for the main-service
    service_name: str = Field(...)
    department_id: str = Field(...)
    icon_name: Optional[str] = None # For the UI icon
    sub_services: List[str] = []

class uploaded_documents(BaseModel):
    uploaded_document_id: str = Field(...)
    appointment_id: str = Field(...)
    required_doc_id: int = Field(...) # Links to the doc_id in the sub-service
    user_id: str = Field(...)
    file_name: str = Field(...)
    file_path: str = Field(...)
    accuracy: Optional[float] = None
    doc_status: str = Field(default="Pending") # "Pending", "Approved", "Declined"
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

class sub_service_step_state(BaseModel):
    step_name: str = Field(...)
    is_completed: bool = Field(default=False)
    completion_date: Optional[datetime] = None

class AppointmentNew1(BaseModel):
    appointment_id: str = Field(...)
    user_id: str = Field(...)
    sub_service_id: str = Field(...) # Links to the sub_service
    created_at: datetime = Field(default_factory=datetime.utcnow)
    sub_service_states: List[sub_service_step_state] = [] 
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    predicted_duration: Optional[int] = None
    is_fully_completed: bool = Field(default=False)

