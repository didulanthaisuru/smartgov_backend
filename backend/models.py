from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime
from uuid import uuid4
from typing import List
from typing import Dict
from datetime import date, time
from enum import Enum





 
class user(BaseModel):
    first_name: str
    last_name: str
    nic: str
    phone_number: str
    passcode: str
    user_id: int  # This field should match the appointment.user_id
    email: str

class UserInDB(BaseModel):
    """User model for database operations with authentication fields"""
    nic: str
    first_name: str
    last_name: str
    phone_number: str
    email: str
    hashed_password: str
    is_active: bool = True
    created_at: datetime
    updated_at: datetime
    user_id: Optional[int] = None  # Optional for backward compatibility
class services(BaseModel):
    service_name: str
    service_id: int
    main_service: str
    department_id: int
    required_documents: List[str]  # list of document names

class booking(BaseModel):
    booking_id: int
    service_id: int
    document_list: List[str]  
    date: date
    time: time
    booking_state: str
    predicted_duration: time


class UploadedDocument(BaseModel):
    booking_id: int
    doc_id: int
    required_doc_id: Optional[int] = None
    file_name: str
    file_path: str
    accuracy: Optional[float] = None
    doc_status: str = "pending"
    uploaded_at: datetime = Field(default_factory=datetime.now)
   
class Appointment(BaseModel):
    appointment_id: Optional[int] = Field(default=None, description="Unique identifier for the appointment")
    user_id: int = Field(..., description="ID of the user making the appointment")
    sub_service_id: str = Field(..., description="ID of the service being booked")
    created_at: datetime = Field(default_factory=datetime.now, description="Timestamp when the appointment was created")
    sub_service_steps: List[dict] = Field(..., description="State of the service (e.g., 'active', 'inactive')")
    is_fully_complered: Optional[bool] = Field(..., description="Flag indicating if the appointment is fully completed")
    appointment_date: Optional[datetime] = Field(..., description="Date and time of the appointment")
    appoinment_time: Optional[datetime] = Field(..., description="Time of the appointment")
    predicted_duration: Optional[datetime] = Field(..., description="Predicted duration of the appointment")


class SubServiceSchema(BaseModel):
    service_name: str
    payment_amount: float
    required_docs: List[str] = Field(default_factory=list)
    steps: List[dict] = Field(default_factory=list)

class required_documents(BaseModel):
    doc_id: str = Field(...)
    doc_name: str = Field(...)
    description: Optional[str] = None

class admin(BaseModel):
    admin_id: int
    admin_name: str
    service_id: str

class sub_service_step(BaseModel):
    step_id: str = Field(...) #Unique ID for step in a service
    step_name: str = Field(...)
    step_description: Optional[str] = None

# Model for an individual sub-service
class sub_service(BaseModel):
    service_sub_id: str = Field(...)
    service_id: str
    service_name: str = Field(...)
    required_docs: List[required_documents] = []
    payment_amount: float = Field(default=0.0) 
    steps: List[sub_service_step] = []

# Model for the main service
class main_service(BaseModel):
    service_main_id:  str = Field(...) # The unique ID for the main-service
    service_name: str = Field(...)
    department_id: str = Field(...)
    icon_name: Optional[str] = None # For the UI icon
    sub_services: List[str] = []

class uploaded_documents(BaseModel):
    uploaded_document_id: str = Field(...)
    appointment_id: str = Field(...)
    required_doc_id: int = Field(...) # Links to the doc_id in the sub-service
    user_id: str = Field(...)
    file_name: str = Field(...)
    file_path: str = Field(...)
    accuracy: Optional[float] = None
    doc_status: str = Field(default="Pending") # "Pending", "Approved", "Declined"
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

class sub_service_step_state(BaseModel):
    step_name: str = Field(...)
    is_completed: bool = Field(default=False)
    completion_date: Optional[datetime] = None

class AppointmentNew1(BaseModel):
    appointment_id: str = Field(...)
    user_id: str = Field(...)
    sub_service_id: str = Field(...) # Links to the sub_service
    created_at: datetime = Field(default_factory=datetime.utcnow)
    sub_service_states: List[sub_service_step_state] = [] 
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    predicted_duration: Optional[int] = None
    is_fully_completed: bool = Field(default=False)
class AdminInDB(BaseModel):
    """Admin model for database operations with authentication fields"""
    admin_id: int
    admin_name: str
    service_id: str
    email: str
    hashed_password: str
    is_active: bool = True
    created_at: datetime
    updated_at: datetime


# Document state model for tracking uploaded documents
class DocumentState(BaseModel):
    doc_id: str
    doc_name: str
    is_uploaded: bool = False
    uploaded_doc_id: Optional[str] = None
    accuracy: Optional[float] = None
    admin_status: str = "Pending"

# Sub-service step model
class SubServiceStep(BaseModel):
    step_id: int
    step_name: str

# Sub-service state model (for older format)
class SubServiceStepState(BaseModel):
    step_name: str
    is_completed: bool = False
    completion_date: Optional[datetime] = None

# Main appointment model matching your database structure
class Appointment(BaseModel):
    """
    Appointment model matching the ApointmentNew collection structure.
    Based on the actual database documents you provided.
    """
    _id: Optional[str] = None  # MongoDB ObjectId
    appointment_id: int
    user_id: int
    sub_service_id: str  # ObjectId string
    created_at: datetime
    doc_states: Optional[Dict[str, DocumentState]] = None  # For older format
    sub_service_state: Optional[str] = None  # For older format
    is_fully_complered: bool = False  # Note: typo in database field name
    appointment_date: Optional[datetime] = None
    appoinment_time: Optional[datetime] = None  # Note: typo in database field name
    predicted_duration: Optional[datetime] = None  # Stored as date object
    
    # New format fields
    sub_service_steps: Optional[List[SubServiceStep]] = None
    is_fully_completed: Optional[bool] = None  # Correct spelling variant
    
    class Config:
        # Allow extra fields to handle variations in the database
        extra = "allow"
        # Handle ObjectId conversion
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class DailyMetrics(BaseModel):
    matrics_id: str = Field(..., alias="matrics_id")
    date: date
    day_of_week: str
    service_id: int
    main_service_id: int
    average_processing_time: time
    no_show_count: int

# Additional models for appointment management
from enum import Enum

class AppointmentStatus(str, Enum):
    """Enum for appointment statuses"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class AppointmentFilter(BaseModel):
    """Model for filtering appointments"""
    date: Optional[date] = None
    service_id: Optional[str] = None
    user_id: Optional[int] = None
    status: Optional[str] = None

class AppointmentResponse(BaseModel):
    """Response model for appointment details"""
    appointment_id: str
    user_id: str
    service_id: str
    appointment_date: Optional[datetime] = None
    appointment_time: Optional[datetime] = None
    status: str
    duration: Optional[time] = None
    documents_uploaded: int = 0
    total_documents: int = 0


