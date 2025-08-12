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
    required_documents: List[str]  

class booking(BaseModel):
    booking_id: int
    service_id: int
    doc_states: Dict[str, str]  
    date_booking: date
    time_booking: time
    booking_state: str
    predicted_duration: time

class admin(BaseModel):
    admin_id: int
    admin_name: str
    service_id: str

class appointment(BaseModel):
    appointment_id: str = Field(..., alias="_id") 
    user_id: int
    user_name: str 
    admin_id: int
    completion_date: str 
    time: str 
    duration_in_minutes: int 
    status: str 
    rating: Optional[int] = None 
    message: Optional[str] = None