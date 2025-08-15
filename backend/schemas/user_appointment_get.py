from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date, time

class user_request(BaseModel):
    user_id: str

class appointment_summary_response(BaseModel):
    appointment_id: str
    service_name: str
    appointment_date: Optional[datetime] = None
    is_fully_completed: bool

# New schemas for individual appointment details
class uploaded_document_response(BaseModel):
    uploaded_document_id: str
    appointment_id: str
    required_doc_id: Optional[str] = None  # Can be null/None
    user_id: Optional[str] = None  # Can be null/None
    file_name: Optional[str] = None
    file_path: Optional[str] = None
    accuracy: Optional[float] = None
    doc_status: str
    uploaded_at: Optional[datetime] = None

class required_document_response(BaseModel):
    required_doc_id: str
    doc_name: str
    description: Optional[str] = None

class sub_service_step_response(BaseModel):
    step_id: int
    step_name: str
    status: bool
    completed_by: Optional[str] = None
    is_currently_happening: bool = False

class appointment_detail_response(BaseModel):
    appointment_id: str
    user_id: str
    service_name: str
    payment_amount: float
    required_documents: List[required_document_response]
    uploaded_documents: List[uploaded_document_response]
    is_fully_completed: bool
    appointment_date: Optional[datetime] = None
    sub_service_steps: Optional[List[sub_service_step_response]] = None