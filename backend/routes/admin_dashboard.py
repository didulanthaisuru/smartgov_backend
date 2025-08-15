from fastapi import APIRouter, HTTPException

# Import the service function and the response schema
from services.admin_dashboard import get_admin_service_info, get_appointments_by_sub_service, get_required_documents_by_sub_service, get_uploaded_document_details, approve_uploaded_document
from schemas.admin_services.dashboard_schemas import AdminServiceInfoResponse, AppointmentsResponse, RequiredDocumentsResponse, UploadedDocumentResponse, DocumentApprovalResponse

# Create a new router for the admin dashboard
router = APIRouter(
    prefix="/api/admin/dashboard",
    tags=["Admin Dashboard"]
)

@router.get("/admin_service_info/{admin_id}", response_model=AdminServiceInfoResponse)
async def get_admin_service_info_route(admin_id: str):
    """
    Gets admin service information (service_id and admin_name) for a specific admin_id.
    """
    admin_info = await get_admin_service_info(admin_id=admin_id)
    
    if admin_info is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    return admin_info

@router.get("/appointments_by_subservice/{sub_service_id}", response_model=AppointmentsResponse)
async def get_appointments_by_sub_service_route(sub_service_id: str):
    """
    Gets full appointment details for a specific sub_service_id where appointment_confirmed is true.
    
    Args:
        sub_service_id (str): The sub service ID to get appointments for
        
    Returns:
        AppointmentsResponse: List of appointments with full details including appointment_id
    """
    appointments = await get_appointments_by_sub_service(sub_service_id=sub_service_id)
    
    return {"appointments": appointments}

@router.get("/required_documents/{sub_service_id}", response_model=RequiredDocumentsResponse)
async def get_required_documents_by_sub_service_route(sub_service_id: str):
    """
    Gets required document IDs and names for a specific sub_service_id.
    """
    documents = await get_required_documents_by_sub_service(sub_service_id=sub_service_id)
    
    return {"documents": documents}

@router.get("/required_documents_raw/{sub_service_id}")
async def get_required_documents_raw_route(sub_service_id: str):
    """
    Gets required document IDs and names for a specific sub_service_id (raw response without schema validation).
    """
    documents = await get_required_documents_by_sub_service(sub_service_id=sub_service_id)
    
    return {"documents": documents}

@router.get("/uploaded_document/{required_doc_id}/{appointment_id}", response_model=UploadedDocumentResponse)
async def get_uploaded_document_details_route(required_doc_id: str, appointment_id: str):
    """
    Gets uploaded document details for a specific required document ID and appointment ID.
    """
    uploaded_document = await get_uploaded_document_details(required_doc_id=required_doc_id, appointment_id=appointment_id)
    
    if uploaded_document is None:
        raise HTTPException(status_code=404, detail="Uploaded document not found")
    
    return {"uploaded_document": uploaded_document}

@router.put("/approve_document/{document_id}", response_model=DocumentApprovalResponse)
async def approve_document_route(document_id: str):
    """
    Approves an uploaded document by updating its status from 'pending' to 'approved'.
    """
    result = await approve_uploaded_document(document_id=document_id)
    
    if result is None:
        raise HTTPException(status_code=404, detail="Document not found or already approved")
    
    return result
