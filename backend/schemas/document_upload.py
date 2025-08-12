from pydantic import BaseModel,Field
from typing import Optional, List, Dict
from datetime import datetime


class AddDocumentUploadRequest(BaseModel):
    document_name: str = Field(..., description="Name of the document to be uploaded")
    document_type: str = Field(..., description="Type of the document (e.g., PDF, DOCX)")
    upload_date: datetime = Field(default_factory=datetime.now, description="Date when the document is uploaded")
    tags: Optional[List[str]] = Field(None, description="List of tags associated with the document")
    metadata: Optional[Dict[str, str]] = Field(None, description="Additional metadata for the document")