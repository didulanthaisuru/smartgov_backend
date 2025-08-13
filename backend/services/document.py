# from datetime import datetime
# from uuid import uuid4
# import os
# from fastapi import HTTPException, status
# from backend.schemas.document import DocumentUpload, UploadDocumentRequest
# from backend.database_config import db, DB_NAME
# from motor.motor_asyncio import AsyncIOMotorDatabase


# async def uploaded_document(request: UploadDocumentRequest) -> DocumentUpload:
#     try:
#         if not db.client:
#             raise HTTPException(
#                 status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
#                 detail="Database connection is not initialized."
#             )

#         # Access the database
#         database: AsyncIOMotorDatabase = db.client[DB_NAME]

#         # Generate unique doc_id
#         doc_id = str(uuid4().int)[:8]

#         # Create upload directory
#         upload_dir = "uploads"
#         os.makedirs(upload_dir, exist_ok=True)
#         file_path = os.path.join(upload_dir, f"{request.booking_id}_{request.file_name}")

#         # Build DB document
#         document_data = {
#             "booking_id": request.booking_id,
#             "doc_id": doc_id,
#             "required_doc_id": getattr(request, "required_doc_id", None),
#             "file_name": request.file_name,
#             "file_path": file_path,
#             "accuracy": None,
#             "doc_status": "pending",
#             "uploaded_at": datetime.now()
#         }

#         # Insert into MongoDB
#         result = await database["uploaded_document"].insert_one(document_data)

#         if not result.inserted_id:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail="Failed to insert document into MongoDB"
#             )

#         return DocumentUpload(
#             document_id=doc_id,
#             file_path=file_path,
#             status="uploaded",
#             timestamp=datetime.now()
#         )

#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Document upload failed: {str(e)}"
#         )


from datetime import datetime
from uuid import uuid4
import os
from fastapi import HTTPException, status
from schemas.document import DocumentUpload, UploadDocumentRequest
from database_config import db, DB_NAME
from motor.motor_asyncio import AsyncIOMotorDatabase


async def uploaded_document(request: UploadDocumentRequest) -> DocumentUpload:
    try:
        if not db.client:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Database connection is not initialized."
            )

        # Access the database
        database: AsyncIOMotorDatabase = db.client[DB_NAME]

        # Generate unique doc_id
        doc_id = str(uuid4().int)[:8]

        # Create upload directory
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, f"{request.booking_id}_{request.file_name}")

        # Build DB document
        document_data = {
            "booking_id": request.booking_id,
            "doc_id": doc_id,
            "required_doc_id": getattr(request, "required_doc_id", None),
            "file_name": request.file_name,
            "file_path": file_path,
            "accuracy": None,
            "doc_status": "pending",
            "uploaded_at": datetime.now()
        }

        # Insert into MongoDB - Fixed collection name to plural
        result = await database["uploaded_documents"].insert_one(document_data)

        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to insert document into MongoDB"
            )

        return DocumentUpload(
            document_id=doc_id,
            file_path=file_path,
            status="uploaded",
            timestamp=datetime.now()
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Document upload failed: {str(e)}"
        )