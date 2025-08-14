from datetime import datetime
from uuid import uuid4
import os
import aiofiles
from fastapi import HTTPException, status, UploadFile
from schemas.document import DocumentUpload, UploadDocumentRequest
from database_config import db, DB_NAME
from motor.motor_asyncio import AsyncIOMotorDatabase


async def uploaded_document(request: UploadDocumentRequest, file: UploadFile) -> DocumentUpload:
    try:
        if not db.client:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Database connection is not initialized."
            )

        # Validate file
        if not file or not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No file provided"
            )

        # Check file size (optional - e.g., max 10MB)
        MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
        file_content = await file.read()
        if len(file_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File size too large. Maximum size is 10MB"
            )

        # Reset file pointer after reading
        await file.seek(0)

        # Access the database
        database: AsyncIOMotorDatabase = db.client[DB_NAME]

        # Generate unique doc_id
        doc_id = str(uuid4().int)[:8]

        # Create upload directory
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        
        # Generate unique filename to prevent conflicts
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{request.booking_id}_{doc_id}_{file.filename}"
        file_path = os.path.join(upload_dir, unique_filename)

        # Save file to disk
        try:
            async with aiofiles.open(file_path, 'wb') as f:
                await f.write(file_content)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save file: {str(e)}"
            )

        # Build DB document
        document_data = {
            "booking_id": request.booking_id,
            "doc_id": doc_id,
            "required_doc_id": getattr(request, "required_doc_id", None),
            "file_name": file.filename,
            "original_filename": file.filename,
            "stored_filename": unique_filename,
            "file_path": file_path,
            "file_size": len(file_content),
            "content_type": file.content_type,
            "accuracy": None,
            "doc_status": "pending",
            "uploaded_at": datetime.now()
        }

        # Insert into MongoDB
        result = await database["uploaded_documents"].insert_one(document_data)

        if not result.inserted_id:
            # If DB insert fails, clean up the saved file
            try:
                os.remove(file_path)
            except:
                pass
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

    except HTTPException:
        # Re-raise HTTP exceptions as they are
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Document upload failed: {str(e)}"
        )