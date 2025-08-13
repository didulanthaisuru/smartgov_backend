from fastapi import APIRouter, Depends
from backend.schemas.document import UploadDocumentRequest, DocumentUpload
from backend.services.document import uploaded_document

router = APIRouter()

@router.post("/upload_document", response_model=DocumentUpload)
async def upload_document(request: UploadDocumentRequest, result=Depends(uploaded_document)):
    return result
