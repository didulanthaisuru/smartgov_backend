from fastapi import APIRouter, Form, UploadFile, File
from schemas.document import UploadDocumentRequest, DocumentUpload
from services.document import uploaded_document

router = APIRouter(prefix="/upload_document", tags=["UploadDocument"])

@router.post("/", response_model=DocumentUpload)
async def upload_document(
    booking_id: str = Form(...),
    doc_id: str = Form(...),
    file: UploadFile = File(...)
):
    # Create request object from form data
    request = UploadDocumentRequest(
        booking_id=booking_id,
        doc_id=doc_id
    )
    
    result = await uploaded_document(request, file)
    return result


