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
    doc_states: Dict[str, str]  # or Dict[str, bool] depending on your data
    date_booking: date
    time_booking: time
    booking_state: str
    predicted_duration: time

class admin(BaseModel):
    admin_id: int
    admin_name: str
    service_id: str

class DailyMetrics(BaseModel):
    date: date
    day_of_week: str
    service_id: int
    main_service_id: int
    total_appointments: int
    appointment_ids: Dict[str, Dict[str, str]]  # appointment_id -> {time_slot: "...", predicted_appointment_time: "..."}
    no_appointment_user_count: int
    average_processing_time: time
    no_show_count: int

