# Document Routes Documentation

## File: `backend/routes/document.py`

### Overview
This module provides document upload functionality for appointments. It allows users to upload required documents for their appointments, supporting file uploads with booking and document ID validation.

### Router Configuration
- **Prefix**: `/upload_document`
- **Tags**: `["UploadDocument"]`

### Dependencies
- **Services**: `services.document`
- **Schemas**: `schemas.document`

---

## Endpoints

### 1. Upload Document
**Endpoint**: `POST /upload_document/`

**Description**: Uploads a document file for a specific appointment and document requirement.

**Request**: Form data with file upload
- `booking_id` (Form): The appointment/booking ID
- `doc_id` (Form): The document ID/requirement ID
- `file` (File): The document file to upload

**Response Model**: `DocumentUpload`
```json
{
  "upload_id": "string",
  "booking_id": "string",
  "doc_id": "string",
  "file_name": "string",
  "original_filename": "string",
  "file_size": "integer",
  "content_type": "string",
  "upload_status": "string",
  "uploaded_at": "datetime"
}
```

**Service Function**: `uploaded_document(request, file)`

---

## Document Upload Features

### File Upload Support
- **Multiple Formats**: Supports various document formats (PDF, DOC, DOCX, etc.)
- **File Validation**: Validates file type, size, and content
- **Secure Storage**: Secure file storage with unique naming
- **Metadata Tracking**: Tracks file metadata and upload information

### Document Management
- **Booking Association**: Links documents to specific appointments
- **Document Requirements**: Validates against required document types
- **Upload Status**: Tracks upload completion and processing status
- **File Organization**: Organized file storage structure

---

## Related Files

### Schemas
- **File**: `backend/schemas/document.py`
- **Purpose**: Defines Pydantic models for document upload requests/responses

### Services
- **File**: `backend/services/document.py`
- **Purpose**: Contains business logic for document operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for documents and uploads

---

## Usage Examples

### Upload Document
```bash
curl -X POST "http://localhost:8000/upload_document/" \
  -F "booking_id=appointment789" \
  -F "doc_id=document456" \
  -F "file=@passport.pdf"
```

### Upload Multiple Documents
```bash
# Upload passport
curl -X POST "http://localhost:8000/upload_document/" \
  -F "booking_id=appointment789" \
  -F "doc_id=passport_doc" \
  -F "file=@passport.pdf"

# Upload birth certificate
curl -X POST "http://localhost:8000/upload_document/" \
  -F "booking_id=appointment789" \
  -F "doc_id=birth_cert_doc" \
  -F "file=@birth_certificate.pdf"
```

---

## Document Upload Process

### 1. Request Validation
- Validates booking_id exists
- Validates doc_id is required for the service
- Validates file format and size
- Checks user permissions

### 2. File Processing
- Generates unique filename
- Stores file securely
- Extracts file metadata
- Creates upload record

### 3. Response Generation
- Returns upload confirmation
- Includes file information
- Provides upload status
- Returns upload timestamp

---

## Document Types and Requirements

### Supported File Formats
- **PDF**: Portable Document Format
- **DOC/DOCX**: Microsoft Word documents
- **JPG/PNG**: Image files
- **TXT**: Text files

### Document Categories
- **Identity Documents**: Passport, ID card, birth certificate
- **Proof Documents**: Address proof, income proof
- **Application Forms**: Completed application forms
- **Supporting Documents**: Additional required documents

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid file format or size
- **404 Not Found**: Booking or document requirement not found
- **413 Payload Too Large**: File size exceeds limit
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: File processing errors

---

## Security Considerations

### File Upload Security
- **File Type Validation**: Prevents malicious file uploads
- **File Size Limits**: Prevents large file attacks
- **Virus Scanning**: Scans uploaded files for malware
- **Secure Storage**: Encrypted file storage

### Access Control
- **User Authentication**: Required for document uploads
- **Booking Ownership**: Users can only upload for their appointments
- **Document Permissions**: Validates document requirements
- **Audit Trail**: Tracks all upload activities

---

## Performance Considerations

### File Processing
- **Asynchronous Processing**: Non-blocking file uploads
- **File Compression**: Optimizes storage usage
- **CDN Integration**: Fast file delivery
- **Caching**: Caches frequently accessed files

### Storage Optimization
- **Efficient Storage**: Optimized file storage structure
- **File Deduplication**: Prevents duplicate file storage
- **Cleanup Processes**: Removes unused files
- **Backup Strategy**: Regular file backups

---

## Dependencies

- FastAPI for routing and HTTP handling
- File upload handling libraries
- Document processing libraries
- Custom document service for business logic
- Database models for data persistence
- File storage and management libraries

---

## Future Enhancements

### Planned Features
- **Document Preview**: Preview uploaded documents
- **Document Versioning**: Multiple versions of documents
- **Document Signing**: Digital signature support
- **Document Templates**: Predefined document templates

### Advanced Features
- **OCR Processing**: Extract text from images
- **Document Validation**: Automated document validation
- **Document Workflow**: Document approval workflows
- **Document Analytics**: Upload and usage analytics
