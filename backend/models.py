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

class required_documents(BaseModel):
    doc_id: str = Field(...)
    doc_name: str = Field(...)
    description: Optional[str] = None

# Model for an individual sub-service
class sub_service(BaseModel):
    service_sub_id: str = Field(...) # The unique ID for the sub-service
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


