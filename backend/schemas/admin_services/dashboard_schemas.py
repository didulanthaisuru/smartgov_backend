from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class TotalAppointmentsResponse(BaseModel):
    totalAppointments: int    

class AppointmentItem(BaseModel):
    bookingId: str
    userName: str
    time: str
    status: str
    predictedDuration: int

class AppointmentsListResponse(BaseModel):
    appointments: List[AppointmentItem]
    total: int

class AdminServiceInfoResponse(BaseModel):
    service_id: str
    admin_name: str

class AppointmentIdsResponse(BaseModel):
    appointment_ids: List[str]

class AppointmentDocument(BaseModel):
    _id: str
    user_id: str
    sub_service_id: str
    sub_service_steps: List[Dict[str, Any]]
    created_at: datetime
    is_fully_completed: bool
    appointment_date: Optional[datetime] = None
    appoinment_time: Optional[datetime] = None
    predicted_duration: Optional[datetime] = None
    payment_status: bool
    appointment_confirmed: bool
    completed_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class AppointmentsResponse(BaseModel):
    appointments: List[AppointmentDocument]

class RequiredDocument(BaseModel):
    _id: str
    doc_name: str
    description: Optional[str] = None

class RequiredDocumentsResponse(BaseModel):
    documents: List[RequiredDocument]

class UploadedDocument(BaseModel):
    _id: str
    booking_id: str
    doc_id: str
    required_doc_id: str
    file_name: str
    original_filename: str
    stored_filename: str
    file_path: str
    file_size: int
    content_type: str
    accuracy: Optional[float] = None
    doc_status: str
    uploaded_at: datetime

class UploadedDocumentResponse(BaseModel):
    uploaded_document: Optional[UploadedDocument] = None

class DocumentApprovalResponse(BaseModel):
    message: str
    document_id: str