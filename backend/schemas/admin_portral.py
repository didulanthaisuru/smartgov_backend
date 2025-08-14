from pydantic import BaseModel
from datetime import date, time
from typing import List, Optional


# ===== APPOINTMENT LIST ENDPOINTS =====

class appointment_detail_card_request(BaseModel):
    date: date
    service_id: str  # ObjectId string for sub-service


class appointment_detail_card(BaseModel):
    appointment_id: str
    duration: time
    appoinment_user_name: str
    appoitment_status: str   # pending/in_progress/completed
    predicted_duration: time


# ===== DETAILED APPOINTMENT ENDPOINTS =====

class view_detailed_appointment_request(BaseModel):
    appointment_id: str


class RequiredDocument(BaseModel):
    doc_id: str                    # MongoDB ObjectId as string
    doc_name: str                  # Document name from required_documents
    description: Optional[str]     # Document description
    is_uploaded: bool              # Whether document is uploaded
    upload_status: str             # "Uploaded" or "Not Uploaded"
    uploaded_doc_id: Optional[str] = None  # ObjectId of uploaded document
    admin_status: Optional[str] = None     # "Pending", "Approved", "Rejected"
    accuracy: Optional[float] = None       # AI accuracy percentage


class view_detailed_appointment_response(BaseModel):
    appointment_id: str
    appointment_user_nic: str
    appointment_user_mobile_number: str
    duration: time
    appointment_time: time
    appointment_date: date
    payment_status: bool
    required_documents: List[RequiredDocument]
    sub_service_name: Optional[str] = None  # Name of the sub-service
    appointment_status: str                 # Overall appointment status


# ===== APPOINTMENT APPROVAL ENDPOINTS =====

class appointment_approval_request(BaseModel):
    appointment_id: str

class appointment_approval_response(BaseModel):
    message: str
    appointment_id: str
    status: str  # "approved"

class appointment_decline_request(BaseModel):
    appointment_id: str
    reason: str
    
class appointment_decline_response(BaseModel):
    message: str
    appointment_id: str
    status: str  # "declined"
    reason: str


# ===== SUB-SERVICE DETAILS ENDPOINTS =====

class SubServiceStep(BaseModel):
    step_id: int
    step_name: str


class SubServiceDocument(BaseModel):
    doc_id: str                   # MongoDB ObjectId as string
    doc_name: str                 # Document name from required_documents
    description: Optional[str]    # Document description


class get_subservice_details_request(BaseModel):
    subservice_id: str            # ObjectId string for sub-service


class get_subservice_details_response(BaseModel):
    subservice_id: str            # ObjectId string
    service_name: str             # Name of the sub-service
    payment_amount: float         # Payment amount for the service
    required_documents: List[SubServiceDocument]  # List of required documents
    steps: List[SubServiceStep]   # List of service steps


# ===== PDF STATES ENDPOINTS =====

class DocumentItem(BaseModel):
    document_id: str              # MongoDB ObjectId as string
    required_doc_id: Optional[int] = None  # Required document ID (integer)
    name: str                     # From required_documents
    description: Optional[str]    # From required_documents
    view_link: Optional[str]      # Uploaded document link
    accuracy: Optional[float]     # Accuracy %, None if not uploaded
    status: Optional[str]         # e.g., "Uploaded", "Pending"


class get_selected_appoinment_details_with_pdf_states_request(BaseModel):
    appointment_id: str

class get_selected_appoinment_details_with_pdf_states_response(BaseModel):
    appointment_id: str
    appointment_user_nic: str
    appointment_user_mobile_number: str
    duration: time
    appointment_time: time
    appointment_date: date
    payment_status: bool
    documents: List[DocumentItem]







