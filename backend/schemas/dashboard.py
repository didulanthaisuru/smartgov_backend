from pydantic import BaseModel
from typing import List, Optional

class RequiredDocSchema(BaseModel):
    doc_id: int
    doc_name: str
    description: Optional[str] = None

# --- Schemas for Sub-Services ---
class SubServiceResponseSchema(BaseModel):
    service_id: int
    service_name: str
    required_documents: List[RequiredDocSchema] # This now uses the updated schema

# --- Schemas for Main Services ---

# Schema for the dashboard list (Route 1)
# We only send the essential info to keep the initial load fast.
class MainServiceInfoSchema(BaseModel):
    id: str # The main service ID
    service_name: str
    icon_name: Optional[str] = None


# Endpoint 1: Schema for listing sub-services
class SubServiceInfoSchema(BaseModel):
    service_sub_id: int
    service_name: str

# Endpoint 2: Schema for the details of a single sub-service
class SubServiceDetailSchema(BaseModel):
    service_sub_id: int
    service_name: str
    required_documents: List[RequiredDocSchema]
    payment_amount: float