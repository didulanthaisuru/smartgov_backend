from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class SubServiceStep(BaseModel):
    step_id: int
    step_name: str
    status: bool
    completed_by: Optional[str] = None

class AppointmentFull(BaseModel):
    appointment_id: str = Field(alias="_id")  # Explicit appointment ID
    user_id: str
    user_name: str
    sub_service_id: str
    sub_service_steps: List[SubServiceStep]
    created_at: datetime
    is_fully_completed: bool
    appointment_date: Optional[datetime] = None
    appoinment_time: Optional[datetime] = None
    predicted_duration: Optional[datetime] = None
    payment_status: bool
    appointment_confirmed: bool
    completed_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True

class AppointmentsFullResponse(BaseModel):
    appointments: List[AppointmentFull]

class RequiredDocument(BaseModel):
    doc_id: str = Field(alias="_id")
    doc_name: str
    description: Optional[str] = None
    
    class Config:
        populate_by_name = True

class UploadedDocument(BaseModel):
    doc_id: str = Field(alias="_id")
    appointment_id: str
    required_doc_id: str
    user_id: str
    file_name: str
    file_path: str
    accuracy: Optional[float] = None
    doc_status: str
    uploaded_at: datetime
    
    class Config:
        populate_by_name = True

class AppointmentDetailsResponse(BaseModel):
    appointment: AppointmentFull
    required_documents: List[RequiredDocument]
    uploaded_documents: List[UploadedDocument]

class SubServiceStepDefinition(BaseModel):
    step_id: int
    step_name: str

class AppointmentStepStatus(BaseModel):
    step_id: int
    step_name: str
    status: bool
    completed_by: Optional[str] = None

class AppointmentStepDetailsResponse(BaseModel):
    appointment_id: str
    sub_service_id: str
    sub_service_name: str
    payment_amount: float
    sub_service_steps: List[SubServiceStepDefinition]
    appointment_step_status: List[AppointmentStepStatus]
    is_fully_completed: bool

class DocumentApprovalResponse(BaseModel):
    message: str
    document_id: str
