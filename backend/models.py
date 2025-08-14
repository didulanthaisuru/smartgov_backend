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


class UploadedDocument(BaseModel):
    booking_id: int
    doc_id: int
    required_doc_id: Optional[int] = None
    file_name: str
    file_path: str
    accuracy: Optional[float] = None
    doc_status: str = "pending"
    uploaded_at: datetime = Field(default_factory=datetime.now)
   
class Appointment(BaseModel):
    appointment_id: Optional[int] = Field(default=None, description="Unique identifier for the appointment")
    user_id: int = Field(..., description="ID of the user making the appointment")
    sub_service_id: str = Field(..., description="ID of the service being booked")
    created_at: datetime = Field(default_factory=datetime.now, description="Timestamp when the appointment was created")
    sub_service_steps: List[dict] = Field(..., description="State of the service (e.g., 'active', 'inactive')")
    is_fully_complered: Optional[bool] = Field(..., description="Flag indicating if the appointment is fully completed")
    appointment_date: Optional[datetime] = Field(..., description="Date and time of the appointment")
    appoinment_time: Optional[datetime] = Field(..., description="Time of the appointment")
    predicted_duration: Optional[datetime] = Field(..., description="Predicted duration of the appointment")


class SubServiceSchema(BaseModel):
    service_name: str
    payment_amount: float
    required_docs: List[str] = Field(default_factory=list)
    steps: List[dict] = Field(default_factory=list)

class required_documents(BaseModel):
    doc_id: str = Field(...)
    doc_name: str = Field(...)
    description: Optional[str] = None

class admin(BaseModel):
    admin_id: int
    admin_name: str
    service_id: str

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