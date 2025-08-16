# Insights Direct Routes Documentation

## File: `backend/routes/insights_derect.py`

### Overview
This module provides direct GET endpoints for insights data retrieval, offering simplified access to appointment analytics without requiring POST requests. It supports insights by sub-service, main service, and date combinations.

### Router Configuration
- **Prefix**: `/insights-direct`
- **Tags**: `["insights-direct"]`

### Dependencies
- **Services**: `services.insights_derect`
- **Schemas**: `schemas.insights_derect`

---

## Endpoints

### 1. Get Insights by Sub-Service and Date
**Endpoint**: `GET /insights-direct/sub-service/{sub_service_id}/date/{query_date}`

**Description**: Retrieves insights data for a specific sub-service and date using path parameters.

**Parameters**:
- `sub_service_id` (path): The unique identifier of the sub-service
- `query_date` (path): The date for which to retrieve insights (YYYY-MM-DD format)

**Response Model**: `InsightDirectListResponse`
```json
{
  "sub_service_id": "string",
  "query_date": "date",
  "appointments": [
    {
      "appointment_id": "string",
      "user_name": "string",
      "appointment_date": "datetime",
      "appointment_time": "datetime",
      "status": "string",
      "payment_status": "boolean",
      "sub_service_name": "string",
      "main_service_name": "string"
    }
  ],
  "total_count": "integer"
}
```

**Service Function**: `get_insights_by_date_and_sub_service(sub_service_id, query_date)`

---

### 2. Get Insights by Main Service and Date
**Endpoint**: `GET /insights-direct/main-service/{main_service_id}/date/{query_date}`

**Description**: Retrieves insights data for a specific main service and date using path parameters.

**Parameters**:
- `main_service_id` (path): The unique identifier of the main service
- `query_date` (path): The date for which to retrieve insights (YYYY-MM-DD format)

**Response Model**: `InsightDirectListResponse`
```json
{
  "main_service_id": "string",
  "query_date": "date",
  "appointments": [
    {
      "appointment_id": "string",
      "user_name": "string",
      "appointment_date": "datetime",
      "appointment_time": "datetime",
      "status": "string",
      "payment_status": "boolean",
      "sub_service_name": "string",
      "main_service_name": "string"
    }
  ],
  "total_count": "integer"
}
```

**Service Function**: `get_insights_by_date_and_main_service(main_service_id, query_date)`

---

### 3. Get Insights by Sub-Service, Main Service, and Date
**Endpoint**: `GET /insights-direct/sub-service/{sub_service_id}/main-service/{main_service_id}/date/{query_date}`

**Description**: Retrieves insights data for a specific sub-service, main service, and date combination using path parameters.

**Parameters**:
- `sub_service_id` (path): The unique identifier of the sub-service
- `main_service_id` (path): The unique identifier of the main service
- `query_date` (path): The date for which to retrieve insights (YYYY-MM-DD format)

**Response Model**: `InsightDirectListResponse`
```json
{
  "sub_service_id": "string",
  "main_service_id": "string",
  "query_date": "date",
  "appointments": [
    {
      "appointment_id": "string",
      "user_name": "string",
      "appointment_date": "datetime",
      "appointment_time": "datetime",
      "status": "string",
      "payment_status": "boolean",
      "sub_service_name": "string",
      "main_service_name": "string"
    }
  ],
  "total_count": "integer"
}
```

**Service Function**: `get_insights_by_sub_service_main_service_date(sub_service_id, main_service_id, query_date)`

---

## Direct Insights Features

### Simplified Access
- **GET Endpoints**: No POST requests required
- **Path Parameters**: All parameters in URL path
- **RESTful Design**: Follows REST conventions
- **Easy Integration**: Simple to integrate with frontend

### Flexible Filtering
- **Sub-Service Filtering**: Filter by specific sub-service
- **Main Service Filtering**: Filter by service category
- **Date Filtering**: Filter by specific date
- **Combined Filtering**: Multiple filter combinations

---

## Related Files

### Schemas
- **File**: `backend/schemas/insights_derect.py`
- **Purpose**: Defines Pydantic models for direct insights responses

### Services
- **File**: `backend/services/insights_derect.py`
- **Purpose**: Contains business logic for direct insights operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for appointments and services

---

## Usage Examples

### Get Insights by Sub-Service and Date
```bash
curl -X GET "http://localhost:8000/insights-direct/sub-service/service456/date/2024-01-15"
```

### Get Insights by Main Service and Date
```bash
curl -X GET "http://localhost:8000/insights-direct/main-service/mainservice123/date/2024-01-15"
```

### Get Insights by Sub-Service, Main Service, and Date
```bash
curl -X GET "http://localhost:8000/insights-direct/sub-service/service456/main-service/mainservice123/date/2024-01-15"
```

---

## Data Structure

### Appointment Information
- **Appointment Details**: ID, date, time, status
- **User Information**: User name and contact details
- **Service Information**: Sub-service and main service names
- **Payment Status**: Payment completion status

### Response Structure
- **Filter Parameters**: Applied filters in response
- **Appointment List**: Array of appointment details
- **Total Count**: Total number of appointments
- **Metadata**: Additional response information

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid date format or service ID
- **404 Not Found**: Service not found
- **500 Internal Server Error**: Database or service errors

---

## Performance Considerations

### Database Optimization
- **Efficient Queries**: Optimized for date and service filtering
- **Indexed Searches**: Indexed on date and service fields
- **Query Optimization**: Minimal database queries
- **Result Limiting**: Pagination for large result sets

### Caching Strategy
- **Date-based Caching**: Cache results by date
- **Service-based Caching**: Cache results by service
- **Cache Invalidation**: Invalidate on data updates
- **CDN Integration**: Fast response delivery

---

## Security Considerations

### Access Control
- **Admin Authentication**: Admin-only access to insights
- **Service Filtering**: Restrict to assigned services
- **Data Privacy**: Protect sensitive appointment data
- **Audit Logging**: Track insights access

### Data Protection
- **Anonymized Data**: Protect user privacy
- **Aggregated Results**: Provide summary statistics
- **Access Logging**: Monitor data access
- **Compliance**: GDPR and data protection compliance

---

## Dependencies

- FastAPI for routing and HTTP handling
- Pydantic for data validation
- Custom insights direct service for business logic
- Database models for data persistence
- Date/time libraries for temporal analysis

---

## Future Enhancements

### Planned Features
- **Real-time Insights**: Live data updates
- **Custom Date Ranges**: Flexible date range selection
- **Export Functionality**: Data export capabilities
- **Visualization Support**: Chart and graph data

### Advanced Features
- **Predictive Analytics**: Future appointment predictions
- **Trend Analysis**: Historical trend identification
- **Performance Metrics**: Service performance indicators
- **Automated Reporting**: Scheduled report generation
