from pydantic import BaseModel, Field
from typing import List
from datetime import date

class Document(BaseModel):
    doc_id: str = Field(..., description="Unique document ID")
    name: str
    uploaded: bool
    accuracy: float
    status: str
    filepath: str

class User(BaseModel):
    name: str
    nic: str
    mobile: str

class AppointmentDetail(BaseModel):
    appointment_id: int = Field(..., description="Unique appointment ID")
    user: User
    service: str
    location: str
    expectedDuration: int
    date: date
    time: str
    documents: List[Document]
    paymentStatus: str
