from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime
from uuid import uuid4
from typing import List

 
class user(BaseModel):
    first_name: str
    last_name: str
    nic: str
    phone_number: str
    passcode: str
    user_id: int
    email: str

class Services(BaseModel):
    service_name: str
    service_id: int
    main_service: str
    department_id: int
    required_documents: List[str]  # list of document names