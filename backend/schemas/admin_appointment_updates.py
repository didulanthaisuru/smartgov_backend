from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date, time

# ... existing code ...

# New schemas for admin updates
class step_update_request(BaseModel):
    step_id: int
    status: bool

class appointment_steps_update_request(BaseModel):
    appointment_id: str
    steps: List[step_update_request]

class appointment_completion_update_request(BaseModel):
    appointment_id: str
    is_fully_completed: bool