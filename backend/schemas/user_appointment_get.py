from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date, time

class user_request(BaseModel):
    user_id: str

class document_checklist_response(BaseModel):
    required_doc_id: int
    doc_name: str
    description: Optional[str] = None
    is_uploaded: bool
    accuracy: Optional[float] = None
    doc_status: Optional[str] = None
    file_path: Optional[str] = None

class sub_service_step_state_response(BaseModel):
    step_id: int
    step_name: str
    is_completed: bool
    completion_date: Optional[datetime] = None

class appointment_detail_response(BaseModel):
    appointment_id: str
    user_id: str
    service_name: str
    document_checklist: List[document_checklist_response]
    sub_service_states: List[sub_service_step_state_response]
    is_fully_completed: bool
    appointment_date: Optional[date] = None

class appointment_summary_response(BaseModel):
    appointment_id: str
    service_name: str
    appointment_date: Optional[date] = None
    is_fully_completed: bool
