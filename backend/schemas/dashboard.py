from pydantic import BaseModel, Field
from typing import List, Optional
from bson import ObjectId

class required_doc_response(BaseModel):
    doc_id: str = Field(..., alias="_id")
    doc_name: str
    description: Optional[str] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Schema for the dashboard list 
class main_service_info_response(BaseModel):
    service_main_id: str = Field(..., alias="_id")
    service_name: str
    icon_name: Optional[str] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Schema for listing sub-services
class sub_service_info_response(BaseModel):
    service_sub_id: str = Field(..., alias="_id")
    service_name: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Schema for the details of a single sub-service
class sub_service_detail_response(BaseModel):
    service_sub_id: str = Field(..., alias="_id")
    service_name: str
    required_documents: List[required_doc_response] = Field(..., alias="required_docs")
    payment_amount: float

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}