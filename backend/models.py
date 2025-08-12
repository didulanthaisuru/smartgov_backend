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

class booking(BaseModel):
    booking_id: int
    service_id: int
    doc_states: Dict[str, str]  # or Dict[str, bool] depending on your data
    date_booking: date
    time_booking: time
    booking_state: str
    predicted_duration: time

class required_documents_model(BaseModel):
    doc_id: int = Field(...)  
    doc_name: str = Field(...) 
    description: Optional[str] = None # e.g., "Must be issued by the hospital within 3 months"

# Model for an individual sub-service
class sub_service_model(BaseModel):
    service_sub_id: int = Field(...) # The unique ID for the sub-service
    service_name: str = Field(...)
    required_documents: List[required_documents_model] = []
    payment_amount: float = Field(default=0.0) 

# Model for the main service document that will be stored in the database
class main_service_model(BaseModel):
    service_main_id:  int = Field(...) # The unique ID for the main-service
    service_name: str = Field(...) # e.g., "Business registration"
    department_id: int = Field(...)
    icon_name: Optional[str] = None # For the UI icon
    sub_services: List[sub_service_model] = []


