# QR Scanner Routes Documentation

## File: `backend/routes/qr_scanner.py`

### Overview
This module provides QR code generation and scanning functionality. It allows users to generate QR codes from text keys and scan QR codes from uploaded images, supporting both GET and POST methods for QR generation.

### Router Configuration
- **Prefix**: `/qr`
- **Tags**: `["QR"]`

### Dependencies
- **Services**: `services.admin_services.qr_code_scanner`
- **Schemas**: `schemas.qr_schemas`

---

## Endpoints

### 1. Generate QR Code (POST)
**Endpoint**: `POST /qr/generate`

**Description**: Generates a QR code image from a provided key using form data.

**Request**: Form data
- `key` (Form): The text string to encode in the QR code

**Response**: PNG image bytes
- **Content-Type**: `image/png`
- **Response Class**: `Response`

**Error Responses**:
- `400`: Key parameter is required

**Service Function**: `QRService.generate_qr(key)`

---

### 2. Generate QR Code (GET)
**Endpoint**: `GET /qr/generate/{key}`

**Description**: Generates a QR code image from a provided key using URL path parameter.

**Parameters**:
- `key` (path): The text string to encode in the QR code

**Response**: PNG image bytes
- **Content-Type**: `image/png`
- **Response Class**: `Response`

**Service Function**: `QRService.generate_qr(key)`

---

### 3. Scan QR Code
**Endpoint**: `POST /qr/scan`

**Description**: Scans a QR code from an uploaded image file and returns the decoded content.

**Request**: Form data with file upload
- `file` (File): Image file containing QR code (PNG, JPG, etc.)

**Response Model**: `QRScanResponse`
```json
{
  "success": "boolean",
  "results": ["string"],
  "detail": "string"
}
```

**Error Responses**:
- `400`: Unable to open image file

**Service Function**: `QRService.scan_qr_from_bytes(contents)`

---

## QR Code Functionality

### QR Code Generation
- **Text Encoding**: Converts text strings to QR code images
- **Image Format**: Returns PNG format images
- **Flexible Input**: Supports any text string as key
- **Dual Methods**: Both GET and POST endpoints available

### QR Code Scanning
- **Image Processing**: Analyzes uploaded image files
- **Multiple Formats**: Supports various image formats
- **Barcode Support**: Can also scan barcodes
- **Error Handling**: Graceful handling of invalid images

---

## Related Files

### Services
- **File**: `backend/services/admin_services/qr_code_scanner.py`
- **Purpose**: Contains QR code generation and scanning logic

### Schemas
- **File**: `backend/schemas/qr_schemas.py`
- **Purpose**: Defines Pydantic models for QR responses

---

## Usage Examples

### Generate QR Code (POST)
```bash
curl -X POST "http://localhost:8000/qr/generate" \
  -F "key=appointment123"
```

### Generate QR Code (GET)
```bash
curl -X GET "http://localhost:8000/qr/generate/appointment123"
```

### Scan QR Code
```bash
curl -X POST "http://localhost:8000/qr/scan" \
  -F "file=@qr_code.png"
```

### Download Generated QR Code
```bash
# Save QR code to file
curl -X GET "http://localhost:8000/qr/generate/appointment123" \
  -o qr_code.png
```

---

## QR Code Use Cases

### Appointment Management
- **Appointment IDs**: Generate QR codes for appointment tracking
- **Check-in Process**: Scan QR codes for appointment verification
- **Status Updates**: QR codes linked to appointment status

### Service Access
- **Service Codes**: QR codes for service identification
- **Access Control**: QR codes for restricted service access
- **Document Links**: QR codes linking to required documents

### User Identification
- **User IDs**: QR codes for user identification
- **Profile Access**: Quick access to user profiles
- **Contact Information**: QR codes with contact details

---

## Technical Implementation

### QR Code Generation
- Uses QR code generation library
- Configurable QR code parameters
- PNG image output format
- Error handling for invalid input

### QR Code Scanning
- Image processing and analysis
- Multiple QR code format support
- Barcode compatibility
- Robust error handling

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Missing key parameter or invalid image file
- **Image Processing Errors**: Invalid image format or corrupted files
- **QR Code Errors**: Unreadable or invalid QR codes

---

## Security Considerations

### Input Validation
- Key parameter validation
- File type validation for uploads
- File size limits
- Malicious file protection

### Access Control
- Consider authentication for sensitive QR codes
- Rate limiting for generation endpoints
- Audit trails for QR code usage

---

## Performance Considerations

### Image Processing
- Efficient image processing algorithms
- Optimized file handling
- Memory management for large images
- Caching for frequently generated QR codes

### Response Optimization
- Fast QR code generation
- Optimized image compression
- Efficient file streaming
- Minimal memory footprint

---

## Dependencies

- FastAPI for routing and HTTP handling
- QR code generation library
- Image processing library
- File upload handling
- Custom QR service for business logic

---

## Future Enhancements

### Planned Features
- **Custom QR Code Styling**: Different colors and styles
- **QR Code Templates**: Predefined templates for common use cases
- **Batch QR Generation**: Generate multiple QR codes at once
- **QR Code Analytics**: Track QR code usage and scans

### Advanced Features
- **Dynamic QR Codes**: QR codes that update content
- **QR Code Encryption**: Secure QR code content
- **QR Code Expiration**: Time-limited QR codes
- **QR Code History**: Track QR code generation history
