from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime


class UploadDocumentRequest(BaseModel):
    booking_id: str
    required_doc_id: str
    

class UploadDocumentResponse(BaseModel):
    success: bool = True
    message: str = "Document uploaded successfully"
    

class DocumentUpload(BaseModel):
    document_id: str
    file_path: str
    status: str
    timestamp: datetime


