# Dashboard Routes Documentation

## File: `backend/routes/dashboard.py`

### Overview
This module provides endpoints for retrieving service information for the dashboard, including main services, sub-services, and detailed service information. It serves as the primary interface for users to browse and explore available services.

### Router Configuration
- **Prefix**: `/dashboard_services`
- **Tags**: `["Dashboard Services"]`

### Dependencies
- **Services**: `services.dashboard`
- **Schemas**: `schemas.dashboard`
- **Database**: `database_config.db`

---

## Endpoints

### 1. Get All Main Services
**Endpoint**: `GET /dashboard_services/`

**Description**: Provides a list of all main services available on the landing page.

**Response Model**: `List[main_service_info_response]`
```json
[
  {
    "service_id": "string",
    "service_name": "string",
    "service_description": "string",
    "service_icon": "string",
    "is_active": "boolean"
  }
]
```

**Dependencies**: `AsyncIOMotorClient`

**Service Function**: `dashboard.get_all_main_services(database)`

---

### 2. Get Sub-Services by Main Service
**Endpoint**: `GET /dashboard_services/{main_service_id}/subservices`

**Description**: Provides a list of all sub-services available under a specific main service.

**Parameters**:
- `main_service_id` (path): The unique identifier of the main service (24-character ObjectId)

**Response Model**: `List[sub_service_info_response]`
```json
[
  {
    "sub_service_id": "string",
    "sub_service_name": "string",
    "sub_service_description": "string",
    "payment_amount": "float",
    "estimated_duration": "integer",
    "is_active": "boolean"
  }
]
```

**Error Responses**:
- `400`: Invalid main service ID format (must be 24 characters)
- `404`: Main service not found or has no sub-services

**Service Function**: `dashboard.get_sub_services_for_main_service(database, main_service_id)`

---

### 3. Get Sub-Service Details
**Endpoint**: `GET /dashboard_services/{main_service_id}/subservices/{sub_service_id}`

**Description**: Retrieves the full details for a single sub-service, including required documents and payment amount.

**Parameters**:
- `main_service_id` (path): The unique identifier of the main service
- `sub_service_id` (path): The unique identifier of the sub-service

**Response Model**: `sub_service_detail_response`
```json
{
  "sub_service_id": "string",
  "sub_service_name": "string",
  "sub_service_description": "string",
  "payment_amount": "float",
  "estimated_duration": "integer",
  "required_documents": [
    {
      "document_id": "string",
      "document_name": "string",
      "document_description": "string",
      "is_required": "boolean"
    }
  ],
  "service_steps": [
    {
      "step_id": "integer",
      "step_name": "string",
      "step_description": "string",
      "estimated_time": "integer"
    }
  ],
  "is_active": "boolean"
}
```

**Error Responses**:
- `404`: Sub-service not found under the specified main service

**Service Function**: `dashboard.get_sub_service_details(database, main_service_id, sub_service_id)`

---

## Service Hierarchy

### Main Services
- Top-level service categories
- Each main service contains multiple sub-services
- Examples: Government Services, Business Services, etc.

### Sub-Services
- Specific services under main services
- Contains detailed information about requirements and process
- Examples: Passport Application, Business Registration, etc.

### Service Details
- Complete information about a specific sub-service
- Includes required documents, steps, and pricing
- Used for appointment booking and user guidance

---

## Related Files

### Schemas
- **File**: `backend/schemas/dashboard.py`
- **Purpose**: Defines Pydantic models for dashboard responses

### Services
- **File**: `backend/services/dashboard.py`
- **Purpose**: Contains business logic for dashboard operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for services and sub-services

---

## Usage Examples

### Get All Main Services
```bash
curl -X GET "http://localhost:8000/dashboard_services/"
```

### Get Sub-Services for Main Service
```bash
curl -X GET "http://localhost:8000/dashboard_services/507f1f77bcf86cd799439011/subservices"
```

### Get Sub-Service Details
```bash
curl -X GET "http://localhost:8000/dashboard_services/507f1f77bcf86cd799439011/subservices/507f1f77bcf86cd799439012"
```

---

## Data Validation

### ObjectId Validation
- Main service ID must be exactly 24 characters
- Sub-service ID must be valid ObjectId format
- Invalid IDs return 400 Bad Request

### Service Existence Validation
- Main service must exist in database
- Sub-service must exist under specified main service
- Non-existent services return 404 Not Found

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid ObjectId format
- **404 Not Found**: Service not found
- **500 Internal Server Error**: Database connection issues

---

## Performance Considerations

### Database Queries
- Uses async MongoDB operations for better performance
- Implements proper indexing on service IDs
- Optimized queries for service hierarchies

### Caching Strategy
- Consider implementing Redis caching for frequently accessed services
- Cache main services list for better response times
- Implement cache invalidation on service updates

---

## Security Considerations

### Input Validation
- All ObjectIds are validated before database queries
- Prevents NoSQL injection attacks
- Validates service existence before returning data

### Access Control
- Public endpoints for service browsing
- No authentication required for service information
- Consider rate limiting for API protection

---

## Dependencies

- FastAPI for routing and HTTP handling
- Motor for async MongoDB operations
- Pydantic for data validation
- Custom dashboard service for business logic
- Database configuration for MongoDB connection
