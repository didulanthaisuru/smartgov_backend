from fastapi import APIRouter, Form, UploadFile, File
from schemas.document import UploadDocumentRequest, DocumentUpload
from services.document import uploaded_document

router = APIRouter()

@router.post("/upload_document", response_model=DocumentUpload)
async def upload_document(
    booking_id: int = Form(...),
    doc_id: int = Form(...),
    file: UploadFile = File(...)
):
    # Create request object from form data
    request = UploadDocumentRequest(
        booking_id=booking_id,
        doc_id=doc_id
    )
    
    result = await uploaded_document(request, file)
    return result


