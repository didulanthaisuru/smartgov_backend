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
    nic: str  # Primary identifier - National Identity Card
    phone_number: str
    passcode: str  # This will be hashed
    email: str
    is_active: Optional[bool] = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class UserInDB(BaseModel):
    first_name: str
    last_name: str
    nic: str  # Primary identifier - National Identity Card
    phone_number: str
    hashed_password: str  # Stored hashed password
    email: str
    is_active: bool = True
    created_at: datetime
    updated_at: datetime



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
    email: str
    passcode: str  # This will be hashed
    is_active: Optional[bool] = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class AdminInDB(BaseModel):
    admin_id: int
    admin_name: str
    service_id: str
    email: str
    hashed_password: str  # Stored hashed password
    is_active: bool = True
    created_at: datetime
    updated_at: datetime
